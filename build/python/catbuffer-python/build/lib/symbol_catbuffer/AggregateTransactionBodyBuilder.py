#!/usr/bin/python
"""
    Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
    Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
    All rights reserved.

    This file is part of Catapult.

    Catapult is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Catapult is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with Catapult. If not, see <http://www.gnu.org/licenses/>.
"""

# pylint: disable=W0622,W0612,C0301,R0904

from __future__ import annotations

# pylint: disable=unused-import

from binascii import hexlify
from typing import List
import re
from .GeneratorUtils import GeneratorUtils
from .CosignatureBuilder import CosignatureBuilder
from .EmbeddedTransactionBuilder import EmbeddedTransactionBuilder
from .EmbeddedTransactionBuilderFactory import EmbeddedTransactionBuilderFactory
from .Hash256Dto import Hash256Dto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class AggregateTransactionBodyBuilder:
    """Binary layout for an aggregate transaction.

    Attributes:
        transactions_hash: Aggregate hash of an aggregate's transactions.
        transactions: Sub-transaction data (transactions are variable sized and payload size is in bytes).
        cosignatures: Cosignatures data (fills remaining body space after transactions).
    """
    def __init__(self):
        """ Constructor."""
        self.transactions_hash = bytes(32)
        self.transactions = []
        self.cosignatures = []

    @staticmethod
    def _load_embedded_transactions(transactions, payload: bytes, payload_size: int):
        remaining_byte_sizes = payload_size
        while remaining_byte_sizes > 0:
            item = EmbeddedTransactionBuilderFactory.create_from_payload(payload)
            transactions.append(item)
            item_size = item.get_size() + GeneratorUtils.get_transaction_padding_size(item.get_size(), 8)
            remaining_byte_sizes -= item_size
            payload = payload[item_size:]
        return payload

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AggregateTransactionBodyBuilder:
        """Creates an instance of AggregateTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AggregateTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        transactions_hash_ = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        transactions_hash = transactions_hash_.hash256
        bytes_ = bytes_[transactions_hash_.get_size():]
        payload_size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIZE_FIELD
        bytes_ = bytes_[4:]
        aggregate_transaction_header__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        transactions = []
        bytes_ = AggregateTransactionBodyBuilder._load_embedded_transactions(transactions, bytes_, payload_size)
        cosignatures_ = []
        bytes_ = GeneratorUtils.load_from_binary(CosignatureBuilder, cosignatures_, bytes_, len(bytes_))
        cosignatures = list(map(lambda e: e.as_tuple(), cosignatures_))

        # create object and call
        result = AggregateTransactionBodyBuilder()
        result.transactions_hash = transactions_hash
        result.transactions = transactions
        result.cosignatures = cosignatures
        return result

    @classmethod
    def _serialize_aligned(cls, transaction: EmbeddedTransactionBuilder) -> bytes:
        """Serializes an embeded transaction with correct padding.
        Returns:
            Serialized embedded transaction.
        """
        bytes_ = transaction.serialize()
        padding = bytes(GeneratorUtils.get_transaction_padding_size(len(bytes_), 8))
        return GeneratorUtils.concat_typed_arrays(bytes_, padding)

    @classmethod
    def _get_size_aligned(cls, transaction: EmbeddedTransactionBuilder) -> int:
        """Serializes an embeded transaction with correct padding.
        Returns:
            Serialized embedded transaction.
        """
        size = transaction.get_size()
        paddingSize = GeneratorUtils.get_transaction_padding_size(size, 8)
        return size + paddingSize
    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += Hash256Dto(self.transactions_hash).get_size()
        size += 4  # payload_size
        size += 4  # aggregate_transaction_header__reserved1
        for _ in self.transactions:
            size += self._get_size_aligned(_)
        for _ in self.cosignatures:
            size += CosignatureBuilder.from_tuple(_).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, Hash256Dto(self.transactions_hash).serialize())  # kind:CUSTOM
        # calculate payload size
        size_value = 0
        for _ in self.transactions:
            size_value += self._get_size_aligned(_)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 4))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        for _ in self.transactions: # kind:VAR_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self._serialize_aligned(_))
        for _ in self.cosignatures: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, CosignatureBuilder.from_tuple(_).serialize())
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('transactions_hash', to_hex_string(Hash256Dto(self.transactions_hash).serialize()))
        # calculate payload size
        size_value = 0
        for _ in self.transactions:
            size_value += self._get_size_aligned(_)
        result += '{:24s} : {}\n'.format('payload_size', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 4)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        for subtransaction in self.transactions: # kind:VAR_ARRAY
            result += ''.join(map(lambda e: '  ' + e + '\n', subtransaction.__str__().split('\n')))
            size = subtransaction.get_size()
            paddingSize = GeneratorUtils.get_transaction_padding_size(size, 8)
            result += '  {:24s} : {} (len: {})\n'.format('<padding>', to_hex_string(bytes(paddingSize)), paddingSize)
        result += '{:24s} : [\n'.format('cosignatures')
        for _ in self.cosignatures: # kind:ARRAY|FILL_ARRAY
            result += '  {}\n'.format(CosignatureBuilder.from_tuple(_).__str__())
        result += ']\n'
        return result

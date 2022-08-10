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
from .UnresolvedAddressDto import UnresolvedAddressDto
from .UnresolvedMosaicBuilder import UnresolvedMosaicBuilder

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class TransferTransactionBodyBuilder:
    """Binary layout for a transfer transaction.

    Attributes:
        recipient_address: Recipient address.
        mosaics: Attached mosaics.
        message: Attached message.
    """
    def __init__(self):
        """ Constructor."""
        self.recipient_address = bytes(24)
        self.mosaics = []
        self.message = bytes()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> TransferTransactionBodyBuilder:
        """Creates an instance of TransferTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of TransferTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        recipient_address_ = UnresolvedAddressDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        recipient_address = recipient_address_.unresolvedAddress
        bytes_ = bytes_[recipient_address_.get_size():]
        message_size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIZE_FIELD
        bytes_ = bytes_[2:]
        mosaics_count = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        transfer_transaction_body__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        transfer_transaction_body__reserved2 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]
        mosaics = []  # kind:ARRAY
        for _ in range(mosaics_count):
            item = UnresolvedMosaicBuilder.load_from_binary(bytes_)
            mosaics.append(item.as_tuple())
            bytes_ = bytes_[item.get_size():]
        message = GeneratorUtils.get_bytes(bytes_, message_size)  # kind:BUFFER
        bytes_ = bytes_[message_size:]

        # create object and call
        result = TransferTransactionBodyBuilder()
        result.recipient_address = recipient_address
        result.mosaics = mosaics
        result.message = message
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += UnresolvedAddressDto(self.recipient_address).get_size()
        size += 2  # message_size
        size += 1  # mosaics_count
        size += 4  # transfer_transaction_body__reserved1
        size += 1  # transfer_transaction_body__reserved2
        for _ in self.mosaics:
            size += UnresolvedMosaicBuilder.from_tuple(_).get_size()
        size += len(self.message)
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedAddressDto(self.recipient_address).serialize())  # kind:CUSTOM
        size_value = len(self.message)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 2))  # kind:SIZE_FIELD
        size_value = len(self.mosaics)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 1))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 1))
        for _ in self.mosaics: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedMosaicBuilder.from_tuple(_).serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.message)  # kind:BUFFER
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('recipient_address', to_hex_string(UnresolvedAddressDto(self.recipient_address).serialize()))
        size_value = len(self.message)
        result += '{:24s} : {}\n'.format('message_size', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 2)))
        size_value = len(self.mosaics)
        result += '{:24s} : {}\n'.format('mosaics_count', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 1)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 1)))
        result += '{:24s} : [\n'.format('mosaics')
        for _ in self.mosaics: # kind:ARRAY|FILL_ARRAY
            result += '  {}\n'.format(UnresolvedMosaicBuilder.from_tuple(_).__str__())
        result += ']\n'
        result += '{:24s} : {}\n'.format('message', to_hex_string(self.message))
        return result

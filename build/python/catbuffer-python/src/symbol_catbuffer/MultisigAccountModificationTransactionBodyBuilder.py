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

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class MultisigAccountModificationTransactionBodyBuilder:
    """Binary layout for a multisig account modification transaction.

    Attributes:
        min_removal_delta: Relative change of the minimal number of cosignatories required when removing an account.
        min_approval_delta: Relative change of the minimal number of cosignatories required when approving a transaction.
        address_additions: Cosignatory address additions.
        address_deletions: Cosignatory address deletions.
    """
    def __init__(self):
        """ Constructor."""
        self.min_removal_delta = int()
        self.min_approval_delta = int()
        self.address_additions = []
        self.address_deletions = []

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MultisigAccountModificationTransactionBodyBuilder:
        """Creates an instance of MultisigAccountModificationTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MultisigAccountModificationTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        min_removal_delta = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]
        min_approval_delta = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]
        address_additions_count = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        address_deletions_count = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        multisig_account_modification_transaction_body__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        address_additions = []  # kind:ARRAY
        for _ in range(address_additions_count):
            item = UnresolvedAddressDto.load_from_binary(bytes_)
            address_additions.append(item.unresolvedAddress)
            bytes_ = bytes_[item.get_size():]
        address_deletions = []  # kind:ARRAY
        for _ in range(address_deletions_count):
            item = UnresolvedAddressDto.load_from_binary(bytes_)
            address_deletions.append(item.unresolvedAddress)
            bytes_ = bytes_[item.get_size():]

        # create object and call
        result = MultisigAccountModificationTransactionBodyBuilder()
        result.min_removal_delta = min_removal_delta
        result.min_approval_delta = min_approval_delta
        result.address_additions = address_additions
        result.address_deletions = address_deletions
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 1  # min_removal_delta
        size += 1  # min_approval_delta
        size += 1  # address_additions_count
        size += 1  # address_deletions_count
        size += 4  # multisig_account_modification_transaction_body__reserved1
        for _ in self.address_additions:
            size += UnresolvedAddressDto(_).get_size()
        for _ in self.address_deletions:
            size += UnresolvedAddressDto(_).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.min_removal_delta, 1))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.min_approval_delta, 1))  # serial_kind:SIMPLE
        size_value = len(self.address_additions)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 1))  # kind:SIZE_FIELD
        size_value = len(self.address_deletions)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 1))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        for _ in self.address_additions: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedAddressDto(_).serialize())
        for _ in self.address_deletions: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedAddressDto(_).serialize())
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('min_removal_delta', to_hex_string(GeneratorUtils.uint_to_buffer(self.min_removal_delta, 1)))
        result += '{:24s} : {}\n'.format('min_approval_delta', to_hex_string(GeneratorUtils.uint_to_buffer(self.min_approval_delta, 1)))
        size_value = len(self.address_additions)
        result += '{:24s} : {}\n'.format('address_additions_count', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 1)))
        size_value = len(self.address_deletions)
        result += '{:24s} : {}\n'.format('address_deletions_count', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 1)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : [\n'.format('address_additions')
        for _ in self.address_additions: # kind:ARRAY|FILL_ARRAY
            result += '  {}\n'.format(UnresolvedAddressDto(_).__str__())
        result += ']\n'
        result += '{:24s} : [\n'.format('address_deletions')
        for _ in self.address_deletions: # kind:ARRAY|FILL_ARRAY
            result += '  {}\n'.format(UnresolvedAddressDto(_).__str__())
        result += ']\n'
        return result

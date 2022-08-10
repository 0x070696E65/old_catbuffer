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
from .AccountRestrictionFlagsDto import AccountRestrictionFlagsDto
from .EntityTypeDto import EntityTypeDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class AccountOperationRestrictionTransactionBodyBuilder:
    """Binary layout for an account operation restriction transaction.

    Attributes:
        restriction_flags: Account restriction flags.
        restriction_additions: Account restriction additions.
        restriction_deletions: Account restriction deletions.
    """
    def __init__(self):
        """ Constructor."""
        self.restriction_flags = []
        self.restriction_additions = []
        self.restriction_deletions = []

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountOperationRestrictionTransactionBodyBuilder:
        """Creates an instance of AccountOperationRestrictionTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountOperationRestrictionTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        restriction_flags = AccountRestrictionFlagsDto.bytesToFlags(bytes_, 2)  # kind:FLAGS
        bytes_ = bytes_[2:]
        restriction_additions_count = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        restriction_deletions_count = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        account_restriction_transaction_body__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        restriction_additions = []  # kind:ARRAY
        for _ in range(restriction_additions_count):
            item = EntityTypeDto.load_from_binary(bytes_)
            restriction_additions.append(item)
            bytes_ = bytes_[item.get_size():]
        restriction_deletions = []  # kind:ARRAY
        for _ in range(restriction_deletions_count):
            item = EntityTypeDto.load_from_binary(bytes_)
            restriction_deletions.append(item)
            bytes_ = bytes_[item.get_size():]

        # create object and call
        result = AccountOperationRestrictionTransactionBodyBuilder()
        result.restriction_flags = restriction_flags
        result.restriction_additions = restriction_additions
        result.restriction_deletions = restriction_deletions
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 2  # restriction_flags
        size += 1  # restriction_additions_count
        size += 1  # restriction_deletions_count
        size += 4  # account_restriction_transaction_body__reserved1
        for _ in self.restriction_additions:
            size += EntityTypeDto(_).get_size()
        for _ in self.restriction_deletions:
            size += EntityTypeDto(_).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(AccountRestrictionFlagsDto.flagsToInt(self.restriction_flags), 2))  # kind:FLAGS
        size_value = len(self.restriction_additions)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 1))  # kind:SIZE_FIELD
        size_value = len(self.restriction_deletions)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 1))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        for _ in self.restriction_additions: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, EntityTypeDto(_).serialize())
        for _ in self.restriction_deletions: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, EntityTypeDto(_).serialize())
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        _serializedFlags = GeneratorUtils.uint_to_buffer(AccountRestrictionFlagsDto.flagsToInt(self.restriction_flags), 2)
        result += '{:24s} : {} {}\n'.format('restriction_flags', to_hex_string(_serializedFlags), self.restriction_flags)
        size_value = len(self.restriction_additions)
        result += '{:24s} : {}\n'.format('restriction_additions_count', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 1)))
        size_value = len(self.restriction_deletions)
        result += '{:24s} : {}\n'.format('restriction_deletions_count', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 1)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : [\n'.format('restriction_additions')
        for _ in self.restriction_additions: # kind:ARRAY|FILL_ARRAY
            result += '  {}\n'.format(EntityTypeDto(_).__str__())
        result += ']\n'
        result += '{:24s} : [\n'.format('restriction_deletions')
        for _ in self.restriction_deletions: # kind:ARRAY|FILL_ARRAY
            result += '  {}\n'.format(EntityTypeDto(_).__str__())
        result += ']\n'
        return result

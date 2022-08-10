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
from enum import Flag
from typing import List
from .GeneratorUtils import GeneratorUtils


class AccountRestrictionFlagsDto(Flag):
    """Enumeration of account restriction flags

    Attributes:
        ADDRESS: restriction type is an address.
        MOSAIC_ID: restriction type is a mosaic identifier.
        TRANSACTION_TYPE: restriction type is a transaction type.
        OUTGOING: restriction is interpreted as outgoing.
        BLOCK: restriction is interpreted as blocking (instead of allowing) operation.
    """

    ADDRESS = 1
    MOSAIC_ID = 2
    TRANSACTION_TYPE = 4
    OUTGOING = 16384
    BLOCK = 32768

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountRestrictionFlagsDto:
        """Creates an instance of AccountRestrictionFlagsDto from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountRestrictionFlagsDto.
        """
        value: int = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes(payload), 2))
        return AccountRestrictionFlagsDto(value)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 2

    @classmethod
    def bytesToFlags(cls, bitMaskValue: bytes, size: int) -> List[AccountRestrictionFlagsDto]:
        """Converts a bit representation to a list of AccountRestrictionFlagsDto.
        Args:
            bitMaskValue Bitmask bytes value.
        Returns:
            List of AccountRestrictionFlagsDto flags representing the int value.
        """
        return cls.intToFlags(GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bitMaskValue, size)))

    @classmethod
    def intToFlags(cls, bitMaskValue: int) -> List[AccountRestrictionFlagsDto]:
        """Converts a bit representation to a list of AccountRestrictionFlagsDto.
        Args:
            bitMaskValue Bitmask int value.
        Returns:
            List of AccountRestrictionFlagsDto flags representing the int value.
        """
        results = []
        for flag in AccountRestrictionFlagsDto:
            if 0 != flag.value & bitMaskValue:
                results.append(flag)
        return results

    @classmethod
    def flagsToInt(cls, flags: List[AccountRestrictionFlagsDto]) -> int:
        """Converts a list of AccountRestrictionFlagsDto to a bit representation.
        Args:
            List of AccountRestrictionFlagsDto flags representing the int value.
        Returns:
            int value of the list of flags
        """
        result = 0
        for flag in AccountRestrictionFlagsDto:
            if flag in flags:
                result += flag.value
        return result

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.value, 2))
        return bytes_

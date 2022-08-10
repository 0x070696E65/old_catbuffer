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


class AccountKeyTypeFlagsDto(Flag):
    """Enumeration of account key type flags

    Attributes:
        UNSET: unset key.
        LINKED: linked account public key \note this can be either a remote or main account public key depending on context.
        NODE: node public key on which remote is allowed to harvest.
        VRF: VRF public key.
    """

    UNSET = 0
    LINKED = 1
    NODE = 2
    VRF = 4

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountKeyTypeFlagsDto:
        """Creates an instance of AccountKeyTypeFlagsDto from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountKeyTypeFlagsDto.
        """
        value: int = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes(payload), 1))
        return AccountKeyTypeFlagsDto(value)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 1

    @classmethod
    def bytesToFlags(cls, bitMaskValue: bytes, size: int) -> List[AccountKeyTypeFlagsDto]:
        """Converts a bit representation to a list of AccountKeyTypeFlagsDto.
        Args:
            bitMaskValue Bitmask bytes value.
        Returns:
            List of AccountKeyTypeFlagsDto flags representing the int value.
        """
        return cls.intToFlags(GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bitMaskValue, size)))

    @classmethod
    def intToFlags(cls, bitMaskValue: int) -> List[AccountKeyTypeFlagsDto]:
        """Converts a bit representation to a list of AccountKeyTypeFlagsDto.
        Args:
            bitMaskValue Bitmask int value.
        Returns:
            List of AccountKeyTypeFlagsDto flags representing the int value.
        """
        results = []
        for flag in AccountKeyTypeFlagsDto:
            if 0 != flag.value & bitMaskValue:
                results.append(flag)
        return results

    @classmethod
    def flagsToInt(cls, flags: List[AccountKeyTypeFlagsDto]) -> int:
        """Converts a list of AccountKeyTypeFlagsDto to a bit representation.
        Args:
            List of AccountKeyTypeFlagsDto flags representing the int value.
        Returns:
            int value of the list of flags
        """
        result = 0
        for flag in AccountKeyTypeFlagsDto:
            if flag in flags:
                result += flag.value
        return result

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.value, 1))
        return bytes_

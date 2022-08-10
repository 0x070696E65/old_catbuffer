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
from typing import List
from .GeneratorUtils import GeneratorUtils
from .GlobalKeyValueBuilder import GlobalKeyValueBuilder

class GlobalKeyValueSetBuilder:
    """Binary layout for a global restriction key-value set.

    Attributes:
        keys: Key value array.
    """

    def __init__(self, keys: List[GlobalKeyValueBuilder]):
        """Constructor.
        Args:
            keys: Key value array.
        """
        self.keys = keys


    @classmethod
    def load_from_binary(cls, payload: bytes) -> GlobalKeyValueSetBuilder:
        """Creates an instance of GlobalKeyValueSetBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of GlobalKeyValueSetBuilder.
        """
        bytes_ = bytes(payload)

        keyValueCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        keys: List[GlobalKeyValueBuilder] = []  # kind:ARRAY
        for _ in range(keyValueCount):
            item = GlobalKeyValueBuilder.load_from_binary(bytes_)
            keys.append(item)
            bytes_ = bytes_[item.get_size():]
        return GlobalKeyValueSetBuilder(keys)

    def get_keys(self) -> List[GlobalKeyValueBuilder]:
        """Gets key value array.
        Returns:
            Key value array.
        """
        return self.keys

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 1  # keyValueCount
        for _ in self.keys:
            size += _.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_keys()), 1))  # kind:SIZE_FIELD
        for _ in self.keys: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        return bytes_
    # end of class

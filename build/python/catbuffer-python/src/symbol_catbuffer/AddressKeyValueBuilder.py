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
from .GeneratorUtils import GeneratorUtils
from .MosaicRestrictionKeyDto import MosaicRestrictionKeyDto

class AddressKeyValueBuilder:
    """Layout for mosaic address restriction key-value pair.

    Attributes:
        key: Key for value.
        value: Value associated by key.
    """

    def __init__(self, key: MosaicRestrictionKeyDto, value: int):
        """Constructor.
        Args:
            key: Key for value.
            value: Value associated by key.
        """
        self.key = key
        self.value = value


    @classmethod
    def load_from_binary(cls, payload: bytes) -> AddressKeyValueBuilder:
        """Creates an instance of AddressKeyValueBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AddressKeyValueBuilder.
        """
        bytes_ = bytes(payload)

        key = MosaicRestrictionKeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[key.get_size():]
        value = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        return AddressKeyValueBuilder(key, value)

    def get_key(self) -> MosaicRestrictionKeyDto:
        """Gets key for value.
        Returns:
            Key for value.
        """
        return self.key

    def get_value(self) -> int:
        """Gets value associated by key.
        Returns:
            Value associated by key.
        """
        return self.value

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.key.get_size()
        size += 8  # value
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.key.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_value(), 8))  # kind:SIMPLE
        return bytes_
    # end of class

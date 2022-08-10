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

class MetadataValueBuilder:
    """Binary layout of a metadata entry value.

    Attributes:
        data: Data of the value.
    """

    def __init__(self, data: bytes):
        """Constructor.
        Args:
            data: Data of the value.
        """
        self.data = data


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MetadataValueBuilder:
        """Creates an instance of MetadataValueBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MetadataValueBuilder.
        """
        bytes_ = bytes(payload)

        size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIZE_FIELD
        bytes_ = bytes_[2:]
        data = GeneratorUtils.get_bytes(bytes_, size)  # kind:BUFFER
        bytes_ = bytes_[size:]
        return MetadataValueBuilder(data)

    def get_data(self) -> bytes:
        """Gets data of the value.
        Returns:
            Data of the value.
        """
        return self.data

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 2  # size
        size += len(self.data)
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_data()), 2))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.data)  # kind:BUFFER
        return bytes_
    # end of class

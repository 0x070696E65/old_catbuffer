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
from enum import Enum
from .GeneratorUtils import GeneratorUtils


class MetadataTypeDto(Enum):
    """Enum for the different types of metadata

    Attributes:
        ACCOUNT: account metadata.
        MOSAIC: mosaic metadata.
        NAMESPACE: namespace metadata.
    """

    ACCOUNT = 0
    MOSAIC = 1
    NAMESPACE = 2

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MetadataTypeDto:
        """Creates an instance of MetadataTypeDto from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MetadataTypeDto.
        """
        value: int = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes(payload), 1))
        return MetadataTypeDto(value)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 1

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.value, 1))
        return bytes_

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
from .ReceiptTypeDto import ReceiptTypeDto

class ReceiptBuilder:
    """Binary layout for a receipt entity.

    Attributes:
        version: Receipt version.
        type: Receipt type.
    """

    def __init__(self, version: int, type: ReceiptTypeDto):
        """Constructor.
        Args:
            version: Receipt version.
            type: Receipt type.
        """
        self.version = version
        self.type = type


    @classmethod
    def load_from_binary(cls, payload: bytes) -> ReceiptBuilder:
        """Creates an instance of ReceiptBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ReceiptBuilder.
        """
        bytes_ = bytes(payload)

        size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        version = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIMPLE
        bytes_ = bytes_[2:]
        type = ReceiptTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[type.get_size():]
        return ReceiptBuilder(version, type)

    def get_version(self) -> int:
        """Gets receipt version.
        Returns:
            Receipt version.
        """
        return self.version

    def get_type(self) -> ReceiptTypeDto:
        """Gets receipt type.
        Returns:
            Receipt type.
        """
        return self.type

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 4  # size
        size += 2  # version
        size += self.type.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        # Ignored serialization: size AttributeKind.SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_version(), 2))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.type.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

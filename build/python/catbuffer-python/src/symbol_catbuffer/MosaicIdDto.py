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
from binascii import hexlify
from .GeneratorUtils import GeneratorUtils

class MosaicIdDto:
    """Mosaic id.

    Attributes:
        mosaicId: Mosaic id.
    """
    def __init__(self, mosaicId: int = 0):
        """Constructor.

        Args:
            mosaicId: Mosaic id.
        """
        self.mosaicId = mosaicId

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicIdDto:
        """Creates an instance of MosaicIdDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicIdDto.
        """
        bytes_ = bytes(payload)
        mosaicId = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))
        return MosaicIdDto(mosaicId)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 8

    def get_mosaic_id(self) -> int:
        """Gets Mosaic id.

        Returns:
            Mosaic id.
        """
        return self.mosaicId

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_mosaic_id(), 8))
        return bytes_

    def __str__(self):
        result = hexlify(GeneratorUtils.uint_to_buffer(self.get_mosaic_id(), 8)).decode('utf-8')
        return result

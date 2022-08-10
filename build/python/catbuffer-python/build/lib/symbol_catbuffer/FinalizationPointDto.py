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

class FinalizationPointDto:
    """Finalization point.

    Attributes:
        finalizationPoint: Finalization point.
    """
    def __init__(self, finalizationPoint: int = 0):
        """Constructor.

        Args:
            finalizationPoint: Finalization point.
        """
        self.finalizationPoint = finalizationPoint

    @classmethod
    def load_from_binary(cls, payload: bytes) -> FinalizationPointDto:
        """Creates an instance of FinalizationPointDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of FinalizationPointDto.
        """
        bytes_ = bytes(payload)
        finalizationPoint = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))
        return FinalizationPointDto(finalizationPoint)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 4

    def get_finalization_point(self) -> int:
        """Gets Finalization point.

        Returns:
            Finalization point.
        """
        return self.finalizationPoint

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_finalization_point(), 4))
        return bytes_

    def __str__(self):
        result = hexlify(GeneratorUtils.uint_to_buffer(self.get_finalization_point(), 4)).decode('utf-8')
        return result

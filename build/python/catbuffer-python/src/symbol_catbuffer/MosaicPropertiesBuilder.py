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
from .BlockDurationDto import BlockDurationDto
from .MosaicFlagsDto import MosaicFlagsDto

class MosaicPropertiesBuilder:
    """Binary layout for mosaic properties.

    Attributes:
        flags: Mosaic flags.
        divisibility: Mosaic divisibility.
        duration: Mosaic duration.
    """

    def __init__(self, flags: List[MosaicFlagsDto], divisibility: int, duration: BlockDurationDto):
        """Constructor.
        Args:
            flags: Mosaic flags.
            divisibility: Mosaic divisibility.
            duration: Mosaic duration.
        """
        self.flags = flags
        self.divisibility = divisibility
        self.duration = duration


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicPropertiesBuilder:
        """Creates an instance of MosaicPropertiesBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicPropertiesBuilder.
        """
        bytes_ = bytes(payload)

        flags = MosaicFlagsDto.bytesToFlags(bytes_, 1)  # kind:FLAGS
        bytes_ = bytes_[1:]
        divisibility = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]
        duration = BlockDurationDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[duration.get_size():]
        return MosaicPropertiesBuilder(flags, divisibility, duration)

    def get_flags(self) -> List[MosaicFlagsDto]:
        """Gets mosaic flags.
        Returns:
            Mosaic flags.
        """
        return self.flags

    def get_divisibility(self) -> int:
        """Gets mosaic divisibility.
        Returns:
            Mosaic divisibility.
        """
        return self.divisibility

    def get_duration(self) -> BlockDurationDto:
        """Gets mosaic duration.
        Returns:
            Mosaic duration.
        """
        return self.duration

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 1  # flags
        size += 1  # divisibility
        size += self.duration.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(MosaicFlagsDto.flagsToInt(self.get_flags()), 1))  # kind:FLAGS
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_divisibility(), 1))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.duration.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

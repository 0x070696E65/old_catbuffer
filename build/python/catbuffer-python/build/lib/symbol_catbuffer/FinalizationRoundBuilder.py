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
from .FinalizationEpochDto import FinalizationEpochDto
from .FinalizationPointDto import FinalizationPointDto

class FinalizationRoundBuilder:
    """Binary layout for finalization round.

    Attributes:
        epoch: Finalization epoch.
        point: Finalization point.
    """

    def __init__(self, epoch: FinalizationEpochDto, point: FinalizationPointDto):
        """Constructor.
        Args:
            epoch: Finalization epoch.
            point: Finalization point.
        """
        self.epoch = epoch
        self.point = point


    @classmethod
    def load_from_binary(cls, payload: bytes) -> FinalizationRoundBuilder:
        """Creates an instance of FinalizationRoundBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of FinalizationRoundBuilder.
        """
        bytes_ = bytes(payload)

        epoch = FinalizationEpochDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[epoch.get_size():]
        point = FinalizationPointDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[point.get_size():]
        return FinalizationRoundBuilder(epoch, point)

    def get_epoch(self) -> FinalizationEpochDto:
        """Gets finalization epoch.
        Returns:
            Finalization epoch.
        """
        return self.epoch

    def get_point(self) -> FinalizationPointDto:
        """Gets finalization point.
        Returns:
            Finalization point.
        """
        return self.point

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.epoch.get_size()
        size += self.point.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.epoch.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.point.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

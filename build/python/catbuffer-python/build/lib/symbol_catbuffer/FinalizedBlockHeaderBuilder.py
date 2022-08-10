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
from .FinalizationRoundBuilder import FinalizationRoundBuilder
from .Hash256Dto import Hash256Dto
from .HeightDto import HeightDto

class FinalizedBlockHeaderBuilder:
    """Binary layout for finalized block header.

    Attributes:
        round: Finalization round.
        height: Finalization height.
        hash: Finalization hash.
    """

    def __init__(self, round: FinalizationRoundBuilder, height: HeightDto, hash: Hash256Dto):
        """Constructor.
        Args:
            round: Finalization round.
            height: Finalization height.
            hash: Finalization hash.
        """
        self.round = round
        self.height = height
        self.hash = hash


    @classmethod
    def load_from_binary(cls, payload: bytes) -> FinalizedBlockHeaderBuilder:
        """Creates an instance of FinalizedBlockHeaderBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of FinalizedBlockHeaderBuilder.
        """
        bytes_ = bytes(payload)

        round = FinalizationRoundBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[round.get_size():]
        height = HeightDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[height.get_size():]
        hash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[hash.get_size():]
        return FinalizedBlockHeaderBuilder(round, height, hash)

    def get_round(self) -> FinalizationRoundBuilder:
        """Gets finalization round.
        Returns:
            Finalization round.
        """
        return self.round

    def get_height(self) -> HeightDto:
        """Gets finalization height.
        Returns:
            Finalization height.
        """
        return self.height

    def get_hash(self) -> Hash256Dto:
        """Gets finalization hash.
        Returns:
            Finalization hash.
        """
        return self.hash

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.round.get_size()
        size += self.height.get_size()
        size += self.hash.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.round.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.height.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.hash.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

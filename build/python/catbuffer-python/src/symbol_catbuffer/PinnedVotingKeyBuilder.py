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
from .VotingKeyDto import VotingKeyDto

class PinnedVotingKeyBuilder:
    """Pinned voting key.

    Attributes:
        votingKey: Voting key.
        startEpoch: Start finalization epoch.
        endEpoch: End finalization epoch.
    """

    def __init__(self, votingKey: VotingKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto):
        """Constructor.
        Args:
            votingKey: Voting key.
            startEpoch: Start finalization epoch.
            endEpoch: End finalization epoch.
        """
        self.votingKey = votingKey
        self.startEpoch = startEpoch
        self.endEpoch = endEpoch


    @classmethod
    def load_from_binary(cls, payload: bytes) -> PinnedVotingKeyBuilder:
        """Creates an instance of PinnedVotingKeyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of PinnedVotingKeyBuilder.
        """
        bytes_ = bytes(payload)

        votingKey = VotingKeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[votingKey.get_size():]
        startEpoch = FinalizationEpochDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[startEpoch.get_size():]
        endEpoch = FinalizationEpochDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[endEpoch.get_size():]
        return PinnedVotingKeyBuilder(votingKey, startEpoch, endEpoch)

    def get_voting_key(self) -> VotingKeyDto:
        """Gets voting key.
        Returns:
            Voting key.
        """
        return self.votingKey

    def get_start_epoch(self) -> FinalizationEpochDto:
        """Gets start finalization epoch.
        Returns:
            Start finalization epoch.
        """
        return self.startEpoch

    def get_end_epoch(self) -> FinalizationEpochDto:
        """Gets end finalization epoch.
        Returns:
            End finalization epoch.
        """
        return self.endEpoch

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.votingKey.get_size()
        size += self.startEpoch.get_size()
        size += self.endEpoch.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.votingKey.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.startEpoch.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.endEpoch.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

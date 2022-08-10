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
from .AmountDto import AmountDto
from .Hash256Dto import Hash256Dto

class ImportanceBlockFooterBuilder:
    """Binary layout for an importance block footer.

    Attributes:
        votingEligibleAccountsCount: Number of voting eligible accounts.
        harvestingEligibleAccountsCount: Number of harvesting eligible accounts.
        totalVotingBalance: Total balance eligible for voting.
        previousImportanceBlockHash: Previous importance block hash.
    """

    def __init__(self, votingEligibleAccountsCount: int, harvestingEligibleAccountsCount: int, totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto):
        """Constructor.
        Args:
            votingEligibleAccountsCount: Number of voting eligible accounts.
            harvestingEligibleAccountsCount: Number of harvesting eligible accounts.
            totalVotingBalance: Total balance eligible for voting.
            previousImportanceBlockHash: Previous importance block hash.
        """
        self.votingEligibleAccountsCount = votingEligibleAccountsCount
        self.harvestingEligibleAccountsCount = harvestingEligibleAccountsCount
        self.totalVotingBalance = totalVotingBalance
        self.previousImportanceBlockHash = previousImportanceBlockHash


    @classmethod
    def load_from_binary(cls, payload: bytes) -> ImportanceBlockFooterBuilder:
        """Creates an instance of ImportanceBlockFooterBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ImportanceBlockFooterBuilder.
        """
        bytes_ = bytes(payload)

        votingEligibleAccountsCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        harvestingEligibleAccountsCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        totalVotingBalance = AmountDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[totalVotingBalance.get_size():]
        previousImportanceBlockHash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[previousImportanceBlockHash.get_size():]
        return ImportanceBlockFooterBuilder(votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash)

    def get_voting_eligible_accounts_count(self) -> int:
        """Gets number of voting eligible accounts.
        Returns:
            Number of voting eligible accounts.
        """
        return self.votingEligibleAccountsCount

    def get_harvesting_eligible_accounts_count(self) -> int:
        """Gets number of harvesting eligible accounts.
        Returns:
            Number of harvesting eligible accounts.
        """
        return self.harvestingEligibleAccountsCount

    def get_total_voting_balance(self) -> AmountDto:
        """Gets total balance eligible for voting.
        Returns:
            Total balance eligible for voting.
        """
        return self.totalVotingBalance

    def get_previous_importance_block_hash(self) -> Hash256Dto:
        """Gets previous importance block hash.
        Returns:
            Previous importance block hash.
        """
        return self.previousImportanceBlockHash

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 4  # votingEligibleAccountsCount
        size += 8  # harvestingEligibleAccountsCount
        size += self.totalVotingBalance.get_size()
        size += self.previousImportanceBlockHash.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_voting_eligible_accounts_count(), 4))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_harvesting_eligible_accounts_count(), 8))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.totalVotingBalance.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.previousImportanceBlockHash.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

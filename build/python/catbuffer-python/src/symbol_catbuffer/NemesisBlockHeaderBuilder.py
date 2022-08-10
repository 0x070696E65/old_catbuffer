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
from .AddressDto import AddressDto
from .AmountDto import AmountDto
from .BlockFeeMultiplierDto import BlockFeeMultiplierDto
from .BlockHeaderBuilder import BlockHeaderBuilder
from .DifficultyDto import DifficultyDto
from .EntityTypeDto import EntityTypeDto
from .Hash256Dto import Hash256Dto
from .HeightDto import HeightDto
from .ImportanceBlockFooterBuilder import ImportanceBlockFooterBuilder
from .KeyDto import KeyDto
from .NetworkTypeDto import NetworkTypeDto
from .SignatureDto import SignatureDto
from .TimestampDto import TimestampDto
from .VrfProofBuilder import VrfProofBuilder

class NemesisBlockHeaderBuilder(BlockHeaderBuilder):
    """Binary layout for a nemesis block header.

    Attributes:
        importanceBlockFooter: Importance block footer.
    """

    def __init__(self, signature: SignatureDto, signerPublicKey: KeyDto, version: int, network: NetworkTypeDto, type: EntityTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto, votingEligibleAccountsCount: int, harvestingEligibleAccountsCount: int, totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto):
        """Constructor.
        Args:
            signature: Entity signature.
            signerPublicKey: Entity signer's public key.
            version: Entity version.
            network: Entity network.
            type: Entity type.
            height: Block height.
            timestamp: Number of milliseconds elapsed since creation of nemesis block.
            difficulty: Block difficulty.
            generationHashProof: Generation hash proof.
            previousBlockHash: Previous block hash.
            transactionsHash: Hash of the transactions in this block.
            receiptsHash: Hash of the receipts generated by this block.
            stateHash: Hash of the global chain state at this block.
            beneficiaryAddress: Beneficiary address designated by harvester.
            feeMultiplier: Fee multiplier applied to block transactions.
            votingEligibleAccountsCount: Number of voting eligible accounts.
            harvestingEligibleAccountsCount: Number of harvesting eligible accounts.
            totalVotingBalance: Total balance eligible for voting.
            previousImportanceBlockHash: Previous importance block hash.
        """
        super().__init__(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier)
        self.importanceBlockFooter = ImportanceBlockFooterBuilder(votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash)


    @classmethod
    def load_from_binary(cls, payload: bytes) -> NemesisBlockHeaderBuilder:
        """Creates an instance of NemesisBlockHeaderBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of NemesisBlockHeaderBuilder.
        """
        bytes_ = bytes(payload)
        superObject = BlockHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        importanceBlockFooter = ImportanceBlockFooterBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[importanceBlockFooter.get_size():]
        return NemesisBlockHeaderBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.height, superObject.timestamp, superObject.difficulty, superObject.generationHashProof, superObject.previousBlockHash, superObject.transactionsHash, superObject.receiptsHash, superObject.stateHash, superObject.beneficiaryAddress, superObject.feeMultiplier, importanceBlockFooter.votingEligibleAccountsCount, importanceBlockFooter.harvestingEligibleAccountsCount, importanceBlockFooter.totalVotingBalance, importanceBlockFooter.previousImportanceBlockHash)

    def get_voting_eligible_accounts_count(self) -> int:
        """Gets number of voting eligible accounts.
        Returns:
            Number of voting eligible accounts.
        """
        return self.importanceBlockFooter.get_voting_eligible_accounts_count()

    def get_harvesting_eligible_accounts_count(self) -> int:
        """Gets number of harvesting eligible accounts.
        Returns:
            Number of harvesting eligible accounts.
        """
        return self.importanceBlockFooter.get_harvesting_eligible_accounts_count()

    def get_total_voting_balance(self) -> AmountDto:
        """Gets total balance eligible for voting.
        Returns:
            Total balance eligible for voting.
        """
        return self.importanceBlockFooter.get_total_voting_balance()

    def get_previous_importance_block_hash(self) -> Hash256Dto:
        """Gets previous importance block hash.
        Returns:
            Previous importance block hash.
        """
        return self.importanceBlockFooter.get_previous_importance_block_hash()

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.importanceBlockFooter.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.importanceBlockFooter.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

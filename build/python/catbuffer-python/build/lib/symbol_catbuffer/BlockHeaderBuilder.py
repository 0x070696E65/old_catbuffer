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
from .BlockFeeMultiplierDto import BlockFeeMultiplierDto
from .DifficultyDto import DifficultyDto
from .EntityTypeDto import EntityTypeDto
from .Hash256Dto import Hash256Dto
from .HeightDto import HeightDto
from .KeyDto import KeyDto
from .NetworkTypeDto import NetworkTypeDto
from .SignatureDto import SignatureDto
from .TimestampDto import TimestampDto
from .VrfProofBuilder import VrfProofBuilder

class BlockHeaderBuilder:
    """Binary layout for a block header.

    Attributes:
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
    """

    def __init__(self, signature: SignatureDto, signerPublicKey: KeyDto, version: int, network: NetworkTypeDto, type: EntityTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto):
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
        """
        self.signature = signature
        self.signerPublicKey = signerPublicKey
        self.version = version
        self.network = network
        self.type = type
        self.height = height
        self.timestamp = timestamp
        self.difficulty = difficulty
        self.generationHashProof = generationHashProof
        self.previousBlockHash = previousBlockHash
        self.transactionsHash = transactionsHash
        self.receiptsHash = receiptsHash
        self.stateHash = stateHash
        self.beneficiaryAddress = beneficiaryAddress
        self.feeMultiplier = feeMultiplier


    @classmethod
    def load_from_binary(cls, payload: bytes) -> BlockHeaderBuilder:
        """Creates an instance of BlockHeaderBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of BlockHeaderBuilder.
        """
        bytes_ = bytes(payload)

        size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        verifiableEntityHeader_Reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        signature = SignatureDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[signature.get_size():]
        signerPublicKey = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[signerPublicKey.get_size():]
        entityBody_Reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        version = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]
        network = NetworkTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[network.get_size():]
        type = EntityTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[type.get_size():]
        height = HeightDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[height.get_size():]
        timestamp = TimestampDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[timestamp.get_size():]
        difficulty = DifficultyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[difficulty.get_size():]
        generationHashProof = VrfProofBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[generationHashProof.get_size():]
        previousBlockHash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[previousBlockHash.get_size():]
        transactionsHash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[transactionsHash.get_size():]
        receiptsHash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[receiptsHash.get_size():]
        stateHash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[stateHash.get_size():]
        beneficiaryAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[beneficiaryAddress.get_size():]
        feeMultiplier = BlockFeeMultiplierDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[feeMultiplier.get_size():]
        return BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier)

    def get_signature(self) -> SignatureDto:
        """Gets entity signature.
        Returns:
            Entity signature.
        """
        return self.signature

    def get_signer_public_key(self) -> KeyDto:
        """Gets entity signer's public key.
        Returns:
            Entity signer's public key.
        """
        return self.signerPublicKey

    def get_version(self) -> int:
        """Gets entity version.
        Returns:
            Entity version.
        """
        return self.version

    def get_network(self) -> NetworkTypeDto:
        """Gets entity network.
        Returns:
            Entity network.
        """
        return self.network

    def get_type(self) -> EntityTypeDto:
        """Gets entity type.
        Returns:
            Entity type.
        """
        return self.type

    def get_height(self) -> HeightDto:
        """Gets block height.
        Returns:
            Block height.
        """
        return self.height

    def get_timestamp(self) -> TimestampDto:
        """Gets number of milliseconds elapsed since creation of nemesis block.
        Returns:
            Number of milliseconds elapsed since creation of nemesis block.
        """
        return self.timestamp

    def get_difficulty(self) -> DifficultyDto:
        """Gets block difficulty.
        Returns:
            Block difficulty.
        """
        return self.difficulty

    def get_generation_hash_proof(self) -> VrfProofBuilder:
        """Gets generation hash proof.
        Returns:
            Generation hash proof.
        """
        return self.generationHashProof

    def get_previous_block_hash(self) -> Hash256Dto:
        """Gets previous block hash.
        Returns:
            Previous block hash.
        """
        return self.previousBlockHash

    def get_transactions_hash(self) -> Hash256Dto:
        """Gets hash of the transactions in this block.
        Returns:
            Hash of the transactions in this block.
        """
        return self.transactionsHash

    def get_receipts_hash(self) -> Hash256Dto:
        """Gets hash of the receipts generated by this block.
        Returns:
            Hash of the receipts generated by this block.
        """
        return self.receiptsHash

    def get_state_hash(self) -> Hash256Dto:
        """Gets hash of the global chain state at this block.
        Returns:
            Hash of the global chain state at this block.
        """
        return self.stateHash

    def get_beneficiary_address(self) -> AddressDto:
        """Gets beneficiary address designated by harvester.
        Returns:
            Beneficiary address designated by harvester.
        """
        return self.beneficiaryAddress

    def get_fee_multiplier(self) -> BlockFeeMultiplierDto:
        """Gets fee multiplier applied to block transactions.
        Returns:
            Fee multiplier applied to block transactions.
        """
        return self.feeMultiplier

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 4  # size
        size += 4  # verifiableEntityHeader_Reserved1
        size += self.signature.get_size()
        size += self.signerPublicKey.get_size()
        size += 4  # entityBody_Reserved1
        size += 1  # version
        size += self.network.get_size()
        size += self.type.get_size()
        size += self.height.get_size()
        size += self.timestamp.get_size()
        size += self.difficulty.get_size()
        size += self.generationHashProof.get_size()
        size += self.previousBlockHash.get_size()
        size += self.transactionsHash.get_size()
        size += self.receiptsHash.get_size()
        size += self.stateHash.get_size()
        size += self.beneficiaryAddress.get_size()
        size += self.feeMultiplier.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_size(), 4))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.signature.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.signerPublicKey.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_version(), 1))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.network.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.type.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.height.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.timestamp.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.difficulty.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.generationHashProof.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.previousBlockHash.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.transactionsHash.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.receiptsHash.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.stateHash.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.beneficiaryAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.feeMultiplier.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

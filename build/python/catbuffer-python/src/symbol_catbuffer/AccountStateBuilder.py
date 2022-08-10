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
from .AccountKeyTypeFlagsDto import AccountKeyTypeFlagsDto
from .AccountStateFormatDto import AccountStateFormatDto
from .AccountTypeDto import AccountTypeDto
from .AddressDto import AddressDto
from .HeightActivityBucketsBuilder import HeightActivityBucketsBuilder
from .HeightDto import HeightDto
from .ImportanceSnapshotBuilder import ImportanceSnapshotBuilder
from .KeyDto import KeyDto
from .MosaicBuilder import MosaicBuilder
from .PinnedVotingKeyBuilder import PinnedVotingKeyBuilder
from .StateHeaderBuilder import StateHeaderBuilder

class AccountStateBuilder(StateHeaderBuilder):
    """Binary layout for non-historical account state.

    Attributes:
        address: Address of account.
        addressHeight: Height at which address has been obtained.
        publicKey: Public key of account.
        publicKeyHeight: Height at which public key has been obtained.
        accountType: Type of account.
        format: Account format.
        supplementalPublicKeysMask: Mask of supplemental public key flags.
        linkedPublicKey: Linked account public key.
        nodePublicKey: Node public key.
        vrfPublicKey: Vrf public key.
        votingPublicKeys: Voting public keys.
        importanceSnapshots: Current importance snapshot of the account.
        activityBuckets: Activity buckets of the account.
        balances: Balances of account.
    """

    def __init__(self, version: int, address: AddressDto, addressHeight: HeightDto, publicKey: KeyDto, publicKeyHeight: HeightDto, accountType: AccountTypeDto, format: AccountStateFormatDto, supplementalPublicKeysMask: List[AccountKeyTypeFlagsDto], linkedPublicKey: KeyDto, nodePublicKey: KeyDto, vrfPublicKey: KeyDto, votingPublicKeys: List[PinnedVotingKeyBuilder], importanceSnapshots: ImportanceSnapshotBuilder, activityBuckets: HeightActivityBucketsBuilder, balances: List[MosaicBuilder]):
        """Constructor.
        Args:
            version: Serialization version.
            address: Address of account.
            addressHeight: Height at which address has been obtained.
            publicKey: Public key of account.
            publicKeyHeight: Height at which public key has been obtained.
            accountType: Type of account.
            format: Account format.
            supplementalPublicKeysMask: Mask of supplemental public key flags.
            linkedPublicKey: Linked account public key.
            nodePublicKey: Node public key.
            vrfPublicKey: Vrf public key.
            votingPublicKeys: Voting public keys.
            importanceSnapshots: Current importance snapshot of the account.
            activityBuckets: Activity buckets of the account.
            balances: Balances of account.
        """
        super().__init__(version)
        self.address = address
        self.addressHeight = addressHeight
        self.publicKey = publicKey
        self.publicKeyHeight = publicKeyHeight
        self.accountType = accountType
        self.format = format
        self.supplementalPublicKeysMask = supplementalPublicKeysMask
        self.linkedPublicKey = linkedPublicKey
        self.nodePublicKey = nodePublicKey
        self.vrfPublicKey = vrfPublicKey
        self.votingPublicKeys = votingPublicKeys
        self.importanceSnapshots = importanceSnapshots
        self.activityBuckets = activityBuckets
        self.balances = balances


    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountStateBuilder:
        """Creates an instance of AccountStateBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountStateBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        address = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[address.get_size():]
        addressHeight = HeightDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[addressHeight.get_size():]
        publicKey = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[publicKey.get_size():]
        publicKeyHeight = HeightDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[publicKeyHeight.get_size():]
        accountType = AccountTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[accountType.get_size():]
        format = AccountStateFormatDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[format.get_size():]
        supplementalPublicKeysMask = AccountKeyTypeFlagsDto.bytesToFlags(bytes_, 1)  # kind:FLAGS
        bytes_ = bytes_[1:]
        votingPublicKeysCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIZE_FIELD
        bytes_ = bytes_[1:]
        linkedPublicKey = None
        if AccountKeyTypeFlagsDto.LINKED in supplementalPublicKeysMask:
            linkedPublicKey = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[linkedPublicKey.get_size():]
        nodePublicKey = None
        if AccountKeyTypeFlagsDto.NODE in supplementalPublicKeysMask:
            nodePublicKey = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[nodePublicKey.get_size():]
        vrfPublicKey = None
        if AccountKeyTypeFlagsDto.VRF in supplementalPublicKeysMask:
            vrfPublicKey = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[vrfPublicKey.get_size():]
        votingPublicKeys: List[PinnedVotingKeyBuilder] = []  # kind:ARRAY
        for _ in range(votingPublicKeysCount):
            item = PinnedVotingKeyBuilder.load_from_binary(bytes_)
            votingPublicKeys.append(item)
            bytes_ = bytes_[item.get_size():]
        importanceSnapshots = None
        if format == AccountStateFormatDto.HIGH_VALUE:
            importanceSnapshots = ImportanceSnapshotBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[importanceSnapshots.get_size():]
        activityBuckets = None
        if format == AccountStateFormatDto.HIGH_VALUE:
            activityBuckets = HeightActivityBucketsBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[activityBuckets.get_size():]
        balancesCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIZE_FIELD
        bytes_ = bytes_[2:]
        balances: List[MosaicBuilder] = []  # kind:ARRAY
        for _ in range(balancesCount):
            item = MosaicBuilder.load_from_binary(bytes_)
            balances.append(item)
            bytes_ = bytes_[item.get_size():]
        return AccountStateBuilder(superObject.version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances)

    def get_address(self) -> AddressDto:
        """Gets address of account.
        Returns:
            Address of account.
        """
        return self.address

    def get_address_height(self) -> HeightDto:
        """Gets height at which address has been obtained.
        Returns:
            Height at which address has been obtained.
        """
        return self.addressHeight

    def get_public_key(self) -> KeyDto:
        """Gets public key of account.
        Returns:
            Public key of account.
        """
        return self.publicKey

    def get_public_key_height(self) -> HeightDto:
        """Gets height at which public key has been obtained.
        Returns:
            Height at which public key has been obtained.
        """
        return self.publicKeyHeight

    def get_account_type(self) -> AccountTypeDto:
        """Gets type of account.
        Returns:
            Type of account.
        """
        return self.accountType

    def get_format(self) -> AccountStateFormatDto:
        """Gets account format.
        Returns:
            Account format.
        """
        return self.format

    def get_supplemental_public_keys_mask(self) -> List[AccountKeyTypeFlagsDto]:
        """Gets mask of supplemental public key flags.
        Returns:
            Mask of supplemental public key flags.
        """
        return self.supplementalPublicKeysMask

    def get_linked_public_key(self) -> KeyDto:
        """Gets linked account public key.
        Returns:
            Linked account public key.
        """
        if not AccountKeyTypeFlagsDto.LINKED in self.supplementalPublicKeysMask:
            raise Exception('supplementalPublicKeysMask is not set to LINKED.')
        return self.linkedPublicKey

    def get_node_public_key(self) -> KeyDto:
        """Gets node public key.
        Returns:
            Node public key.
        """
        if not AccountKeyTypeFlagsDto.NODE in self.supplementalPublicKeysMask:
            raise Exception('supplementalPublicKeysMask is not set to NODE.')
        return self.nodePublicKey

    def get_vrf_public_key(self) -> KeyDto:
        """Gets vrf public key.
        Returns:
            Vrf public key.
        """
        if not AccountKeyTypeFlagsDto.VRF in self.supplementalPublicKeysMask:
            raise Exception('supplementalPublicKeysMask is not set to VRF.')
        return self.vrfPublicKey

    def get_voting_public_keys(self) -> List[PinnedVotingKeyBuilder]:
        """Gets voting public keys.
        Returns:
            Voting public keys.
        """
        return self.votingPublicKeys

    def get_importance_snapshots(self) -> ImportanceSnapshotBuilder:
        """Gets current importance snapshot of the account.
        Returns:
            Current importance snapshot of the account.
        """
        if not self.format == AccountStateFormatDto.HIGH_VALUE:
            raise Exception('format is not set to HIGH_VALUE.')
        return self.importanceSnapshots

    def get_activity_buckets(self) -> HeightActivityBucketsBuilder:
        """Gets activity buckets of the account.
        Returns:
            Activity buckets of the account.
        """
        if not self.format == AccountStateFormatDto.HIGH_VALUE:
            raise Exception('format is not set to HIGH_VALUE.')
        return self.activityBuckets

    def get_balances(self) -> List[MosaicBuilder]:
        """Gets balances of account.
        Returns:
            Balances of account.
        """
        return self.balances

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.address.get_size()
        size += self.addressHeight.get_size()
        size += self.publicKey.get_size()
        size += self.publicKeyHeight.get_size()
        size += self.accountType.get_size()
        size += self.format.get_size()
        size += 1  # supplementalPublicKeysMask
        size += 1  # votingPublicKeysCount
        if AccountKeyTypeFlagsDto.LINKED in self.supplementalPublicKeysMask:
            size += self.linkedPublicKey.get_size()
        if AccountKeyTypeFlagsDto.NODE in self.supplementalPublicKeysMask:
            size += self.nodePublicKey.get_size()
        if AccountKeyTypeFlagsDto.VRF in self.supplementalPublicKeysMask:
            size += self.vrfPublicKey.get_size()
        for _ in self.votingPublicKeys:
            size += _.get_size()
        if self.format == AccountStateFormatDto.HIGH_VALUE:
            size += self.importanceSnapshots.get_size()
        if self.format == AccountStateFormatDto.HIGH_VALUE:
            size += self.activityBuckets.get_size()
        size += 2  # balancesCount
        for _ in self.balances:
            size += _.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.address.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.addressHeight.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.publicKey.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.publicKeyHeight.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.accountType.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.format.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(AccountKeyTypeFlagsDto.flagsToInt(self.get_supplemental_public_keys_mask()), 1))  # kind:FLAGS
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_voting_public_keys()), 1))  # kind:SIZE_FIELD
        if AccountKeyTypeFlagsDto.LINKED in self.supplementalPublicKeysMask:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.linkedPublicKey.serialize())  # kind:CUSTOM
        if AccountKeyTypeFlagsDto.NODE in self.supplementalPublicKeysMask:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.nodePublicKey.serialize())  # kind:CUSTOM
        if AccountKeyTypeFlagsDto.VRF in self.supplementalPublicKeysMask:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.vrfPublicKey.serialize())  # kind:CUSTOM
        for _ in self.votingPublicKeys: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        if self.format == AccountStateFormatDto.HIGH_VALUE:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.importanceSnapshots.serialize())  # kind:CUSTOM
        if self.format == AccountStateFormatDto.HIGH_VALUE:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.activityBuckets.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_balances()), 2))  # kind:SIZE_FIELD
        for _ in self.balances: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        return bytes_
    # end of class

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
from .AddressDto import AddressDto
from .StateHeaderBuilder import StateHeaderBuilder

class MultisigEntryBuilder(StateHeaderBuilder):
    """Binary layout for a multisig entry.

    Attributes:
        minApproval: Minimum approval for modifications.
        minRemoval: Minimum approval for removal.
        accountAddress: Account address.
        cosignatoryAddresses: Cosignatories for account.
        multisigAddresses: Accounts for which the entry is cosignatory.
    """

    def __init__(self, version: int, minApproval: int, minRemoval: int, accountAddress: AddressDto, cosignatoryAddresses: List[AddressDto], multisigAddresses: List[AddressDto]):
        """Constructor.
        Args:
            version: Serialization version.
            minApproval: Minimum approval for modifications.
            minRemoval: Minimum approval for removal.
            accountAddress: Account address.
            cosignatoryAddresses: Cosignatories for account.
            multisigAddresses: Accounts for which the entry is cosignatory.
        """
        super().__init__(version)
        self.minApproval = minApproval
        self.minRemoval = minRemoval
        self.accountAddress = accountAddress
        self.cosignatoryAddresses = cosignatoryAddresses
        self.multisigAddresses = multisigAddresses


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MultisigEntryBuilder:
        """Creates an instance of MultisigEntryBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MultisigEntryBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        minApproval = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        minRemoval = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        accountAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[accountAddress.get_size():]
        cosignatoryAddressesCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIZE_FIELD
        bytes_ = bytes_[8:]
        cosignatoryAddresses: List[AddressDto] = []  # kind:ARRAY
        for _ in range(cosignatoryAddressesCount):
            item = AddressDto.load_from_binary(bytes_)
            cosignatoryAddresses.append(item)
            bytes_ = bytes_[item.get_size():]
        multisigAddressesCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIZE_FIELD
        bytes_ = bytes_[8:]
        multisigAddresses: List[AddressDto] = []  # kind:ARRAY
        for _ in range(multisigAddressesCount):
            item = AddressDto.load_from_binary(bytes_)
            multisigAddresses.append(item)
            bytes_ = bytes_[item.get_size():]
        return MultisigEntryBuilder(superObject.version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses)

    def get_min_approval(self) -> int:
        """Gets minimum approval for modifications.
        Returns:
            Minimum approval for modifications.
        """
        return self.minApproval

    def get_min_removal(self) -> int:
        """Gets minimum approval for removal.
        Returns:
            Minimum approval for removal.
        """
        return self.minRemoval

    def get_account_address(self) -> AddressDto:
        """Gets account address.
        Returns:
            Account address.
        """
        return self.accountAddress

    def get_cosignatory_addresses(self) -> List[AddressDto]:
        """Gets cosignatories for account.
        Returns:
            Cosignatories for account.
        """
        return self.cosignatoryAddresses

    def get_multisig_addresses(self) -> List[AddressDto]:
        """Gets accounts for which the entry is cosignatory.
        Returns:
            Accounts for which the entry is cosignatory.
        """
        return self.multisigAddresses

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += 4  # minApproval
        size += 4  # minRemoval
        size += self.accountAddress.get_size()
        size += 8  # cosignatoryAddressesCount
        for _ in self.cosignatoryAddresses:
            size += _.get_size()
        size += 8  # multisigAddressesCount
        for _ in self.multisigAddresses:
            size += _.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_min_approval(), 4))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_min_removal(), 4))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.accountAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_cosignatory_addresses()), 8))  # kind:SIZE_FIELD
        for _ in self.cosignatoryAddresses: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_multisig_addresses()), 8))  # kind:SIZE_FIELD
        for _ in self.multisigAddresses: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        return bytes_
    # end of class

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
from .Hash256Dto import Hash256Dto
from .HeightDto import HeightDto
from .LockStatusDto import LockStatusDto
from .MosaicBuilder import MosaicBuilder
from .StateHeaderBuilder import StateHeaderBuilder

class HashLockInfoBuilder(StateHeaderBuilder):
    """Binary layout for hash lock transaction info.

    Attributes:
        ownerAddress: Owner address.
        mosaic: Mosaic associated with lock.
        endHeight: Height at which the lock expires.
        status: Flag indicating whether or not the lock was already used.
        hash: Hash.
    """

    def __init__(self, version: int, ownerAddress: AddressDto, mosaic: MosaicBuilder, endHeight: HeightDto, status: LockStatusDto, hash: Hash256Dto):
        """Constructor.
        Args:
            version: Serialization version.
            ownerAddress: Owner address.
            mosaic: Mosaic associated with lock.
            endHeight: Height at which the lock expires.
            status: Flag indicating whether or not the lock was already used.
            hash: Hash.
        """
        super().__init__(version)
        self.ownerAddress = ownerAddress
        self.mosaic = mosaic
        self.endHeight = endHeight
        self.status = status
        self.hash = hash


    @classmethod
    def load_from_binary(cls, payload: bytes) -> HashLockInfoBuilder:
        """Creates an instance of HashLockInfoBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of HashLockInfoBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        ownerAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[ownerAddress.get_size():]
        mosaic = MosaicBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[mosaic.get_size():]
        endHeight = HeightDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[endHeight.get_size():]
        status = LockStatusDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[status.get_size():]
        hash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[hash.get_size():]
        return HashLockInfoBuilder(superObject.version, ownerAddress, mosaic, endHeight, status, hash)

    def get_owner_address(self) -> AddressDto:
        """Gets owner address.
        Returns:
            Owner address.
        """
        return self.ownerAddress

    def get_mosaic(self) -> MosaicBuilder:
        """Gets mosaic associated with lock.
        Returns:
            Mosaic associated with lock.
        """
        return self.mosaic

    def get_end_height(self) -> HeightDto:
        """Gets height at which the lock expires.
        Returns:
            Height at which the lock expires.
        """
        return self.endHeight

    def get_status(self) -> LockStatusDto:
        """Gets flag indicating whether or not the lock was already used.
        Returns:
            Flag indicating whether or not the lock was already used.
        """
        return self.status

    def get_hash(self) -> Hash256Dto:
        """Gets hash.
        Returns:
            Hash.
        """
        return self.hash

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.ownerAddress.get_size()
        size += self.mosaic.get_size()
        size += self.endHeight.get_size()
        size += self.status.get_size()
        size += self.hash.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.ownerAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaic.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.endHeight.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.status.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.hash.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

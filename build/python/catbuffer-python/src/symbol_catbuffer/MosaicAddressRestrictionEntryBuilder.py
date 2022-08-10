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
from .AddressKeyValueSetBuilder import AddressKeyValueSetBuilder
from .MosaicIdDto import MosaicIdDto

class MosaicAddressRestrictionEntryBuilder:
    """Binary layout for a mosaic restriction.

    Attributes:
        mosaicId: Identifier of the mosaic to which the restriction applies.
        address: Address being restricted.
        keyPairs: Address key value restriction set.
    """

    def __init__(self, mosaicId: MosaicIdDto, address: AddressDto, keyPairs: AddressKeyValueSetBuilder):
        """Constructor.
        Args:
            mosaicId: Identifier of the mosaic to which the restriction applies.
            address: Address being restricted.
            keyPairs: Address key value restriction set.
        """
        self.mosaicId = mosaicId
        self.address = address
        self.keyPairs = keyPairs


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicAddressRestrictionEntryBuilder:
        """Creates an instance of MosaicAddressRestrictionEntryBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicAddressRestrictionEntryBuilder.
        """
        bytes_ = bytes(payload)

        mosaicId = MosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[mosaicId.get_size():]
        address = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[address.get_size():]
        keyPairs = AddressKeyValueSetBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[keyPairs.get_size():]
        return MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs)

    def get_mosaic_id(self) -> MosaicIdDto:
        """Gets identifier of the mosaic to which the restriction applies.
        Returns:
            Identifier of the mosaic to which the restriction applies.
        """
        return self.mosaicId

    def get_address(self) -> AddressDto:
        """Gets address being restricted.
        Returns:
            Address being restricted.
        """
        return self.address

    def get_key_pairs(self) -> AddressKeyValueSetBuilder:
        """Gets address key value restriction set.
        Returns:
            Address key value restriction set.
        """
        return self.keyPairs

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.mosaicId.get_size()
        size += self.address.get_size()
        size += self.keyPairs.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaicId.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.address.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.keyPairs.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

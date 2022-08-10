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
from .MosaicAddressRestrictionEntryBuilder import MosaicAddressRestrictionEntryBuilder
from .MosaicGlobalRestrictionEntryBuilder import MosaicGlobalRestrictionEntryBuilder
from .MosaicRestrictionEntryTypeDto import MosaicRestrictionEntryTypeDto
from .StateHeaderBuilder import StateHeaderBuilder

class MosaicRestrictionEntryBuilder(StateHeaderBuilder):
    """Binary layout for a mosaic restriction.

    Attributes:
        entryType: Type of restriction being placed upon the entity.
        addressEntry: Address restriction rule.
        globalEntry: Global mosaic rule.
    """

    def __init__(self, version: int, entryType: MosaicRestrictionEntryTypeDto, addressEntry: MosaicAddressRestrictionEntryBuilder, globalEntry: MosaicGlobalRestrictionEntryBuilder):
        """Constructor.
        Args:
            version: Serialization version.
            entryType: Type of restriction being placed upon the entity.
            addressEntry: Address restriction rule.
            globalEntry: Global mosaic rule.
        """
        super().__init__(version)
        self.entryType = entryType
        self.addressEntry = addressEntry
        self.globalEntry = globalEntry


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicRestrictionEntryBuilder:
        """Creates an instance of MosaicRestrictionEntryBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicRestrictionEntryBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        entryType = MosaicRestrictionEntryTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[entryType.get_size():]
        addressEntry = None
        if entryType == MosaicRestrictionEntryTypeDto.ADDRESS:
            addressEntry = MosaicAddressRestrictionEntryBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[addressEntry.get_size():]
        globalEntry = None
        if entryType == MosaicRestrictionEntryTypeDto.GLOBAL:
            globalEntry = MosaicGlobalRestrictionEntryBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[globalEntry.get_size():]
        return MosaicRestrictionEntryBuilder(superObject.version, entryType, addressEntry, globalEntry)

    def get_entry_type(self) -> MosaicRestrictionEntryTypeDto:
        """Gets type of restriction being placed upon the entity.
        Returns:
            Type of restriction being placed upon the entity.
        """
        return self.entryType

    def get_address_entry(self) -> MosaicAddressRestrictionEntryBuilder:
        """Gets address restriction rule.
        Returns:
            Address restriction rule.
        """
        if not self.entryType == MosaicRestrictionEntryTypeDto.ADDRESS:
            raise Exception('entryType is not set to ADDRESS.')
        return self.addressEntry

    def get_global_entry(self) -> MosaicGlobalRestrictionEntryBuilder:
        """Gets global mosaic rule.
        Returns:
            Global mosaic rule.
        """
        if not self.entryType == MosaicRestrictionEntryTypeDto.GLOBAL:
            raise Exception('entryType is not set to GLOBAL.')
        return self.globalEntry

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.entryType.get_size()
        if self.entryType == MosaicRestrictionEntryTypeDto.ADDRESS:
            size += self.addressEntry.get_size()
        if self.entryType == MosaicRestrictionEntryTypeDto.GLOBAL:
            size += self.globalEntry.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.entryType.serialize())  # kind:CUSTOM
        if self.entryType == MosaicRestrictionEntryTypeDto.ADDRESS:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.addressEntry.serialize())  # kind:CUSTOM
        if self.entryType == MosaicRestrictionEntryTypeDto.GLOBAL:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.globalEntry.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

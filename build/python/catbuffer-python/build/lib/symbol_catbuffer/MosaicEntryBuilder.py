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
from .MosaicDefinitionBuilder import MosaicDefinitionBuilder
from .MosaicIdDto import MosaicIdDto
from .StateHeaderBuilder import StateHeaderBuilder

class MosaicEntryBuilder(StateHeaderBuilder):
    """Binary layout for mosaic entry.

    Attributes:
        mosaicId: Entry id.
        supply: Total supply amount.
        definition: Definition comprised of entry properties.
    """

    def __init__(self, version: int, mosaicId: MosaicIdDto, supply: AmountDto, definition: MosaicDefinitionBuilder):
        """Constructor.
        Args:
            version: Serialization version.
            mosaicId: Entry id.
            supply: Total supply amount.
            definition: Definition comprised of entry properties.
        """
        super().__init__(version)
        self.mosaicId = mosaicId
        self.supply = supply
        self.definition = definition


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicEntryBuilder:
        """Creates an instance of MosaicEntryBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicEntryBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        mosaicId = MosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[mosaicId.get_size():]
        supply = AmountDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[supply.get_size():]
        definition = MosaicDefinitionBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[definition.get_size():]
        return MosaicEntryBuilder(superObject.version, mosaicId, supply, definition)

    def get_mosaic_id(self) -> MosaicIdDto:
        """Gets entry id.
        Returns:
            Entry id.
        """
        return self.mosaicId

    def get_supply(self) -> AmountDto:
        """Gets total supply amount.
        Returns:
            Total supply amount.
        """
        return self.supply

    def get_definition(self) -> MosaicDefinitionBuilder:
        """Gets definition comprised of entry properties.
        Returns:
            Definition comprised of entry properties.
        """
        return self.definition

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.mosaicId.get_size()
        size += self.supply.get_size()
        size += self.definition.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaicId.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.supply.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.definition.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

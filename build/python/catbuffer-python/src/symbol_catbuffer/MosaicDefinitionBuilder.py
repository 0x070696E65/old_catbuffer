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
from .HeightDto import HeightDto
from .MosaicPropertiesBuilder import MosaicPropertiesBuilder

class MosaicDefinitionBuilder:
    """Binary layout for mosaic definition.

    Attributes:
        startHeight: Block height.
        ownerAddress: Mosaic owner.
        revision: Revision.
        properties: Properties.
    """

    def __init__(self, startHeight: HeightDto, ownerAddress: AddressDto, revision: int, properties: MosaicPropertiesBuilder):
        """Constructor.
        Args:
            startHeight: Block height.
            ownerAddress: Mosaic owner.
            revision: Revision.
            properties: Properties.
        """
        self.startHeight = startHeight
        self.ownerAddress = ownerAddress
        self.revision = revision
        self.properties = properties


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicDefinitionBuilder:
        """Creates an instance of MosaicDefinitionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicDefinitionBuilder.
        """
        bytes_ = bytes(payload)

        startHeight = HeightDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[startHeight.get_size():]
        ownerAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[ownerAddress.get_size():]
        revision = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        properties = MosaicPropertiesBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[properties.get_size():]
        return MosaicDefinitionBuilder(startHeight, ownerAddress, revision, properties)

    def get_start_height(self) -> HeightDto:
        """Gets block height.
        Returns:
            Block height.
        """
        return self.startHeight

    def get_owner_address(self) -> AddressDto:
        """Gets mosaic owner.
        Returns:
            Mosaic owner.
        """
        return self.ownerAddress

    def get_revision(self) -> int:
        """Gets revision.
        Returns:
            Revision.
        """
        return self.revision

    def get_properties(self) -> MosaicPropertiesBuilder:
        """Gets properties.
        Returns:
            Properties.
        """
        return self.properties

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.startHeight.get_size()
        size += self.ownerAddress.get_size()
        size += 4  # revision
        size += self.properties.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.startHeight.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.ownerAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_revision(), 4))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.properties.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

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
from .MetadataTypeDto import MetadataTypeDto
from .MetadataValueBuilder import MetadataValueBuilder
from .ScopedMetadataKeyDto import ScopedMetadataKeyDto
from .StateHeaderBuilder import StateHeaderBuilder

class MetadataEntryBuilder(StateHeaderBuilder):
    """Binary layout of a metadata entry.

    Attributes:
        sourceAddress: Metadata source address (provider).
        targetAddress: Metadata target address.
        scopedMetadataKey: Metadata key scoped to source, target and type.
        targetId: Target id.
        metadataType: Metadata type.
        value: Value.
    """

    def __init__(self, version: int, sourceAddress: AddressDto, targetAddress: AddressDto, scopedMetadataKey: ScopedMetadataKeyDto, targetId: int, metadataType: MetadataTypeDto, value: MetadataValueBuilder):
        """Constructor.
        Args:
            version: Serialization version.
            sourceAddress: Metadata source address (provider).
            targetAddress: Metadata target address.
            scopedMetadataKey: Metadata key scoped to source, target and type.
            targetId: Target id.
            metadataType: Metadata type.
            value: Value.
        """
        super().__init__(version)
        self.sourceAddress = sourceAddress
        self.targetAddress = targetAddress
        self.scopedMetadataKey = scopedMetadataKey
        self.targetId = targetId
        self.metadataType = metadataType
        self.value = value


    @classmethod
    def load_from_binary(cls, payload: bytes) -> MetadataEntryBuilder:
        """Creates an instance of MetadataEntryBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MetadataEntryBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        sourceAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[sourceAddress.get_size():]
        targetAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[targetAddress.get_size():]
        scopedMetadataKey = ScopedMetadataKeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[scopedMetadataKey.get_size():]
        targetId = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        metadataType = MetadataTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[metadataType.get_size():]
        value = MetadataValueBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[value.get_size():]
        return MetadataEntryBuilder(superObject.version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value)

    def get_source_address(self) -> AddressDto:
        """Gets metadata source address (provider).
        Returns:
            Metadata source address (provider).
        """
        return self.sourceAddress

    def get_target_address(self) -> AddressDto:
        """Gets metadata target address.
        Returns:
            Metadata target address.
        """
        return self.targetAddress

    def get_scoped_metadata_key(self) -> ScopedMetadataKeyDto:
        """Gets metadata key scoped to source, target and type.
        Returns:
            Metadata key scoped to source, target and type.
        """
        return self.scopedMetadataKey

    def get_target_id(self) -> int:
        """Gets target id.
        Returns:
            Target id.
        """
        return self.targetId

    def get_metadata_type(self) -> MetadataTypeDto:
        """Gets metadata type.
        Returns:
            Metadata type.
        """
        return self.metadataType

    def get_value(self) -> MetadataValueBuilder:
        """Gets value.
        Returns:
            Value.
        """
        return self.value

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.sourceAddress.get_size()
        size += self.targetAddress.get_size()
        size += self.scopedMetadataKey.get_size()
        size += 8  # targetId
        size += self.metadataType.get_size()
        size += self.value.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.sourceAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.targetAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.scopedMetadataKey.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_target_id(), 8))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.metadataType.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.value.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

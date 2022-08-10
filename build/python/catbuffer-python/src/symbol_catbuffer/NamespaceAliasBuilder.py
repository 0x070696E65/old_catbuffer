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
from .MosaicIdDto import MosaicIdDto
from .NamespaceAliasTypeDto import NamespaceAliasTypeDto

class NamespaceAliasBuilder:
    """Binary layout for alias.

    Attributes:
        namespaceAliasType: Namespace alias type.
        mosaicAlias: Mosaic alias.
        addressAlias: Address alias.
    """

    def __init__(self, namespaceAliasType: NamespaceAliasTypeDto, mosaicAlias: MosaicIdDto, addressAlias: AddressDto):
        """Constructor.
        Args:
            namespaceAliasType: Namespace alias type.
            mosaicAlias: Mosaic alias.
            addressAlias: Address alias.
        """
        self.namespaceAliasType = namespaceAliasType
        self.mosaicAlias = mosaicAlias
        self.addressAlias = addressAlias


    @classmethod
    def load_from_binary(cls, payload: bytes) -> NamespaceAliasBuilder:
        """Creates an instance of NamespaceAliasBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of NamespaceAliasBuilder.
        """
        bytes_ = bytes(payload)

        namespaceAliasType = NamespaceAliasTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[namespaceAliasType.get_size():]
        mosaicAlias = None
        if namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID:
            mosaicAlias = MosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[mosaicAlias.get_size():]
        addressAlias = None
        if namespaceAliasType == NamespaceAliasTypeDto.ADDRESS:
            addressAlias = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[addressAlias.get_size():]
        return NamespaceAliasBuilder(namespaceAliasType, mosaicAlias, addressAlias)

    def get_namespace_alias_type(self) -> NamespaceAliasTypeDto:
        """Gets namespace alias type.
        Returns:
            Namespace alias type.
        """
        return self.namespaceAliasType

    def get_mosaic_alias(self) -> MosaicIdDto:
        """Gets mosaic alias.
        Returns:
            Mosaic alias.
        """
        if not self.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID:
            raise Exception('namespaceAliasType is not set to MOSAIC_ID.')
        return self.mosaicAlias

    def get_address_alias(self) -> AddressDto:
        """Gets address alias.
        Returns:
            Address alias.
        """
        if not self.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS:
            raise Exception('namespaceAliasType is not set to ADDRESS.')
        return self.addressAlias

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.namespaceAliasType.get_size()
        if self.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID:
            size += self.mosaicAlias.get_size()
        if self.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS:
            size += self.addressAlias.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.namespaceAliasType.serialize())  # kind:CUSTOM
        if self.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaicAlias.serialize())  # kind:CUSTOM
        if self.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.addressAlias.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

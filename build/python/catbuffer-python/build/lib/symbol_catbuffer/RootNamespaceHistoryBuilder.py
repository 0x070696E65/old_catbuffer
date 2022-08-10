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
from .NamespaceAliasBuilder import NamespaceAliasBuilder
from .NamespaceIdDto import NamespaceIdDto
from .NamespaceLifetimeBuilder import NamespaceLifetimeBuilder
from .NamespacePathBuilder import NamespacePathBuilder
from .StateHeaderBuilder import StateHeaderBuilder

class RootNamespaceHistoryBuilder(StateHeaderBuilder):
    """Binary layout for non-historical root namespace history.

    Attributes:
        id: Id of the root namespace history.
        ownerAddress: Namespace owner address.
        lifetime: Lifetime in blocks.
        rootAlias: Root namespace alias.
        paths: Save child sub-namespace paths.
    """

    def __init__(self, version: int, id: NamespaceIdDto, ownerAddress: AddressDto, lifetime: NamespaceLifetimeBuilder, rootAlias: NamespaceAliasBuilder, paths: List[NamespacePathBuilder]):
        """Constructor.
        Args:
            version: Serialization version.
            id: Id of the root namespace history.
            ownerAddress: Namespace owner address.
            lifetime: Lifetime in blocks.
            rootAlias: Root namespace alias.
            paths: Save child sub-namespace paths.
        """
        super().__init__(version)
        self.id = id
        self.ownerAddress = ownerAddress
        self.lifetime = lifetime
        self.rootAlias = rootAlias
        self.paths = paths


    @classmethod
    def load_from_binary(cls, payload: bytes) -> RootNamespaceHistoryBuilder:
        """Creates an instance of RootNamespaceHistoryBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of RootNamespaceHistoryBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        id = NamespaceIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[id.get_size():]
        ownerAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[ownerAddress.get_size():]
        lifetime = NamespaceLifetimeBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[lifetime.get_size():]
        rootAlias = NamespaceAliasBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[rootAlias.get_size():]
        childrenCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIZE_FIELD
        bytes_ = bytes_[8:]
        paths: List[NamespacePathBuilder] = []  # kind:ARRAY
        for _ in range(childrenCount):
            item = NamespacePathBuilder.load_from_binary(bytes_)
            paths.append(item)
            bytes_ = bytes_[item.get_size():]
        return RootNamespaceHistoryBuilder(superObject.version, id, ownerAddress, lifetime, rootAlias, paths)

    def get_id(self) -> NamespaceIdDto:
        """Gets id of the root namespace history.
        Returns:
            Id of the root namespace history.
        """
        return self.id

    def get_owner_address(self) -> AddressDto:
        """Gets namespace owner address.
        Returns:
            Namespace owner address.
        """
        return self.ownerAddress

    def get_lifetime(self) -> NamespaceLifetimeBuilder:
        """Gets lifetime in blocks.
        Returns:
            Lifetime in blocks.
        """
        return self.lifetime

    def get_root_alias(self) -> NamespaceAliasBuilder:
        """Gets root namespace alias.
        Returns:
            Root namespace alias.
        """
        return self.rootAlias

    def get_paths(self) -> List[NamespacePathBuilder]:
        """Gets save child sub-namespace paths.
        Returns:
            Save child sub-namespace paths.
        """
        return self.paths

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.id.get_size()
        size += self.ownerAddress.get_size()
        size += self.lifetime.get_size()
        size += self.rootAlias.get_size()
        size += 8  # childrenCount
        for _ in self.paths:
            size += _.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.id.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.ownerAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.lifetime.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.rootAlias.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_paths()), 8))  # kind:SIZE_FIELD
        for _ in self.paths: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        return bytes_
    # end of class

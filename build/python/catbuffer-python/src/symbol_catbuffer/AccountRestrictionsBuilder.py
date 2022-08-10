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
from .AccountRestrictionsInfoBuilder import AccountRestrictionsInfoBuilder
from .AddressDto import AddressDto
from .StateHeaderBuilder import StateHeaderBuilder

class AccountRestrictionsBuilder(StateHeaderBuilder):
    """Binary layout for account restrictions.

    Attributes:
        address: Address on which restrictions are placed.
        restrictions: Account restrictions.
    """

    def __init__(self, version: int, address: AddressDto, restrictions: List[AccountRestrictionsInfoBuilder]):
        """Constructor.
        Args:
            version: Serialization version.
            address: Address on which restrictions are placed.
            restrictions: Account restrictions.
        """
        super().__init__(version)
        self.address = address
        self.restrictions = restrictions


    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountRestrictionsBuilder:
        """Creates an instance of AccountRestrictionsBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountRestrictionsBuilder.
        """
        bytes_ = bytes(payload)
        superObject = StateHeaderBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        address = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[address.get_size():]
        restrictionsCount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIZE_FIELD
        bytes_ = bytes_[8:]
        restrictions: List[AccountRestrictionsInfoBuilder] = []  # kind:ARRAY
        for _ in range(restrictionsCount):
            item = AccountRestrictionsInfoBuilder.load_from_binary(bytes_)
            restrictions.append(item)
            bytes_ = bytes_[item.get_size():]
        return AccountRestrictionsBuilder(superObject.version, address, restrictions)

    def get_address(self) -> AddressDto:
        """Gets address on which restrictions are placed.
        Returns:
            Address on which restrictions are placed.
        """
        return self.address

    def get_restrictions(self) -> List[AccountRestrictionsInfoBuilder]:
        """Gets account restrictions.
        Returns:
            Account restrictions.
        """
        return self.restrictions

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.address.get_size()
        size += 8  # restrictionsCount
        for _ in self.restrictions:
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
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_restrictions()), 8))  # kind:SIZE_FIELD
        for _ in self.restrictions: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        return bytes_
    # end of class

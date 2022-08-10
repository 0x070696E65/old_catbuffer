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
from .MosaicRestrictionKeyDto import MosaicRestrictionKeyDto
from .RestrictionRuleBuilder import RestrictionRuleBuilder

class GlobalKeyValueBuilder:
    """Binary layout for a global key-value.

    Attributes:
        key: Key associated with a restriction rule.
        restrictionRule: Restriction rule (the value) associated with a key.
    """

    def __init__(self, key: MosaicRestrictionKeyDto, restrictionRule: RestrictionRuleBuilder):
        """Constructor.
        Args:
            key: Key associated with a restriction rule.
            restrictionRule: Restriction rule (the value) associated with a key.
        """
        self.key = key
        self.restrictionRule = restrictionRule


    @classmethod
    def load_from_binary(cls, payload: bytes) -> GlobalKeyValueBuilder:
        """Creates an instance of GlobalKeyValueBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of GlobalKeyValueBuilder.
        """
        bytes_ = bytes(payload)

        key = MosaicRestrictionKeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[key.get_size():]
        restrictionRule = RestrictionRuleBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[restrictionRule.get_size():]
        return GlobalKeyValueBuilder(key, restrictionRule)

    def get_key(self) -> MosaicRestrictionKeyDto:
        """Gets key associated with a restriction rule.
        Returns:
            Key associated with a restriction rule.
        """
        return self.key

    def get_restriction_rule(self) -> RestrictionRuleBuilder:
        """Gets restriction rule (the value) associated with a key.
        Returns:
            Restriction rule (the value) associated with a key.
        """
        return self.restrictionRule

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.key.get_size()
        size += self.restrictionRule.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.key.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.restrictionRule.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

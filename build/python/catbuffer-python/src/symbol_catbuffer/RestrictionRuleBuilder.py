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
from .MosaicIdDto import MosaicIdDto
from .MosaicRestrictionTypeDto import MosaicRestrictionTypeDto

class RestrictionRuleBuilder:
    """Binary layout of restriction rule being applied.

    Attributes:
        referenceMosaicId: Identifier of the mosaic providing the restriction key.
        restrictionValue: Restriction value.
        restrictionType: Restriction type.
    """

    def __init__(self, referenceMosaicId: MosaicIdDto, restrictionValue: int, restrictionType: MosaicRestrictionTypeDto):
        """Constructor.
        Args:
            referenceMosaicId: Identifier of the mosaic providing the restriction key.
            restrictionValue: Restriction value.
            restrictionType: Restriction type.
        """
        self.referenceMosaicId = referenceMosaicId
        self.restrictionValue = restrictionValue
        self.restrictionType = restrictionType


    @classmethod
    def load_from_binary(cls, payload: bytes) -> RestrictionRuleBuilder:
        """Creates an instance of RestrictionRuleBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of RestrictionRuleBuilder.
        """
        bytes_ = bytes(payload)

        referenceMosaicId = MosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[referenceMosaicId.get_size():]
        restrictionValue = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        restrictionType = MosaicRestrictionTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[restrictionType.get_size():]
        return RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType)

    def get_reference_mosaic_id(self) -> MosaicIdDto:
        """Gets identifier of the mosaic providing the restriction key.
        Returns:
            Identifier of the mosaic providing the restriction key.
        """
        return self.referenceMosaicId

    def get_restriction_value(self) -> int:
        """Gets restriction value.
        Returns:
            Restriction value.
        """
        return self.restrictionValue

    def get_restriction_type(self) -> MosaicRestrictionTypeDto:
        """Gets restriction type.
        Returns:
            Restriction type.
        """
        return self.restrictionType

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.referenceMosaicId.get_size()
        size += 8  # restrictionValue
        size += self.restrictionType.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.referenceMosaicId.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_restriction_value(), 8))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.restrictionType.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

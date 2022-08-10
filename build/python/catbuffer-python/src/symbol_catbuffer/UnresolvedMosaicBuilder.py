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
from .UnresolvedMosaicIdDto import UnresolvedMosaicIdDto

class UnresolvedMosaicBuilder:
    """Binary layout for an unresolved mosaic.

    Attributes:
        mosaicId: Mosaic identifier.
        amount: Mosaic amount.
    """

    def __init__(self, mosaicId: UnresolvedMosaicIdDto, amount: AmountDto):
        """Constructor.
        Args:
            mosaicId: Mosaic identifier.
            amount: Mosaic amount.
        """
        self.mosaicId = mosaicId
        self.amount = amount

    @staticmethod
    def from_tuple(t):
        return UnresolvedMosaicBuilder(UnresolvedMosaicIdDto(t[0]), AmountDto(t[1]))

    def as_tuple(self):
        return (self.mosaicId.unresolvedMosaicId, self.amount.amount)

    @classmethod
    def load_from_binary(cls, payload: bytes) -> UnresolvedMosaicBuilder:
        """Creates an instance of UnresolvedMosaicBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of UnresolvedMosaicBuilder.
        """
        bytes_ = bytes(payload)

        mosaicId = UnresolvedMosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[mosaicId.get_size():]
        amount = AmountDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[amount.get_size():]
        return UnresolvedMosaicBuilder(mosaicId, amount)

    def get_mosaic_id(self) -> UnresolvedMosaicIdDto:
        """Gets mosaic identifier.
        Returns:
            Mosaic identifier.
        """
        return self.mosaicId

    def get_amount(self) -> AmountDto:
        """Gets mosaic amount.
        Returns:
            Mosaic amount.
        """
        return self.amount

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.mosaicId.get_size()
        size += self.amount.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaicId.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.amount.serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        return '(0x{:x}, {})'.format(self.mosaicId.unresolvedMosaicId, self.amount.amount)
    # end of class

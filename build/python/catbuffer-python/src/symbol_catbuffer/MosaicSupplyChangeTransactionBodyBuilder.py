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

# pylint: disable=unused-import

from binascii import hexlify
import re
from .GeneratorUtils import GeneratorUtils
from .AmountDto import AmountDto
from .MosaicSupplyChangeActionDto import MosaicSupplyChangeActionDto
from .UnresolvedMosaicIdDto import UnresolvedMosaicIdDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class MosaicSupplyChangeTransactionBodyBuilder:
    """Binary layout for a mosaic supply change transaction.

    Attributes:
        mosaic_id: Affected mosaic identifier.
        delta: Change amount.
        action: Supply change action.
    """
    def __init__(self):
        """ Constructor."""
        self.mosaic_id = UnresolvedMosaicIdDto().unresolvedMosaicId
        self.delta = AmountDto().amount
        self.action = MosaicSupplyChangeActionDto(0).value

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicSupplyChangeTransactionBodyBuilder:
        """Creates an instance of MosaicSupplyChangeTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicSupplyChangeTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        mosaic_id_ = UnresolvedMosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        mosaic_id = mosaic_id_.unresolvedMosaicId
        bytes_ = bytes_[mosaic_id_.get_size():]
        delta_ = AmountDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        delta = delta_.amount
        bytes_ = bytes_[delta_.get_size():]
        action_ = MosaicSupplyChangeActionDto.load_from_binary(bytes_)  # kind:CUSTOM2
        action = action_.value
        bytes_ = bytes_[action_.get_size():]

        # create object and call
        result = MosaicSupplyChangeTransactionBodyBuilder()
        result.mosaic_id = mosaic_id
        result.delta = delta
        result.action = action
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += UnresolvedMosaicIdDto(self.mosaic_id).get_size()
        size += AmountDto(self.delta).get_size()
        size += MosaicSupplyChangeActionDto(self.action).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedMosaicIdDto(self.mosaic_id).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, AmountDto(self.delta).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, MosaicSupplyChangeActionDto(self.action).serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('mosaic_id', to_hex_string(UnresolvedMosaicIdDto(self.mosaic_id).serialize()))
        result += '{:24s} : {}\n'.format('delta', to_hex_string(AmountDto(self.delta).serialize()))
        result += '{:24s} : {}\n'.format('action', to_hex_string(MosaicSupplyChangeActionDto(self.action).serialize()))
        return result

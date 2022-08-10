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
from .UnresolvedAddressDto import UnresolvedAddressDto
from .UnresolvedMosaicIdDto import UnresolvedMosaicIdDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class MosaicAddressRestrictionTransactionBodyBuilder:
    """Binary layout for a mosaic address restriction transaction.

    Attributes:
        mosaic_id: Identifier of the mosaic to which the restriction applies.
        restriction_key: Restriction key.
        previous_restriction_value: Previous restriction value.
        new_restriction_value: New restriction value.
        target_address: Address being restricted.
    """
    def __init__(self):
        """ Constructor."""
        self.mosaic_id = UnresolvedMosaicIdDto().unresolvedMosaicId
        self.restriction_key = int()
        self.previous_restriction_value = int()
        self.new_restriction_value = int()
        self.target_address = bytes(24)

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicAddressRestrictionTransactionBodyBuilder:
        """Creates an instance of MosaicAddressRestrictionTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicAddressRestrictionTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        mosaic_id_ = UnresolvedMosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        mosaic_id = mosaic_id_.unresolvedMosaicId
        bytes_ = bytes_[mosaic_id_.get_size():]
        restriction_key = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        previous_restriction_value = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        new_restriction_value = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        target_address_ = UnresolvedAddressDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        target_address = target_address_.unresolvedAddress
        bytes_ = bytes_[target_address_.get_size():]

        # create object and call
        result = MosaicAddressRestrictionTransactionBodyBuilder()
        result.mosaic_id = mosaic_id
        result.restriction_key = restriction_key
        result.previous_restriction_value = previous_restriction_value
        result.new_restriction_value = new_restriction_value
        result.target_address = target_address
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += UnresolvedMosaicIdDto(self.mosaic_id).get_size()
        size += 8  # restriction_key
        size += 8  # previous_restriction_value
        size += 8  # new_restriction_value
        size += UnresolvedAddressDto(self.target_address).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedMosaicIdDto(self.mosaic_id).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.restriction_key, 8))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.previous_restriction_value, 8))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.new_restriction_value, 8))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedAddressDto(self.target_address).serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('mosaic_id', to_hex_string(UnresolvedMosaicIdDto(self.mosaic_id).serialize()))
        result += '{:24s} : {}\n'.format('restriction_key', to_hex_string(GeneratorUtils.uint_to_buffer(self.restriction_key, 8)))
        result += '{:24s} : {}\n'.format('previous_restriction_value', to_hex_string(GeneratorUtils.uint_to_buffer(self.previous_restriction_value, 8)))
        result += '{:24s} : {}\n'.format('new_restriction_value', to_hex_string(GeneratorUtils.uint_to_buffer(self.new_restriction_value, 8)))
        result += '{:24s} : {}\n'.format('target_address', to_hex_string(UnresolvedAddressDto(self.target_address).serialize()))
        return result

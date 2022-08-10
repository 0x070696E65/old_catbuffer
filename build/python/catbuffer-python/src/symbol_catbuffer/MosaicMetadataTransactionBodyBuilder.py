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

class MosaicMetadataTransactionBodyBuilder:
    """Binary layout for a mosaic metadata transaction.

    Attributes:
        target_address: Metadata target address.
        scoped_metadata_key: Metadata key scoped to source, target and type.
        target_mosaic_id: Target mosaic identifier.
        value_size_delta: Change in value size in bytes.
        value: Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
    """
    def __init__(self):
        """ Constructor."""
        self.target_address = bytes(24)
        self.scoped_metadata_key = int()
        self.target_mosaic_id = UnresolvedMosaicIdDto().unresolvedMosaicId
        self.value_size_delta = int()
        self.value = bytes()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicMetadataTransactionBodyBuilder:
        """Creates an instance of MosaicMetadataTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicMetadataTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        target_address_ = UnresolvedAddressDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        target_address = target_address_.unresolvedAddress
        bytes_ = bytes_[target_address_.get_size():]
        scoped_metadata_key = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        target_mosaic_id_ = UnresolvedMosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        target_mosaic_id = target_mosaic_id_.unresolvedMosaicId
        bytes_ = bytes_[target_mosaic_id_.get_size():]
        value_size_delta = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIMPLE
        bytes_ = bytes_[2:]
        value_size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIZE_FIELD
        bytes_ = bytes_[2:]
        value = GeneratorUtils.get_bytes(bytes_, value_size)  # kind:BUFFER
        bytes_ = bytes_[value_size:]

        # create object and call
        result = MosaicMetadataTransactionBodyBuilder()
        result.target_address = target_address
        result.scoped_metadata_key = scoped_metadata_key
        result.target_mosaic_id = target_mosaic_id
        result.value_size_delta = value_size_delta
        result.value = value
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += UnresolvedAddressDto(self.target_address).get_size()
        size += 8  # scoped_metadata_key
        size += UnresolvedMosaicIdDto(self.target_mosaic_id).get_size()
        size += 2  # value_size_delta
        size += 2  # value_size
        size += len(self.value)
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedAddressDto(self.target_address).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.scoped_metadata_key, 8))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedMosaicIdDto(self.target_mosaic_id).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.value_size_delta, 2))  # serial_kind:SIMPLE
        size_value = len(self.value)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 2))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.value)  # kind:BUFFER
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('target_address', to_hex_string(UnresolvedAddressDto(self.target_address).serialize()))
        result += '{:24s} : {}\n'.format('scoped_metadata_key', to_hex_string(GeneratorUtils.uint_to_buffer(self.scoped_metadata_key, 8)))
        result += '{:24s} : {}\n'.format('target_mosaic_id', to_hex_string(UnresolvedMosaicIdDto(self.target_mosaic_id).serialize()))
        result += '{:24s} : {}\n'.format('value_size_delta', to_hex_string(GeneratorUtils.uint_to_buffer(self.value_size_delta, 2)))
        size_value = len(self.value)
        result += '{:24s} : {}\n'.format('value_size', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 2)))
        result += '{:24s} : {}\n'.format('value', to_hex_string(self.value))
        return result

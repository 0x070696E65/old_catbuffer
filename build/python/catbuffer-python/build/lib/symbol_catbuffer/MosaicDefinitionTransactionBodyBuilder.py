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
from typing import List
import re
from .GeneratorUtils import GeneratorUtils
from .BlockDurationDto import BlockDurationDto
from .MosaicFlagsDto import MosaicFlagsDto
from .MosaicIdDto import MosaicIdDto
from .MosaicNonceDto import MosaicNonceDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class MosaicDefinitionTransactionBodyBuilder:
    """Binary layout for a mosaic definition transaction.

    Attributes:
        id: Mosaic identifier.
        duration: Mosaic duration.
        nonce: Mosaic nonce.
        flags: Mosaic flags.
        divisibility: Mosaic divisibility.
    """
    def __init__(self):
        """ Constructor."""
        self.id = MosaicIdDto().mosaicId
        self.duration = BlockDurationDto().blockDuration
        self.nonce = MosaicNonceDto().mosaicNonce
        self.flags = []
        self.divisibility = int()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicDefinitionTransactionBodyBuilder:
        """Creates an instance of MosaicDefinitionTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicDefinitionTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        id_ = MosaicIdDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        id = id_.mosaicId
        bytes_ = bytes_[id_.get_size():]
        duration_ = BlockDurationDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        duration = duration_.blockDuration
        bytes_ = bytes_[duration_.get_size():]
        nonce_ = MosaicNonceDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        nonce = nonce_.mosaicNonce
        bytes_ = bytes_[nonce_.get_size():]
        flags = MosaicFlagsDto.bytesToFlags(bytes_, 1)  # kind:FLAGS
        bytes_ = bytes_[1:]
        divisibility = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]

        # create object and call
        result = MosaicDefinitionTransactionBodyBuilder()
        result.id = id
        result.duration = duration
        result.nonce = nonce
        result.flags = flags
        result.divisibility = divisibility
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += MosaicIdDto(self.id).get_size()
        size += BlockDurationDto(self.duration).get_size()
        size += MosaicNonceDto(self.nonce).get_size()
        size += 1  # flags
        size += 1  # divisibility
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, MosaicIdDto(self.id).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, BlockDurationDto(self.duration).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, MosaicNonceDto(self.nonce).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(MosaicFlagsDto.flagsToInt(self.flags), 1))  # kind:FLAGS
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.divisibility, 1))  # serial_kind:SIMPLE
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('id', to_hex_string(MosaicIdDto(self.id).serialize()))
        result += '{:24s} : {}\n'.format('duration', to_hex_string(BlockDurationDto(self.duration).serialize()))
        result += '{:24s} : {}\n'.format('nonce', to_hex_string(MosaicNonceDto(self.nonce).serialize()))
        _serializedFlags = GeneratorUtils.uint_to_buffer(MosaicFlagsDto.flagsToInt(self.flags), 1)
        result += '{:24s} : {} {}\n'.format('flags', to_hex_string(_serializedFlags), self.flags)
        result += '{:24s} : {}\n'.format('divisibility', to_hex_string(GeneratorUtils.uint_to_buffer(self.divisibility, 1)))
        return result

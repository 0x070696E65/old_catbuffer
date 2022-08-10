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
from .EntityTypeDto import EntityTypeDto
from .KeyDto import KeyDto
from .NetworkTypeDto import NetworkTypeDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class EmbeddedTransactionBuilder:
    """Binary layout for an embedded transaction.

    Attributes:
        signer_public_key: Entity signer's public key.
        version: Entity version.
        network: Entity network.
        type: Entity type.
    """
    type_hints = {
        'signer_public_key' : 'KeyDto',
        'network' : 'enum:NetworkTypeDto',
        'type' : 'enum:EntityTypeDto',
    }

    def __init__(self, signer_public_key, version, network: NetworkTypeDto, type):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            version: Entity version.
            network: Entity network.
            type: Entity type.

        """
        self.signer_public_key = signer_public_key
        self.version = version
        self.network = network
        self.type = type


    @classmethod
    def load_from_binary(cls, payload: bytes) -> EmbeddedTransactionBuilder:
        """Creates an instance of EmbeddedTransactionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of EmbeddedTransactionBuilder.
        """
        bytes_ = bytes(payload)

        size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        embedded_transaction_header__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        signer_public_key_ = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        signer_public_key = signer_public_key_.key
        bytes_ = bytes_[signer_public_key_.get_size():]
        entity_body__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        version = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 1))  # kind:SIMPLE
        bytes_ = bytes_[1:]
        network_ = NetworkTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        network = network_.value
        bytes_ = bytes_[network_.get_size():]
        type_ = EntityTypeDto.load_from_binary(bytes_)  # kind:CUSTOM2
        type = type_.value
        bytes_ = bytes_[type_.get_size():]

        # create object and call
        result = EmbeddedTransactionBuilder(signer_public_key, version, network, type)
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 4  # size
        size += 4  # embedded_transaction_header__reserved1
        size += KeyDto(self.signer_public_key).get_size()
        size += 4  # entity_body__reserved1
        size += 1  # version
        size += NetworkTypeDto(self.network).get_size()
        size += EntityTypeDto(self.type).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_size(), 4))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, KeyDto(self.signer_public_key).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.version, 1))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, NetworkTypeDto(self.network).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, EntityTypeDto(self.type).serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('size', to_hex_string(GeneratorUtils.uint_to_buffer(self.get_size(), 4)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : {}\n'.format('signer_public_key', to_hex_string(KeyDto(self.signer_public_key).serialize()))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : {}\n'.format('version', to_hex_string(GeneratorUtils.uint_to_buffer(self.version, 1)))
        result += '{:24s} : {}\n'.format('network', to_hex_string(NetworkTypeDto(self.network).serialize()))
        result += '{:24s} : {}\n'.format('type', to_hex_string(EntityTypeDto(self.type).serialize()))
        return result

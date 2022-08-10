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
from .EntityTypeDto import EntityTypeDto
from .KeyDto import KeyDto
from .NetworkTypeDto import NetworkTypeDto
from .SignatureDto import SignatureDto
from .TimestampDto import TimestampDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class TransactionBuilder:
    """Binary layout for a transaction.

    Attributes:
        signature: Entity signature.
        signer_public_key: Entity signer's public key.
        version: Entity version.
        network: Entity network.
        type: Entity type.
        fee: Transaction fee.
        deadline: Transaction deadline.
    """
    type_hints = {
        'signature' : 'SignatureDto',
        'signer_public_key' : 'KeyDto',
        'network' : 'enum:NetworkTypeDto',
        'type' : 'enum:EntityTypeDto',
        'fee' : 'AmountDto',
        'deadline' : 'TimestampDto',
    }

    def __init__(self, signer_public_key, version, network, type):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            version: Entity version.
            network: Entity network.
            type: Entity type.
        """
        self.signature = bytes(64)
        self.signer_public_key = signer_public_key
        self.version = version
        self.network = network
        self.type = type

        self.fee = 0
        self.deadline = 0


    @classmethod
    def load_from_binary(cls, payload: bytes) -> TransactionBuilder:
        """Creates an instance of TransactionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of TransactionBuilder.
        """
        bytes_ = bytes(payload)

        size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        verifiable_entity_header__reserved1 = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 4))  # kind:SIMPLE
        bytes_ = bytes_[4:]
        signature_ = SignatureDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        signature = signature_.signature
        bytes_ = bytes_[signature_.get_size():]
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
        fee_ = AmountDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        fee = fee_.amount
        bytes_ = bytes_[fee_.get_size():]
        deadline_ = TimestampDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        deadline = deadline_.timestamp
        bytes_ = bytes_[deadline_.get_size():]

        # create object and call
        result = TransactionBuilder(signer_public_key, version, network, type)
        result.signature = signature
        result.fee = fee
        result.deadline = deadline
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 4  # size
        size += 4  # verifiable_entity_header__reserved1
        size += SignatureDto(self.signature).get_size()
        size += KeyDto(self.signer_public_key).get_size()
        size += 4  # entity_body__reserved1
        size += 1  # version
        size += NetworkTypeDto(self.network).get_size()
        size += EntityTypeDto(self.type).get_size()
        size += AmountDto(self.fee).get_size()
        size += TimestampDto(self.deadline).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_size(), 4))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, SignatureDto(self.signature).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, KeyDto(self.signer_public_key).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, 4))
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.version, 1))  # serial_kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, NetworkTypeDto(self.network).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, EntityTypeDto(self.type).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, AmountDto(self.fee).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, TimestampDto(self.deadline).serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('size', to_hex_string(GeneratorUtils.uint_to_buffer(self.get_size(), 4)))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : {}\n'.format('signature', to_hex_string(SignatureDto(self.signature).serialize()))
        result += '{:24s} : {}\n'.format('signer_public_key', to_hex_string(KeyDto(self.signer_public_key).serialize()))
        result += '{:24s} : {}\n'.format('<reserved>', to_hex_string(GeneratorUtils.uint_to_buffer(0, 4)))
        result += '{:24s} : {}\n'.format('version', to_hex_string(GeneratorUtils.uint_to_buffer(self.version, 1)))
        result += '{:24s} : {}\n'.format('network', to_hex_string(NetworkTypeDto(self.network).serialize()))
        result += '{:24s} : {}\n'.format('type', to_hex_string(EntityTypeDto(self.type).serialize()))
        result += '{:24s} : {}\n'.format('fee', to_hex_string(AmountDto(self.fee).serialize()))
        result += '{:24s} : {}\n'.format('deadline', to_hex_string(TimestampDto(self.deadline).serialize()))
        return result

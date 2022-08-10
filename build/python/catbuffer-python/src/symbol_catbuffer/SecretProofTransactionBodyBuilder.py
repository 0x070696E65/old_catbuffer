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
from .Hash256Dto import Hash256Dto
from .LockHashAlgorithmDto import LockHashAlgorithmDto
from .UnresolvedAddressDto import UnresolvedAddressDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class SecretProofTransactionBodyBuilder:
    """Binary layout for a secret proof transaction.

    Attributes:
        recipient_address: Locked mosaic recipient address.
        secret: Secret.
        hash_algorithm: Hash algorithm.
        proof: Proof data.
    """
    def __init__(self):
        """ Constructor."""
        self.recipient_address = bytes(24)
        self.secret = bytes(32)
        self.hash_algorithm = LockHashAlgorithmDto(0).value
        self.proof = bytes()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> SecretProofTransactionBodyBuilder:
        """Creates an instance of SecretProofTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of SecretProofTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        recipient_address_ = UnresolvedAddressDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        recipient_address = recipient_address_.unresolvedAddress
        bytes_ = bytes_[recipient_address_.get_size():]
        secret_ = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        secret = secret_.hash256
        bytes_ = bytes_[secret_.get_size():]
        proof_size = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 2))  # kind:SIZE_FIELD
        bytes_ = bytes_[2:]
        hash_algorithm_ = LockHashAlgorithmDto.load_from_binary(bytes_)  # kind:CUSTOM2
        hash_algorithm = hash_algorithm_.value
        bytes_ = bytes_[hash_algorithm_.get_size():]
        proof = GeneratorUtils.get_bytes(bytes_, proof_size)  # kind:BUFFER
        bytes_ = bytes_[proof_size:]

        # create object and call
        result = SecretProofTransactionBodyBuilder()
        result.recipient_address = recipient_address
        result.secret = secret
        result.hash_algorithm = hash_algorithm
        result.proof = proof
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += UnresolvedAddressDto(self.recipient_address).get_size()
        size += Hash256Dto(self.secret).get_size()
        size += 2  # proof_size
        size += LockHashAlgorithmDto(self.hash_algorithm).get_size()
        size += len(self.proof)
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, UnresolvedAddressDto(self.recipient_address).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, Hash256Dto(self.secret).serialize())  # kind:CUSTOM
        size_value = len(self.proof)
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, 2))  # kind:SIZE_FIELD
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, LockHashAlgorithmDto(self.hash_algorithm).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.proof)  # kind:BUFFER
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('recipient_address', to_hex_string(UnresolvedAddressDto(self.recipient_address).serialize()))
        result += '{:24s} : {}\n'.format('secret', to_hex_string(Hash256Dto(self.secret).serialize()))
        size_value = len(self.proof)
        result += '{:24s} : {}\n'.format('proof_size', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, 2)))
        result += '{:24s} : {}\n'.format('hash_algorithm', to_hex_string(LockHashAlgorithmDto(self.hash_algorithm).serialize()))
        result += '{:24s} : {}\n'.format('proof', to_hex_string(self.proof))
        return result

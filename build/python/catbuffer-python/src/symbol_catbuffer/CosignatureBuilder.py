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
from binascii import hexlify
from .GeneratorUtils import GeneratorUtils
from .KeyDto import KeyDto
from .SignatureDto import SignatureDto

class CosignatureBuilder:
    """Cosignature attached to an aggregate transaction.

    Attributes:
        version: Version.
        signerPublicKey: Cosigner public key.
        signature: Cosigner signature.
    """

    def __init__(self, version: int, signerPublicKey: KeyDto, signature: SignatureDto):
        """Constructor.
        Args:
            version: Version.
            signerPublicKey: Cosigner public key.
            signature: Cosigner signature.
        """
        self.version = version
        self.signerPublicKey = signerPublicKey
        self.signature = signature

    @staticmethod
    def from_tuple(t):
        return CosignatureBuilder(t[0], KeyDto(t[1]), SignatureDto(t[2]))

    def as_tuple(self):
        return (self.version, self.signerPublicKey.key, self.signature.signature)

    @classmethod
    def load_from_binary(cls, payload: bytes) -> CosignatureBuilder:
        """Creates an instance of CosignatureBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of CosignatureBuilder.
        """
        bytes_ = bytes(payload)

        version = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))  # kind:SIMPLE
        bytes_ = bytes_[8:]
        signerPublicKey = KeyDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[signerPublicKey.get_size():]
        signature = SignatureDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[signature.get_size():]
        return CosignatureBuilder(version, signerPublicKey, signature)

    def get_version(self) -> int:
        """Gets version.
        Returns:
            Version.
        """
        return self.version

    def get_signer_public_key(self) -> KeyDto:
        """Gets cosigner public key.
        Returns:
            Cosigner public key.
        """
        return self.signerPublicKey

    def get_signature(self) -> SignatureDto:
        """Gets cosigner signature.
        Returns:
            Cosigner signature.
        """
        return self.signature

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 8  # version
        size += self.signerPublicKey.get_size()
        size += self.signature.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_version(), 8))  # kind:SIMPLE
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.signerPublicKey.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.signature.serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = '('
        result += '{}, '.format(self.version)
        result += '{}, '.format(hexlify(self.signerPublicKey.key).decode('utf-8'))
        result += '{}'.format(hexlify(self.signature.signature).decode('utf-8'))
        result += ')'
        return result
    # end of class

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
from .CosignatureBuilder import CosignatureBuilder
from .Hash256Dto import Hash256Dto
from .KeyDto import KeyDto
from .SignatureDto import SignatureDto

class DetachedCosignatureBuilder(CosignatureBuilder):
    """Cosignature detached from an aggregate transaction.

    Attributes:
        parentHash: Hash of the aggregate transaction that is signed by this cosignature.
    """

    def __init__(self, version: int, signerPublicKey: KeyDto, signature: SignatureDto, parentHash: Hash256Dto):
        """Constructor.
        Args:
            version: Version.
            signerPublicKey: Cosigner public key.
            signature: Cosigner signature.
            parentHash: Hash of the aggregate transaction that is signed by this cosignature.
        """
        super().__init__(version, signerPublicKey, signature)
        self.parentHash = parentHash


    @classmethod
    def load_from_binary(cls, payload: bytes) -> DetachedCosignatureBuilder:
        """Creates an instance of DetachedCosignatureBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of DetachedCosignatureBuilder.
        """
        bytes_ = bytes(payload)
        superObject = CosignatureBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        parentHash = Hash256Dto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[parentHash.get_size():]
        return DetachedCosignatureBuilder(superObject.version, superObject.signerPublicKey, superObject.signature, parentHash)

    def get_parent_hash(self) -> Hash256Dto:
        """Gets hash of the aggregate transaction that is signed by this cosignature.
        Returns:
            Hash of the aggregate transaction that is signed by this cosignature.
        """
        return self.parentHash

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.parentHash.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.parentHash.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

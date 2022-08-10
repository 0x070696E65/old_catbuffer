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

class ProofScalarDto:
    """Proof scalar.

    Attributes:
        proofScalar: Proof scalar.
    """
    def __init__(self, proofScalar: bytes = bytes(32)):
        """Constructor.

        Args:
            proofScalar: Proof scalar.
        """
        assert len(proofScalar) == 32, 'required argument bytes({})'.format(32)
        self.proofScalar = proofScalar

    @classmethod
    def load_from_binary(cls, payload: bytes) -> ProofScalarDto:
        """Creates an instance of ProofScalarDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ProofScalarDto.
        """
        bytes_ = bytes(payload)
        proofScalar = GeneratorUtils.get_bytes(bytes_, 32)
        return ProofScalarDto(proofScalar)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 32

    def get_proof_scalar(self) -> bytes:
        """Gets Proof scalar.

        Returns:
            Proof scalar.
        """
        return self.proofScalar

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.proofScalar)
        return bytes_

    def __str__(self):
        result = hexlify(self.proofScalar).decode('utf-8') # ProofScalar
        return result

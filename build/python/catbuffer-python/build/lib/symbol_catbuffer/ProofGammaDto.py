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

class ProofGammaDto:
    """Proof gamma.

    Attributes:
        proofGamma: Proof gamma.
    """
    def __init__(self, proofGamma: bytes = bytes(32)):
        """Constructor.

        Args:
            proofGamma: Proof gamma.
        """
        assert len(proofGamma) == 32, 'required argument bytes({})'.format(32)
        self.proofGamma = proofGamma

    @classmethod
    def load_from_binary(cls, payload: bytes) -> ProofGammaDto:
        """Creates an instance of ProofGammaDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ProofGammaDto.
        """
        bytes_ = bytes(payload)
        proofGamma = GeneratorUtils.get_bytes(bytes_, 32)
        return ProofGammaDto(proofGamma)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 32

    def get_proof_gamma(self) -> bytes:
        """Gets Proof gamma.

        Returns:
            Proof gamma.
        """
        return self.proofGamma

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.proofGamma)
        return bytes_

    def __str__(self):
        result = hexlify(self.proofGamma).decode('utf-8') # ProofGamma
        return result

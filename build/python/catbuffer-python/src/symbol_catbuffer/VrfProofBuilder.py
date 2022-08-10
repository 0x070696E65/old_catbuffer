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
from .ProofGammaDto import ProofGammaDto
from .ProofScalarDto import ProofScalarDto
from .ProofVerificationHashDto import ProofVerificationHashDto

class VrfProofBuilder:
    """Verfiable random function proof.

    Attributes:
        gamma: Gamma.
        verificationHash: Verification hash.
        scalar: Scalar.
    """

    def __init__(self, gamma: ProofGammaDto, verificationHash: ProofVerificationHashDto, scalar: ProofScalarDto):
        """Constructor.
        Args:
            gamma: Gamma.
            verificationHash: Verification hash.
            scalar: Scalar.
        """
        self.gamma = gamma
        self.verificationHash = verificationHash
        self.scalar = scalar


    @classmethod
    def load_from_binary(cls, payload: bytes) -> VrfProofBuilder:
        """Creates an instance of VrfProofBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of VrfProofBuilder.
        """
        bytes_ = bytes(payload)

        gamma = ProofGammaDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[gamma.get_size():]
        verificationHash = ProofVerificationHashDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[verificationHash.get_size():]
        scalar = ProofScalarDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[scalar.get_size():]
        return VrfProofBuilder(gamma, verificationHash, scalar)

    def get_gamma(self) -> ProofGammaDto:
        """Gets gamma.
        Returns:
            Gamma.
        """
        return self.gamma

    def get_verification_hash(self) -> ProofVerificationHashDto:
        """Gets verification hash.
        Returns:
            Verification hash.
        """
        return self.verificationHash

    def get_scalar(self) -> ProofScalarDto:
        """Gets scalar.
        Returns:
            Scalar.
        """
        return self.scalar

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += self.gamma.get_size()
        size += self.verificationHash.get_size()
        size += self.scalar.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.gamma.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.verificationHash.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.scalar.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

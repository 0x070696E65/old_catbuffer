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

class Hash256Dto:
    """Hash256.

    Attributes:
        hash256: Hash256.
    """
    def __init__(self, hash256: bytes = bytes(32)):
        """Constructor.

        Args:
            hash256: Hash256.
        """
        assert len(hash256) == 32, 'required argument bytes({})'.format(32)
        self.hash256 = hash256

    @classmethod
    def load_from_binary(cls, payload: bytes) -> Hash256Dto:
        """Creates an instance of Hash256Dto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of Hash256Dto.
        """
        bytes_ = bytes(payload)
        hash256 = GeneratorUtils.get_bytes(bytes_, 32)
        return Hash256Dto(hash256)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 32

    def get_hash256(self) -> bytes:
        """Gets Hash256.

        Returns:
            Hash256.
        """
        return self.hash256

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.hash256)
        return bytes_

    def __str__(self):
        result = hexlify(self.hash256).decode('utf-8') # Hash256
        return result

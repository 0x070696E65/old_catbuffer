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

class Hash512Dto:
    """Hash512.

    Attributes:
        hash512: Hash512.
    """
    def __init__(self, hash512: bytes = bytes(64)):
        """Constructor.

        Args:
            hash512: Hash512.
        """
        assert len(hash512) == 64, 'required argument bytes({})'.format(64)
        self.hash512 = hash512

    @classmethod
    def load_from_binary(cls, payload: bytes) -> Hash512Dto:
        """Creates an instance of Hash512Dto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of Hash512Dto.
        """
        bytes_ = bytes(payload)
        hash512 = GeneratorUtils.get_bytes(bytes_, 64)
        return Hash512Dto(hash512)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 64

    def get_hash512(self) -> bytes:
        """Gets Hash512.

        Returns:
            Hash512.
        """
        return self.hash512

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.hash512)
        return bytes_

    def __str__(self):
        result = hexlify(self.hash512).decode('utf-8') # Hash512
        return result

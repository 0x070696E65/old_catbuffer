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
from base64 import b32encode
from .GeneratorUtils import GeneratorUtils

class UnresolvedAddressDto:
    """Unresolved address.

    Attributes:
        unresolvedAddress: Unresolved address.
    """
    def __init__(self, unresolvedAddress: bytes = bytes(24)):
        """Constructor.

        Args:
            unresolvedAddress: Unresolved address.
        """
        assert len(unresolvedAddress) == 24, 'required argument bytes({})'.format(24)
        self.unresolvedAddress = unresolvedAddress

    @classmethod
    def load_from_binary(cls, payload: bytes) -> UnresolvedAddressDto:
        """Creates an instance of UnresolvedAddressDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of UnresolvedAddressDto.
        """
        bytes_ = bytes(payload)
        unresolvedAddress = GeneratorUtils.get_bytes(bytes_, 24)
        return UnresolvedAddressDto(unresolvedAddress)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 24

    def get_unresolved_address(self) -> bytes:
        """Gets Unresolved address.

        Returns:
            Unresolved address.
        """
        return self.unresolvedAddress

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.unresolvedAddress)
        return bytes_

    def __str__(self):
        result = '{} ({})'.format(hexlify(self.unresolvedAddress).decode('utf-8'), b32encode(self.unresolvedAddress).decode('utf-8')[:-1])
        return result

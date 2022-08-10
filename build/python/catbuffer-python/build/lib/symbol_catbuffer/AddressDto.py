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

class AddressDto:
    """Address.

    Attributes:
        address: Address.
    """
    def __init__(self, address: bytes = bytes(24)):
        """Constructor.

        Args:
            address: Address.
        """
        assert len(address) == 24, 'required argument bytes({})'.format(24)
        self.address = address

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AddressDto:
        """Creates an instance of AddressDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AddressDto.
        """
        bytes_ = bytes(payload)
        address = GeneratorUtils.get_bytes(bytes_, 24)
        return AddressDto(address)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 24

    def get_address(self) -> bytes:
        """Gets Address.

        Returns:
            Address.
        """
        return self.address

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.address)
        return bytes_

    def __str__(self):
        result = hexlify(self.address).decode('utf-8') # Address
        return result

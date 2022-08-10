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

class AmountDto:
    """Amount.

    Attributes:
        amount: Amount.
    """
    def __init__(self, amount: int = 0):
        """Constructor.

        Args:
            amount: Amount.
        """
        self.amount = amount

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AmountDto:
        """Creates an instance of AmountDto from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AmountDto.
        """
        bytes_ = bytes(payload)
        amount = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, 8))
        return AmountDto(amount)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 8

    def get_amount(self) -> int:
        """Gets Amount.

        Returns:
            Amount.
        """
        return self.amount

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_amount(), 8))
        return bytes_

    def __str__(self):
        result = hexlify(GeneratorUtils.uint_to_buffer(self.get_amount(), 8)).decode('utf-8')
        return result

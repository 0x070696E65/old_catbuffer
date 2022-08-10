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
from enum import Enum
from .GeneratorUtils import GeneratorUtils


class AccountTypeDto(Enum):
    """Enumeration of account types

    Attributes:
        UNLINKED: account is not linked to another account.
        MAIN: account is a balance-holding account that is linked to a remote harvester account.
        REMOTE: account is a remote harvester account that is linked to a balance-holding account.
        REMOTE_UNLINKED: account is a remote harvester eligible account that is unlinked \note this allows an account that has previously been used as remote to be reused as a remote.
    """

    UNLINKED = 0
    MAIN = 1
    REMOTE = 2
    REMOTE_UNLINKED = 3

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountTypeDto:
        """Creates an instance of AccountTypeDto from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountTypeDto.
        """
        value: int = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes(payload), 1))
        return AccountTypeDto(value)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 1

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.value, 1))
        return bytes_

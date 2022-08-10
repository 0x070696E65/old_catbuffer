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


class NetworkTypeDto(Enum):
    """Enumeration of network types

    Attributes:
        MIJIN: mijin network.
        PUBLIC: public network.
        PRIVATE: private network.
        MIJIN_TEST: mijin test network.
        PUBLIC_TEST: public test network.
        PRIVATE_TEST: private test network.
    """

    MIJIN = 96
    PUBLIC = 104
    PRIVATE = 120
    MIJIN_TEST = 144
    PUBLIC_TEST = 152
    PRIVATE_TEST = 168

    @classmethod
    def load_from_binary(cls, payload: bytes) -> NetworkTypeDto:
        """Creates an instance of NetworkTypeDto from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of NetworkTypeDto.
        """
        value: int = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes(payload), 1))
        return NetworkTypeDto(value)

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

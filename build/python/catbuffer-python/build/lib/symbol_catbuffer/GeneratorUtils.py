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
from typing import List, TypeVar

T = TypeVar('T')

class GeneratorUtils:
    """Generator utility class"""

    @staticmethod
    def buffer_to_uint(buffer: bytes) -> int:
        return int.from_bytes(buffer, byteorder='little', signed=False)

    @staticmethod
    def uint_to_buffer(uint: int, buffer_size: int) -> bytes:
        return uint.to_bytes(buffer_size, byteorder='little', signed=False)

    @staticmethod
    def concat_typed_arrays(array1, array2):
        return array1 + array2

    @staticmethod
    def get_transaction_padding_size(size: int, alignment: int) -> int:
        if size % alignment == 0:
            return 0
        return alignment - (size % alignment)

    @staticmethod
    def get_bytes(binary: bytes, size: int) -> bytes:
        if size > len(binary):
            raise Exception('size should not exceed {0}. The value of size was: {1}'.format(len(binary), size))
        return binary[0:size]

    # pylint: disable=bad-staticmethod-argument
    # cls argument is not GeneratorUtils
    @staticmethod
    def load_from_binary(cls: T, items: List[cls], payload: bytes, payloadSize: int):
        remainingByteSizes = payloadSize
        while remainingByteSizes > 0:
            item = cls.load_from_binary(payload)
            items.append(item)
            itemSize = item.get_size()
            remainingByteSizes -= itemSize
            payload = payload[itemSize:]
        return payload

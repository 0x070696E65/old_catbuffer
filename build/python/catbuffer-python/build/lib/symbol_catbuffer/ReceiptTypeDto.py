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


class ReceiptTypeDto(Enum):
    """Enumeration of receipt types

    Attributes:
        RESERVED: reserved receipt type.
        MOSAIC_RENTAL_FEE: mosaic rental fee receipt type.
        NAMESPACE_RENTAL_FEE: namespace rental fee receipt type.
        HARVEST_FEE: harvest fee receipt type.
        LOCK_HASH_COMPLETED: lock hash completed receipt type.
        LOCK_HASH_EXPIRED: lock hash expired receipt type.
        LOCK_SECRET_COMPLETED: lock secret completed receipt type.
        LOCK_SECRET_EXPIRED: lock secret expired receipt type.
        LOCK_HASH_CREATED: lock hash created receipt type.
        LOCK_SECRET_CREATED: lock secret created receipt type.
        MOSAIC_EXPIRED: mosaic expired receipt type.
        NAMESPACE_EXPIRED: namespace expired receipt type.
        NAMESPACE_DELETED: namespace deleted receipt type.
        INFLATION: inflation receipt type.
        TRANSACTION_GROUP: transaction group receipt type.
        ADDRESS_ALIAS_RESOLUTION: address alias resolution receipt type.
        MOSAIC_ALIAS_RESOLUTION: mosaic alias resolution receipt type.
    """

    RESERVED = 0
    MOSAIC_RENTAL_FEE = 4685
    NAMESPACE_RENTAL_FEE = 4942
    HARVEST_FEE = 8515
    LOCK_HASH_COMPLETED = 8776
    LOCK_HASH_EXPIRED = 9032
    LOCK_SECRET_COMPLETED = 8786
    LOCK_SECRET_EXPIRED = 9042
    LOCK_HASH_CREATED = 12616
    LOCK_SECRET_CREATED = 12626
    MOSAIC_EXPIRED = 16717
    NAMESPACE_EXPIRED = 16718
    NAMESPACE_DELETED = 16974
    INFLATION = 20803
    TRANSACTION_GROUP = 57667
    ADDRESS_ALIAS_RESOLUTION = 61763
    MOSAIC_ALIAS_RESOLUTION = 62019

    @classmethod
    def load_from_binary(cls, payload: bytes) -> ReceiptTypeDto:
        """Creates an instance of ReceiptTypeDto from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ReceiptTypeDto.
        """
        value: int = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes(payload), 2))
        return ReceiptTypeDto(value)

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return 2

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.value, 2))
        return bytes_

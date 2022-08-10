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
from typing import List
from .GeneratorUtils import GeneratorUtils
from .HeightActivityBucketBuilder import HeightActivityBucketBuilder

class HeightActivityBucketsBuilder:
    """Account activity buckets.

    Attributes:
        buckets: Account activity buckets.
    """

    def __init__(self, buckets: List[HeightActivityBucketBuilder]):
        """Constructor.
        Args:
            buckets: Account activity buckets.
        """
        self.buckets = buckets


    @classmethod
    def load_from_binary(cls, payload: bytes) -> HeightActivityBucketsBuilder:
        """Creates an instance of HeightActivityBucketsBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of HeightActivityBucketsBuilder.
        """
        bytes_ = bytes(payload)

        buckets: List[HeightActivityBucketBuilder] = []  # kind:ARRAY
        for _ in range(5):
            item = HeightActivityBucketBuilder.load_from_binary(bytes_)
            buckets.append(item)
            bytes_ = bytes_[item.get_size():]
        return HeightActivityBucketsBuilder(buckets)

    def get_buckets(self) -> List[HeightActivityBucketBuilder]:
        """Gets account activity buckets.
        Returns:
            Account activity buckets.
        """
        return self.buckets

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        for _ in self.buckets:
            size += _.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        for _ in self.buckets: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
        return bytes_
    # end of class

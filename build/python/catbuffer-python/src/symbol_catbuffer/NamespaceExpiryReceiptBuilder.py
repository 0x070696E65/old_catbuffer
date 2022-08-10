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
from .GeneratorUtils import GeneratorUtils
from .NamespaceIdDto import NamespaceIdDto
from .ReceiptBuilder import ReceiptBuilder
from .ReceiptTypeDto import ReceiptTypeDto

class NamespaceExpiryReceiptBuilder(ReceiptBuilder):
    """Binary layout for a namespace expiry receipt.

    Attributes:
        artifactId: Expiring namespace id.
    """

    def __init__(self, version: int, type: ReceiptTypeDto, artifactId: NamespaceIdDto):
        """Constructor.
        Args:
            version: Receipt version.
            type: Receipt type.
            artifactId: Expiring namespace id.
        """
        super().__init__(version, type)
        self.artifactId = artifactId


    @classmethod
    def load_from_binary(cls, payload: bytes) -> NamespaceExpiryReceiptBuilder:
        """Creates an instance of NamespaceExpiryReceiptBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of NamespaceExpiryReceiptBuilder.
        """
        bytes_ = bytes(payload)
        superObject = ReceiptBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        artifactId = NamespaceIdDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[artifactId.get_size():]
        return NamespaceExpiryReceiptBuilder(superObject.version, superObject.type, artifactId)

    def get_artifact_id(self) -> NamespaceIdDto:
        """Gets expiring namespace id.
        Returns:
            Expiring namespace id.
        """
        return self.artifactId

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.artifactId.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.artifactId.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

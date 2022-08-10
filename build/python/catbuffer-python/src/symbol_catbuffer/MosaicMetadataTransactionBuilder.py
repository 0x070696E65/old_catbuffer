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

# pylint: disable=unused-import

from binascii import hexlify
import re
from .GeneratorUtils import GeneratorUtils
from .AmountDto import AmountDto
from .EntityTypeDto import EntityTypeDto
from .KeyDto import KeyDto
from .MosaicMetadataTransactionBodyBuilder import MosaicMetadataTransactionBodyBuilder
from .NetworkTypeDto import NetworkTypeDto
from .SignatureDto import SignatureDto
from .TimestampDto import TimestampDto
from .TransactionBuilder import TransactionBuilder
from .UnresolvedAddressDto import UnresolvedAddressDto
from .UnresolvedMosaicIdDto import UnresolvedMosaicIdDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class MosaicMetadataTransactionBuilder(TransactionBuilder):
    """Binary layout for a non-embedded mosaic metadata transaction.

    Attributes:
        body: Mosaic metadata transaction body.
    """
    type_hints = {
        'signature' : 'SignatureDto',
        'signer_public_key' : 'KeyDto',
        'network' : 'enum:NetworkTypeDto',
        'type' : 'enum:EntityTypeDto',
        'fee' : 'AmountDto',
        'deadline' : 'TimestampDto',
        'target_address' : 'UnresolvedAddressDto',
        'target_mosaic_id' : 'UnresolvedMosaicIdDto',
    }

    VERSION = 1
    ENTITY_TYPE = 0x4244

    def __init__(self, signer_public_key, network: NetworkTypeDto):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            network: Entity network.
        """
        super().__init__(signer_public_key, self.VERSION, network, self.ENTITY_TYPE)

        self.body = MosaicMetadataTransactionBodyBuilder()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> MosaicMetadataTransactionBuilder:
        """Creates an instance of MosaicMetadataTransactionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of MosaicMetadataTransactionBuilder.
        """
        bytes_ = bytes(payload)
        superObject = TransactionBuilder.load_from_binary(bytes_)
        assert cls.VERSION == superObject.version, 'Invalid entity version ({})'.format(superObject.version)
        assert cls.ENTITY_TYPE == superObject.type, 'Invalid entity type ({})'.format(superObject.type)
        bytes_ = bytes_[superObject.get_size():]

        body = MosaicMetadataTransactionBodyBuilder.load_from_binary(bytes_)  # kind:CUSTOM1_nonbyte
        bytes_ = bytes_[body.get_size():]

        # create object and call
        result = MosaicMetadataTransactionBuilder(superObject.signer_public_key, superObject.network)
        result.signature = superObject.signature
        result.fee = superObject.fee
        result.deadline = superObject.deadline
        result.body = body
        return result

    @property
    def target_address(self):
        return self.body.target_address

    @target_address.setter
    def target_address(self, target_address): # MARKER1 AttributeKind.CUSTOM
        self.body.target_address = target_address

    @property
    def scoped_metadata_key(self):
        return self.body.scoped_metadata_key

    @scoped_metadata_key.setter
    def scoped_metadata_key(self, scoped_metadata_key): # MARKER1 AttributeKind.SIMPLE
        self.body.scoped_metadata_key = scoped_metadata_key

    @property
    def target_mosaic_id(self):
        return self.body.target_mosaic_id

    @target_mosaic_id.setter
    def target_mosaic_id(self, target_mosaic_id): # MARKER1 AttributeKind.CUSTOM
        self.body.target_mosaic_id = target_mosaic_id

    @property
    def value_size_delta(self):
        return self.body.value_size_delta

    @value_size_delta.setter
    def value_size_delta(self, value_size_delta): # MARKER1 AttributeKind.SIMPLE
        self.body.value_size_delta = value_size_delta

    @property
    def value(self):
        return self.body.value

    @value.setter
    def value(self, value): # MARKER1 AttributeKind.BUFFER
        self.body.value = value

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.body.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.body.serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += super().__str__()
        result += self.body.__str__()
        return result

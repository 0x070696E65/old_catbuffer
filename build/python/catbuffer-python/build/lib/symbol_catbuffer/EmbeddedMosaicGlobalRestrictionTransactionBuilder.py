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
from .EmbeddedTransactionBuilder import EmbeddedTransactionBuilder
from .EntityTypeDto import EntityTypeDto
from .KeyDto import KeyDto
from .MosaicGlobalRestrictionTransactionBodyBuilder import MosaicGlobalRestrictionTransactionBodyBuilder
from .MosaicRestrictionTypeDto import MosaicRestrictionTypeDto
from .NetworkTypeDto import NetworkTypeDto
from .UnresolvedMosaicIdDto import UnresolvedMosaicIdDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class EmbeddedMosaicGlobalRestrictionTransactionBuilder(EmbeddedTransactionBuilder):
    """Binary layout for an embedded mosaic global restriction transaction.

    Attributes:
        body: Mosaic global restriction transaction body.
    """
    type_hints = {
        'embedded_transaction' : 'EmbeddedTransactionBuilder',
        'signer_public_key' : 'KeyDto',
        'network' : 'enum:NetworkTypeDto',
        'type' : 'enum:EntityTypeDto',
        'mosaic_id' : 'UnresolvedMosaicIdDto',
        'reference_mosaic_id' : 'UnresolvedMosaicIdDto',
        'previous_restriction_type' : 'enum:MosaicRestrictionTypeDto',
        'new_restriction_type' : 'enum:MosaicRestrictionTypeDto',
    }

    VERSION = 1
    ENTITY_TYPE = 0x4151

    def __init__(self, signer_public_key, network: NetworkTypeDto):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            network: Entity network.
        """
        super().__init__(signer_public_key, self.VERSION, network, self.ENTITY_TYPE)

        self.body = MosaicGlobalRestrictionTransactionBodyBuilder()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> EmbeddedMosaicGlobalRestrictionTransactionBuilder:
        """Creates an instance of EmbeddedMosaicGlobalRestrictionTransactionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of EmbeddedMosaicGlobalRestrictionTransactionBuilder.
        """
        bytes_ = bytes(payload)
        superObject = EmbeddedTransactionBuilder.load_from_binary(bytes_)
        assert cls.VERSION == superObject.version, 'Invalid entity version ({})'.format(superObject.version)
        assert cls.ENTITY_TYPE == superObject.type, 'Invalid entity type ({})'.format(superObject.type)
        bytes_ = bytes_[superObject.get_size():]

        body = MosaicGlobalRestrictionTransactionBodyBuilder.load_from_binary(bytes_)  # kind:CUSTOM1_nonbyte
        bytes_ = bytes_[body.get_size():]

        # create object and call
        result = EmbeddedMosaicGlobalRestrictionTransactionBuilder(superObject.signer_public_key, superObject.network)
        # nothing needed to copy into EmbeddedTransaction
        result.body = body
        return result

    @property
    def mosaic_id(self):
        return self.body.mosaic_id

    @mosaic_id.setter
    def mosaic_id(self, mosaic_id): # MARKER1 AttributeKind.CUSTOM
        self.body.mosaic_id = mosaic_id

    @property
    def reference_mosaic_id(self):
        return self.body.reference_mosaic_id

    @reference_mosaic_id.setter
    def reference_mosaic_id(self, reference_mosaic_id): # MARKER1 AttributeKind.CUSTOM
        self.body.reference_mosaic_id = reference_mosaic_id

    @property
    def restriction_key(self):
        return self.body.restriction_key

    @restriction_key.setter
    def restriction_key(self, restriction_key): # MARKER1 AttributeKind.SIMPLE
        self.body.restriction_key = restriction_key

    @property
    def previous_restriction_value(self):
        return self.body.previous_restriction_value

    @previous_restriction_value.setter
    def previous_restriction_value(self, previous_restriction_value): # MARKER1 AttributeKind.SIMPLE
        self.body.previous_restriction_value = previous_restriction_value

    @property
    def new_restriction_value(self):
        return self.body.new_restriction_value

    @new_restriction_value.setter
    def new_restriction_value(self, new_restriction_value): # MARKER1 AttributeKind.SIMPLE
        self.body.new_restriction_value = new_restriction_value

    @property
    def previous_restriction_type(self):
        return self.body.previous_restriction_type

    @previous_restriction_type.setter
    def previous_restriction_type(self, previous_restriction_type): # MARKER1 AttributeKind.CUSTOM
        self.body.previous_restriction_type = previous_restriction_type

    @property
    def new_restriction_type(self):
        return self.body.new_restriction_type

    @new_restriction_type.setter
    def new_restriction_type(self, new_restriction_type): # MARKER1 AttributeKind.CUSTOM
        self.body.new_restriction_type = new_restriction_type

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

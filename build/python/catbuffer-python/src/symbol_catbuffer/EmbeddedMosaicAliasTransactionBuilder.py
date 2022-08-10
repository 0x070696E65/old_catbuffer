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
from .AliasActionDto import AliasActionDto
from .EmbeddedTransactionBuilder import EmbeddedTransactionBuilder
from .EntityTypeDto import EntityTypeDto
from .KeyDto import KeyDto
from .MosaicAliasTransactionBodyBuilder import MosaicAliasTransactionBodyBuilder
from .MosaicIdDto import MosaicIdDto
from .NamespaceIdDto import NamespaceIdDto
from .NetworkTypeDto import NetworkTypeDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class EmbeddedMosaicAliasTransactionBuilder(EmbeddedTransactionBuilder):
    """Binary layout for an embedded mosaic alias transaction.

    Attributes:
        body: Mosaic alias transaction body.
    """
    type_hints = {
        'embedded_transaction' : 'EmbeddedTransactionBuilder',
        'signer_public_key' : 'KeyDto',
        'network' : 'enum:NetworkTypeDto',
        'type' : 'enum:EntityTypeDto',
        'namespace_id' : 'NamespaceIdDto',
        'mosaic_id' : 'MosaicIdDto',
        'alias_action' : 'enum:AliasActionDto',
    }

    VERSION = 1
    ENTITY_TYPE = 0x434e

    def __init__(self, signer_public_key, network: NetworkTypeDto):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            network: Entity network.
        """
        super().__init__(signer_public_key, self.VERSION, network, self.ENTITY_TYPE)

        self.body = MosaicAliasTransactionBodyBuilder()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> EmbeddedMosaicAliasTransactionBuilder:
        """Creates an instance of EmbeddedMosaicAliasTransactionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of EmbeddedMosaicAliasTransactionBuilder.
        """
        bytes_ = bytes(payload)
        superObject = EmbeddedTransactionBuilder.load_from_binary(bytes_)
        assert cls.VERSION == superObject.version, 'Invalid entity version ({})'.format(superObject.version)
        assert cls.ENTITY_TYPE == superObject.type, 'Invalid entity type ({})'.format(superObject.type)
        bytes_ = bytes_[superObject.get_size():]

        body = MosaicAliasTransactionBodyBuilder.load_from_binary(bytes_)  # kind:CUSTOM1_nonbyte
        bytes_ = bytes_[body.get_size():]

        # create object and call
        result = EmbeddedMosaicAliasTransactionBuilder(superObject.signer_public_key, superObject.network)
        # nothing needed to copy into EmbeddedTransaction
        result.body = body
        return result

    @property
    def namespace_id(self):
        return self.body.namespace_id

    @namespace_id.setter
    def namespace_id(self, namespace_id): # MARKER1 AttributeKind.CUSTOM
        self.body.namespace_id = namespace_id

    @property
    def mosaic_id(self):
        return self.body.mosaic_id

    @mosaic_id.setter
    def mosaic_id(self, mosaic_id): # MARKER1 AttributeKind.CUSTOM
        self.body.mosaic_id = mosaic_id

    @property
    def alias_action(self):
        return self.body.alias_action

    @alias_action.setter
    def alias_action(self, alias_action): # MARKER1 AttributeKind.CUSTOM
        self.body.alias_action = alias_action

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

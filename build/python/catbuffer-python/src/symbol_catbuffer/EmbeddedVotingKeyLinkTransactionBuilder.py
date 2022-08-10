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
from .FinalizationEpochDto import FinalizationEpochDto
from .KeyDto import KeyDto
from .LinkActionDto import LinkActionDto
from .NetworkTypeDto import NetworkTypeDto
from .VotingKeyDto import VotingKeyDto
from .VotingKeyLinkTransactionBodyBuilder import VotingKeyLinkTransactionBodyBuilder

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class EmbeddedVotingKeyLinkTransactionBuilder(EmbeddedTransactionBuilder):
    """Binary layout for an embedded voting key link transaction.

    Attributes:
        body: Voting key link transaction body.
    """
    type_hints = {
        'embedded_transaction' : 'EmbeddedTransactionBuilder',
        'signer_public_key' : 'KeyDto',
        'network' : 'enum:NetworkTypeDto',
        'type' : 'enum:EntityTypeDto',
        'linked_public_key' : 'VotingKeyDto',
        'start_epoch' : 'FinalizationEpochDto',
        'end_epoch' : 'FinalizationEpochDto',
        'link_action' : 'enum:LinkActionDto',
    }

    VERSION = 1
    ENTITY_TYPE = 0x4143

    def __init__(self, signer_public_key, network: NetworkTypeDto):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            network: Entity network.
        """
        super().__init__(signer_public_key, self.VERSION, network, self.ENTITY_TYPE)

        self.body = VotingKeyLinkTransactionBodyBuilder()

    @classmethod
    def load_from_binary(cls, payload: bytes) -> EmbeddedVotingKeyLinkTransactionBuilder:
        """Creates an instance of EmbeddedVotingKeyLinkTransactionBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of EmbeddedVotingKeyLinkTransactionBuilder.
        """
        bytes_ = bytes(payload)
        superObject = EmbeddedTransactionBuilder.load_from_binary(bytes_)
        assert cls.VERSION == superObject.version, 'Invalid entity version ({})'.format(superObject.version)
        assert cls.ENTITY_TYPE == superObject.type, 'Invalid entity type ({})'.format(superObject.type)
        bytes_ = bytes_[superObject.get_size():]

        body = VotingKeyLinkTransactionBodyBuilder.load_from_binary(bytes_)  # kind:CUSTOM1_nonbyte
        bytes_ = bytes_[body.get_size():]

        # create object and call
        result = EmbeddedVotingKeyLinkTransactionBuilder(superObject.signer_public_key, superObject.network)
        # nothing needed to copy into EmbeddedTransaction
        result.body = body
        return result

    @property
    def linked_public_key(self):
        return self.body.linked_public_key

    @linked_public_key.setter
    def linked_public_key(self, linked_public_key): # MARKER1 AttributeKind.CUSTOM
        self.body.linked_public_key = linked_public_key

    @property
    def start_epoch(self):
        return self.body.start_epoch

    @start_epoch.setter
    def start_epoch(self, start_epoch): # MARKER1 AttributeKind.CUSTOM
        self.body.start_epoch = start_epoch

    @property
    def end_epoch(self):
        return self.body.end_epoch

    @end_epoch.setter
    def end_epoch(self, end_epoch): # MARKER1 AttributeKind.CUSTOM
        self.body.end_epoch = end_epoch

    @property
    def link_action(self):
        return self.body.link_action

    @link_action.setter
    def link_action(self, link_action): # MARKER1 AttributeKind.CUSTOM
        self.body.link_action = link_action

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

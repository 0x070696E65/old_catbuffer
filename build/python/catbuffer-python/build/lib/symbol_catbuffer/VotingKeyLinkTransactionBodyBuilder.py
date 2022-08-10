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
from .FinalizationEpochDto import FinalizationEpochDto
from .LinkActionDto import LinkActionDto
from .VotingKeyDto import VotingKeyDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class VotingKeyLinkTransactionBodyBuilder:
    """Binary layout for a voting key link transaction.

    Attributes:
        linked_public_key: Linked public key.
        start_epoch: Start finalization epoch.
        end_epoch: End finalization epoch.
        link_action: Link action.
    """
    def __init__(self):
        """ Constructor."""
        self.linked_public_key = bytes(32)
        self.start_epoch = FinalizationEpochDto().finalizationEpoch
        self.end_epoch = FinalizationEpochDto().finalizationEpoch
        self.link_action = LinkActionDto(0).value

    @classmethod
    def load_from_binary(cls, payload: bytes) -> VotingKeyLinkTransactionBodyBuilder:
        """Creates an instance of VotingKeyLinkTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of VotingKeyLinkTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        linked_public_key_ = VotingKeyDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        linked_public_key = linked_public_key_.votingKey
        bytes_ = bytes_[linked_public_key_.get_size():]
        start_epoch_ = FinalizationEpochDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        start_epoch = start_epoch_.finalizationEpoch
        bytes_ = bytes_[start_epoch_.get_size():]
        end_epoch_ = FinalizationEpochDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        end_epoch = end_epoch_.finalizationEpoch
        bytes_ = bytes_[end_epoch_.get_size():]
        link_action_ = LinkActionDto.load_from_binary(bytes_)  # kind:CUSTOM2
        link_action = link_action_.value
        bytes_ = bytes_[link_action_.get_size():]

        # create object and call
        result = VotingKeyLinkTransactionBodyBuilder()
        result.linked_public_key = linked_public_key
        result.start_epoch = start_epoch
        result.end_epoch = end_epoch
        result.link_action = link_action
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += VotingKeyDto(self.linked_public_key).get_size()
        size += FinalizationEpochDto(self.start_epoch).get_size()
        size += FinalizationEpochDto(self.end_epoch).get_size()
        size += LinkActionDto(self.link_action).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, VotingKeyDto(self.linked_public_key).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, FinalizationEpochDto(self.start_epoch).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, FinalizationEpochDto(self.end_epoch).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, LinkActionDto(self.link_action).serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('linked_public_key', to_hex_string(VotingKeyDto(self.linked_public_key).serialize()))
        result += '{:24s} : {}\n'.format('start_epoch', to_hex_string(FinalizationEpochDto(self.start_epoch).serialize()))
        result += '{:24s} : {}\n'.format('end_epoch', to_hex_string(FinalizationEpochDto(self.end_epoch).serialize()))
        result += '{:24s} : {}\n'.format('link_action', to_hex_string(LinkActionDto(self.link_action).serialize()))
        return result

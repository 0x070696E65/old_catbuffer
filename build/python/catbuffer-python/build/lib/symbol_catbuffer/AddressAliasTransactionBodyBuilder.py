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
from .AddressDto import AddressDto
from .AliasActionDto import AliasActionDto
from .NamespaceIdDto import NamespaceIdDto

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class AddressAliasTransactionBodyBuilder:
    """Binary layout for an address alias transaction.

    Attributes:
        namespace_id: Identifier of the namespace that will become an alias.
        address: Aliased address.
        alias_action: Alias action.
    """
    def __init__(self):
        """ Constructor."""
        self.namespace_id = NamespaceIdDto().namespaceId
        self.address = bytes(24)
        self.alias_action = AliasActionDto(0).value

    @classmethod
    def load_from_binary(cls, payload: bytes) -> AddressAliasTransactionBodyBuilder:
        """Creates an instance of AddressAliasTransactionBodyBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AddressAliasTransactionBodyBuilder.
        """
        bytes_ = bytes(payload)

        namespace_id_ = NamespaceIdDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        namespace_id = namespace_id_.namespaceId
        bytes_ = bytes_[namespace_id_.get_size():]
        address_ = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        address = address_.address
        bytes_ = bytes_[address_.get_size():]
        alias_action_ = AliasActionDto.load_from_binary(bytes_)  # kind:CUSTOM2
        alias_action = alias_action_.value
        bytes_ = bytes_[alias_action_.get_size():]

        # create object and call
        result = AddressAliasTransactionBodyBuilder()
        result.namespace_id = namespace_id
        result.address = address
        result.alias_action = alias_action
        return result

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += NamespaceIdDto(self.namespace_id).get_size()
        size += AddressDto(self.address).get_size()
        size += AliasActionDto(self.alias_action).get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, NamespaceIdDto(self.namespace_id).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, AddressDto(self.address).serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, AliasActionDto(self.alias_action).serialize())  # kind:CUSTOM
        return bytes_

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
        result += '{:24s} : {}\n'.format('namespace_id', to_hex_string(NamespaceIdDto(self.namespace_id).serialize()))
        result += '{:24s} : {}\n'.format('address', to_hex_string(AddressDto(self.address).serialize()))
        result += '{:24s} : {}\n'.format('alias_action', to_hex_string(AliasActionDto(self.alias_action).serialize()))
        return result

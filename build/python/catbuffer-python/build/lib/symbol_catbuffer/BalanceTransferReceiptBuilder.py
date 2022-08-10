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
from .AddressDto import AddressDto
from .MosaicBuilder import MosaicBuilder
from .ReceiptBuilder import ReceiptBuilder
from .ReceiptTypeDto import ReceiptTypeDto

class BalanceTransferReceiptBuilder(ReceiptBuilder):
    """Binary layout for a balance transfer receipt.

    Attributes:
        mosaic: Mosaic.
        senderAddress: Mosaic sender address.
        recipientAddress: Mosaic recipient address.
    """

    def __init__(self, version: int, type: ReceiptTypeDto, mosaic: MosaicBuilder, senderAddress: AddressDto, recipientAddress: AddressDto):
        """Constructor.
        Args:
            version: Receipt version.
            type: Receipt type.
            mosaic: Mosaic.
            senderAddress: Mosaic sender address.
            recipientAddress: Mosaic recipient address.
        """
        super().__init__(version, type)
        self.mosaic = mosaic
        self.senderAddress = senderAddress
        self.recipientAddress = recipientAddress


    @classmethod
    def load_from_binary(cls, payload: bytes) -> BalanceTransferReceiptBuilder:
        """Creates an instance of BalanceTransferReceiptBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of BalanceTransferReceiptBuilder.
        """
        bytes_ = bytes(payload)
        superObject = ReceiptBuilder.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]

        mosaic = MosaicBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[mosaic.get_size():]
        senderAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[senderAddress.get_size():]
        recipientAddress = AddressDto.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[recipientAddress.get_size():]
        return BalanceTransferReceiptBuilder(superObject.version, superObject.type, mosaic, senderAddress, recipientAddress)

    def get_mosaic(self) -> MosaicBuilder:
        """Gets mosaic.
        Returns:
            Mosaic.
        """
        return self.mosaic

    def get_sender_address(self) -> AddressDto:
        """Gets mosaic sender address.
        Returns:
            Mosaic sender address.
        """
        return self.senderAddress

    def get_recipient_address(self) -> AddressDto:
        """Gets mosaic recipient address.
        Returns:
            Mosaic recipient address.
        """
        return self.recipientAddress

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = super().get_size()
        size += self.mosaic.get_size()
        size += self.senderAddress.get_size()
        size += self.recipientAddress.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaic.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.senderAddress.serialize())  # kind:CUSTOM
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.recipientAddress.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

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
from .AccountRestrictionAddressValueBuilder import AccountRestrictionAddressValueBuilder
from .AccountRestrictionFlagsDto import AccountRestrictionFlagsDto
from .AccountRestrictionMosaicValueBuilder import AccountRestrictionMosaicValueBuilder
from .AccountRestrictionTransactionTypeValueBuilder import AccountRestrictionTransactionTypeValueBuilder

class AccountRestrictionsInfoBuilder:
    """Binary layout for account restrictions.

    Attributes:
        restrictionFlags: Raw restriction flags.
        addressRestrictions: Address restrictions.
        mosaicIdRestrictions: Mosaic identifier restrictions.
        transactionTypeRestrictions: Transaction type restrictions.
    """

    def __init__(self, restrictionFlags: List[AccountRestrictionFlagsDto], addressRestrictions: AccountRestrictionAddressValueBuilder, mosaicIdRestrictions: AccountRestrictionMosaicValueBuilder, transactionTypeRestrictions: AccountRestrictionTransactionTypeValueBuilder):
        """Constructor.
        Args:
            restrictionFlags: Raw restriction flags.
            addressRestrictions: Address restrictions.
            mosaicIdRestrictions: Mosaic identifier restrictions.
            transactionTypeRestrictions: Transaction type restrictions.
        """
        self.restrictionFlags = restrictionFlags
        self.addressRestrictions = addressRestrictions
        self.mosaicIdRestrictions = mosaicIdRestrictions
        self.transactionTypeRestrictions = transactionTypeRestrictions


    @classmethod
    def load_from_binary(cls, payload: bytes) -> AccountRestrictionsInfoBuilder:
        """Creates an instance of AccountRestrictionsInfoBuilder from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of AccountRestrictionsInfoBuilder.
        """
        bytes_ = bytes(payload)

        restrictionFlags = AccountRestrictionFlagsDto.bytesToFlags(bytes_, 2)  # kind:FLAGS
        bytes_ = bytes_[2:]
        addressRestrictions = None
        if AccountRestrictionFlagsDto.ADDRESS in restrictionFlags:
            addressRestrictions = AccountRestrictionAddressValueBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[addressRestrictions.get_size():]
        mosaicIdRestrictions = None
        if AccountRestrictionFlagsDto.MOSAIC_ID in restrictionFlags:
            mosaicIdRestrictions = AccountRestrictionMosaicValueBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[mosaicIdRestrictions.get_size():]
        transactionTypeRestrictions = None
        if AccountRestrictionFlagsDto.TRANSACTION_TYPE in restrictionFlags:
            transactionTypeRestrictions = AccountRestrictionTransactionTypeValueBuilder.load_from_binary(bytes_)  # kind:CUSTOM1
            bytes_ = bytes_[transactionTypeRestrictions.get_size():]
        return AccountRestrictionsInfoBuilder(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions)

    def get_restriction_flags(self) -> List[AccountRestrictionFlagsDto]:
        """Gets raw restriction flags.
        Returns:
            Raw restriction flags.
        """
        return self.restrictionFlags

    def get_address_restrictions(self) -> AccountRestrictionAddressValueBuilder:
        """Gets address restrictions.
        Returns:
            Address restrictions.
        """
        if not AccountRestrictionFlagsDto.ADDRESS in self.restrictionFlags:
            raise Exception('restrictionFlags is not set to ADDRESS.')
        return self.addressRestrictions

    def get_mosaic_id_restrictions(self) -> AccountRestrictionMosaicValueBuilder:
        """Gets mosaic identifier restrictions.
        Returns:
            Mosaic identifier restrictions.
        """
        if not AccountRestrictionFlagsDto.MOSAIC_ID in self.restrictionFlags:
            raise Exception('restrictionFlags is not set to MOSAIC_ID.')
        return self.mosaicIdRestrictions

    def get_transaction_type_restrictions(self) -> AccountRestrictionTransactionTypeValueBuilder:
        """Gets transaction type restrictions.
        Returns:
            Transaction type restrictions.
        """
        if not AccountRestrictionFlagsDto.TRANSACTION_TYPE in self.restrictionFlags:
            raise Exception('restrictionFlags is not set to TRANSACTION_TYPE.')
        return self.transactionTypeRestrictions

    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = 0
        size += 2  # restrictionFlags
        if AccountRestrictionFlagsDto.ADDRESS in self.restrictionFlags:
            size += self.addressRestrictions.get_size()
        if AccountRestrictionFlagsDto.MOSAIC_ID in self.restrictionFlags:
            size += self.mosaicIdRestrictions.get_size()
        if AccountRestrictionFlagsDto.TRANSACTION_TYPE in self.restrictionFlags:
            size += self.transactionTypeRestrictions.get_size()
        return size

    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(AccountRestrictionFlagsDto.flagsToInt(self.get_restriction_flags()), 2))  # kind:FLAGS
        if AccountRestrictionFlagsDto.ADDRESS in self.restrictionFlags:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.addressRestrictions.serialize())  # kind:CUSTOM
        if AccountRestrictionFlagsDto.MOSAIC_ID in self.restrictionFlags:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.mosaicIdRestrictions.serialize())  # kind:CUSTOM
        if AccountRestrictionFlagsDto.TRANSACTION_TYPE in self.restrictionFlags:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.transactionTypeRestrictions.serialize())  # kind:CUSTOM
        return bytes_
    # end of class

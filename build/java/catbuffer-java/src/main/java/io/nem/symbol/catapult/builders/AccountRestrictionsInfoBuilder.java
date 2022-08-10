/**
*** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
*** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
*** All rights reserved.
***
*** This file is part of Catapult.
***
*** Catapult is free software: you can redistribute it and/or modify
*** it under the terms of the GNU Lesser General Public License as published by
*** the Free Software Foundation, either version 3 of the License, or
*** (at your option) any later version.
***
*** Catapult is distributed in the hope that it will be useful,
*** but WITHOUT ANY WARRANTY; without even the implied warranty of
*** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
*** GNU Lesser General Public License for more details.
***
*** You should have received a copy of the GNU Lesser General Public License
*** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
**/

package io.nem.symbol.catapult.builders;

import java.io.DataInputStream;
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;

/**
* Binary layout for account restrictions
**/
public class AccountRestrictionsInfoBuilder implements Serializer {

    /** Raw restriction flags. **/
    private final EnumSet<AccountRestrictionFlagsDto> restrictionFlags;

    /** Address restrictions. **/
    private AccountRestrictionAddressValueBuilder addressRestrictions;

    /** Mosaic identifier restrictions. **/
    private AccountRestrictionMosaicValueBuilder mosaicIdRestrictions;

    /** Transaction type restrictions. **/
    private AccountRestrictionTransactionTypeValueBuilder transactionTypeRestrictions;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountRestrictionsInfoBuilder(DataInputStream stream) {
        try {
            this.restrictionFlags = GeneratorUtils.toSet(AccountRestrictionFlagsDto.class, Short.reverseBytes(stream.readShort()));
            if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.ADDRESS)) {
                this.addressRestrictions = AccountRestrictionAddressValueBuilder.loadFromBinary(stream);
            }
            if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.MOSAIC_ID)) {
                this.mosaicIdRestrictions = AccountRestrictionMosaicValueBuilder.loadFromBinary(stream);
            }
            if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.TRANSACTION_TYPE)) {
                this.transactionTypeRestrictions = AccountRestrictionTransactionTypeValueBuilder.loadFromBinary(stream);
            }
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountRestrictionsInfoBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountRestrictionsInfoBuilder.
     */
    public static AccountRestrictionsInfoBuilder loadFromBinary(DataInputStream stream) {
        return new AccountRestrictionsInfoBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param restrictionFlags Raw restriction flags.
    * @param addressRestrictions Address restrictions.
    * @param mosaicIdRestrictions Mosaic identifier restrictions.
    * @param transactionTypeRestrictions Transaction type restrictions.
    */
    protected AccountRestrictionsInfoBuilder(EnumSet<AccountRestrictionFlagsDto> restrictionFlags, AccountRestrictionAddressValueBuilder addressRestrictions, AccountRestrictionMosaicValueBuilder mosaicIdRestrictions, AccountRestrictionTransactionTypeValueBuilder transactionTypeRestrictions) {
        GeneratorUtils.notNull(restrictionFlags, "restrictionFlags is null");
        if (restrictionFlags.contains(AccountRestrictionFlagsDto.ADDRESS)) {
            GeneratorUtils.notNull(addressRestrictions, "addressRestrictions is null");
        }
        if (restrictionFlags.contains(AccountRestrictionFlagsDto.MOSAIC_ID)) {
            GeneratorUtils.notNull(mosaicIdRestrictions, "mosaicIdRestrictions is null");
        }
        if (restrictionFlags.contains(AccountRestrictionFlagsDto.TRANSACTION_TYPE)) {
            GeneratorUtils.notNull(transactionTypeRestrictions, "transactionTypeRestrictions is null");
        }
        this.restrictionFlags = restrictionFlags;
        this.addressRestrictions = addressRestrictions;
        this.mosaicIdRestrictions = mosaicIdRestrictions;
        this.transactionTypeRestrictions = transactionTypeRestrictions;
    }
    
    /**
     * Creates an instance of AccountRestrictionsInfoBuilder.
     *
     * @param restrictionFlags Raw restriction flags.
     * @param addressRestrictions Address restrictions.
     * @param mosaicIdRestrictions Mosaic identifier restrictions.
     * @param transactionTypeRestrictions Transaction type restrictions.
     * @return Instance of AccountRestrictionsInfoBuilder.
     */
    public static AccountRestrictionsInfoBuilder create(EnumSet<AccountRestrictionFlagsDto> restrictionFlags, AccountRestrictionAddressValueBuilder addressRestrictions, AccountRestrictionMosaicValueBuilder mosaicIdRestrictions, AccountRestrictionTransactionTypeValueBuilder transactionTypeRestrictions) {
        return new AccountRestrictionsInfoBuilder(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions);
    }

    /**
     * Gets raw restriction flags.
     *
     * @return Raw restriction flags.
     */
    public EnumSet<AccountRestrictionFlagsDto> getRestrictionFlags() {
        return this.restrictionFlags;
    }

    /**
     * Gets address restrictions.
     *
     * @return Address restrictions.
     */
    public AccountRestrictionAddressValueBuilder getAddressRestrictions() {
        if (!(this.restrictionFlags.contains(AccountRestrictionFlagsDto.ADDRESS))) {
            throw new java.lang.IllegalStateException("restrictionFlags is not set to ADDRESS.");
        }
        return this.addressRestrictions;
    }

    /**
     * Gets mosaic identifier restrictions.
     *
     * @return Mosaic identifier restrictions.
     */
    public AccountRestrictionMosaicValueBuilder getMosaicIdRestrictions() {
        if (!(this.restrictionFlags.contains(AccountRestrictionFlagsDto.MOSAIC_ID))) {
            throw new java.lang.IllegalStateException("restrictionFlags is not set to MOSAIC_ID.");
        }
        return this.mosaicIdRestrictions;
    }

    /**
     * Gets transaction type restrictions.
     *
     * @return Transaction type restrictions.
     */
    public AccountRestrictionTransactionTypeValueBuilder getTransactionTypeRestrictions() {
        if (!(this.restrictionFlags.contains(AccountRestrictionFlagsDto.TRANSACTION_TYPE))) {
            throw new java.lang.IllegalStateException("restrictionFlags is not set to TRANSACTION_TYPE.");
        }
        return this.transactionTypeRestrictions;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += AccountRestrictionFlagsDto.values()[0].getSize();
        if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.ADDRESS)) {
            size += this.addressRestrictions.getSize();
        }
        if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.MOSAIC_ID)) {
            size += this.mosaicIdRestrictions.getSize();
        }
        if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.TRANSACTION_TYPE)) {
            size += this.transactionTypeRestrictions.getSize();
        }
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.toLong(AccountRestrictionFlagsDto.class, this.restrictionFlags)));
            if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.ADDRESS)) {
                GeneratorUtils.writeEntity(dataOutputStream, this.addressRestrictions);
            }
            if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.MOSAIC_ID)) {
                GeneratorUtils.writeEntity(dataOutputStream, this.mosaicIdRestrictions);
            }
            if (this.restrictionFlags.contains(AccountRestrictionFlagsDto.TRANSACTION_TYPE)) {
                GeneratorUtils.writeEntity(dataOutputStream, this.transactionTypeRestrictions);
            }
        });
    }
}


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

import { AccountRestrictionAddressValueBuilder } from './AccountRestrictionAddressValueBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AccountRestrictionMosaicValueBuilder } from './AccountRestrictionMosaicValueBuilder';
import { AccountRestrictionTransactionTypeValueBuilder } from './AccountRestrictionTransactionTypeValueBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of AccountRestrictionsInfoBuilder.
 */
export interface AccountRestrictionsInfoBuilderParams {
    /** Raw restriction flags. **/
    restrictionFlags: AccountRestrictionFlagsDto[];
    /** Address restrictions. **/
    addressRestrictions?: AccountRestrictionAddressValueBuilder;
    /** Mosaic identifier restrictions. **/
    mosaicIdRestrictions?: AccountRestrictionMosaicValueBuilder;
    /** Transaction type restrictions. **/
    transactionTypeRestrictions?: AccountRestrictionTransactionTypeValueBuilder;
}

/**
 * Binary layout for account restrictions
 **/
export class AccountRestrictionsInfoBuilder implements Serializer {
    /** Raw restriction flags. **/
    public readonly restrictionFlags: AccountRestrictionFlagsDto[];

    /** Address restrictions. **/
    public readonly addressRestrictions?: AccountRestrictionAddressValueBuilder;

    /** Mosaic identifier restrictions. **/
    public readonly mosaicIdRestrictions?: AccountRestrictionMosaicValueBuilder;

    /** Transaction type restrictions. **/
    public readonly transactionTypeRestrictions?: AccountRestrictionTransactionTypeValueBuilder;

    /**
     * Constructor.
     *
     * @param restrictionFlags Raw restriction flags.
     * @param addressRestrictions Address restrictions.
     * @param mosaicIdRestrictions Mosaic identifier restrictions.
     * @param transactionTypeRestrictions Transaction type restrictions.
     */
    public constructor({
        restrictionFlags,
        addressRestrictions,
        mosaicIdRestrictions,
        transactionTypeRestrictions,
    }: AccountRestrictionsInfoBuilderParams) {
        GeneratorUtils.notNull(restrictionFlags, 'restrictionFlags is null or undefined');
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto.ADDRESS) > -1) {
            GeneratorUtils.notNull(addressRestrictions, 'addressRestrictions is null or undefined');
        }
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            GeneratorUtils.notNull(mosaicIdRestrictions, 'mosaicIdRestrictions is null or undefined');
        }
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            GeneratorUtils.notNull(transactionTypeRestrictions, 'transactionTypeRestrictions is null or undefined');
        }
        this.restrictionFlags = restrictionFlags;
        this.addressRestrictions = addressRestrictions;
        this.mosaicIdRestrictions = mosaicIdRestrictions;
        this.transactionTypeRestrictions = transactionTypeRestrictions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountRestrictionsInfoBuilder {
        const byteArray = Array.from(payload);
        const restrictionFlags: AccountRestrictionFlagsDto[] = GeneratorUtils.toFlags(
            AccountRestrictionFlagsDto,
            GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray)),
        );
        byteArray.splice(0, 2);
        let addressRestrictions: AccountRestrictionAddressValueBuilder | undefined = undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto.ADDRESS) > -1) {
            addressRestrictions = AccountRestrictionAddressValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, addressRestrictions.size);
        }
        let mosaicIdRestrictions: AccountRestrictionMosaicValueBuilder | undefined = undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            mosaicIdRestrictions = AccountRestrictionMosaicValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicIdRestrictions.size);
        }
        let transactionTypeRestrictions: AccountRestrictionTransactionTypeValueBuilder | undefined = undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            transactionTypeRestrictions = AccountRestrictionTransactionTypeValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, transactionTypeRestrictions.size);
        }
        return new AccountRestrictionsInfoBuilder({
            restrictionFlags: restrictionFlags,
            addressRestrictions: addressRestrictions,
            mosaicIdRestrictions: mosaicIdRestrictions,
            transactionTypeRestrictions: transactionTypeRestrictions,
        });
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
    public static createAccountRestrictionsInfoBuilder(
        restrictionFlags: AccountRestrictionFlagsDto[],
        addressRestrictions: AccountRestrictionAddressValueBuilder,
        mosaicIdRestrictions: AccountRestrictionMosaicValueBuilder,
        transactionTypeRestrictions: AccountRestrictionTransactionTypeValueBuilder,
    ): AccountRestrictionsInfoBuilder {
        return new AccountRestrictionsInfoBuilder({
            restrictionFlags: restrictionFlags,
            addressRestrictions: addressRestrictions,
            mosaicIdRestrictions: mosaicIdRestrictions,
            transactionTypeRestrictions: transactionTypeRestrictions,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 2; // restrictionFlags
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto.ADDRESS) > -1) {
            size += this.addressRestrictions!.size; // addressRestrictions
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            size += this.mosaicIdRestrictions!.size; // mosaicIdRestrictions
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            size += this.transactionTypeRestrictions!.size; // transactionTypeRestrictions
        }
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils.uint16ToBuffer(
            GeneratorUtils.fromFlags(AccountRestrictionFlagsDto, this.restrictionFlags),
        );
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto.ADDRESS) > -1) {
            const addressRestrictionsBytes = this.addressRestrictions!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, addressRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto.MOSAIC_ID) > -1) {
            const mosaicIdRestrictionsBytes = this.mosaicIdRestrictions!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlagsDto.TRANSACTION_TYPE) > -1) {
            const transactionTypeRestrictionsBytes = this.transactionTypeRestrictions!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, transactionTypeRestrictionsBytes);
        }
        return newArray;
    }
}

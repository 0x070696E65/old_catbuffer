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

import { AddressResolutionEntryBuilder } from './AddressResolutionEntryBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of AddressResolutionStatementBuilder.
 */
export interface AddressResolutionStatementBuilderParams extends ReceiptBuilderParams {
    /** Unresolved address. **/
    unresolved: UnresolvedAddressDto;
    /** Resolution entries. **/
    resolutionEntries: AddressResolutionEntryBuilder[];
}

/**
 * Binary layout for an address resolution statement
 **/
export class AddressResolutionStatementBuilder extends ReceiptBuilder implements Serializer {
    /** Unresolved address. **/
    public readonly unresolved: UnresolvedAddressDto;

    /** Resolution entries. **/
    public readonly resolutionEntries: AddressResolutionEntryBuilder[];

    /**
     * Constructor.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param unresolved Unresolved address.
     * @param resolutionEntries Resolution entries.
     */
    public constructor({ version, type, unresolved, resolutionEntries }: AddressResolutionStatementBuilderParams) {
        super({ version, type });
        GeneratorUtils.notNull(unresolved, 'unresolved is null or undefined');
        GeneratorUtils.notNull(resolutionEntries, 'resolutionEntries is null or undefined');
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressResolutionStatementBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const unresolved: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.size);
        const resolutionEntries: AddressResolutionEntryBuilder[] = GeneratorUtils.loadFromBinaryRemaining(
            AddressResolutionEntryBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            byteArray.length,
            0,
        );
        byteArray.splice(
            0,
            resolutionEntries.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0),
        );
        return new AddressResolutionStatementBuilder({
            version: superObject.version,
            type: superObject.type,
            unresolved: unresolved,
            resolutionEntries: resolutionEntries,
        });
    }

    /**
     * Creates an instance of AddressResolutionStatementBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param unresolved Unresolved address.
     * @param resolutionEntries Resolution entries.
     * @return Instance of AddressResolutionStatementBuilder.
     */
    public static createAddressResolutionStatementBuilder(
        version: number,
        type: ReceiptTypeDto,
        unresolved: UnresolvedAddressDto,
        resolutionEntries: AddressResolutionEntryBuilder[],
    ): AddressResolutionStatementBuilder {
        return new AddressResolutionStatementBuilder({
            version: version,
            type: type,
            unresolved: unresolved,
            resolutionEntries: resolutionEntries,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.unresolved.size; // unresolved
        size += this.resolutionEntries.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // resolutionEntries
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        const resolutionEntriesBytes = GeneratorUtils.writeList(this.resolutionEntries, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        return newArray;
    }
}

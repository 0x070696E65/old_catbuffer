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

import { GeneratorUtils } from './GeneratorUtils';
import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of AddressKeyValueBuilder.
 */
export interface AddressKeyValueBuilderParams {
    /** Key for value. **/
    key: MosaicRestrictionKeyDto;
    /** Value associated by key. **/
    value: bigint;
}

/**
 * Layout for mosaic address restriction key-value pair
 **/
export class AddressKeyValueBuilder implements Serializer {
    /** Key for value. **/
    public readonly key: MosaicRestrictionKeyDto;

    /** Value associated by key. **/
    public readonly value: bigint;

    /**
     * Constructor.
     *
     * @param key Key for value.
     * @param value Value associated by key.
     */
    public constructor({ key, value }: AddressKeyValueBuilderParams) {
        GeneratorUtils.notNull(key, 'key is null or undefined');
        GeneratorUtils.notNull(value, 'value is null or undefined');
        this.key = key;
        this.value = value;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressKeyValueBuilder {
        const byteArray = Array.from(payload);
        const key: MosaicRestrictionKeyDto = MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const value: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new AddressKeyValueBuilder({ key: key, value: value });
    }

    /**
     * Creates an instance of AddressKeyValueBuilder.
     *
     * @param key Key for value.
     * @param value Value associated by key.
     * @return Instance of AddressKeyValueBuilder.
     */
    public static createAddressKeyValueBuilder(key: MosaicRestrictionKeyDto, value: bigint): AddressKeyValueBuilder {
        return new AddressKeyValueBuilder({ key: key, value: value });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.key.size; // key
        size += 8; // value
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const valueBytes = GeneratorUtils.bigIntToBuffer(this.value);
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}

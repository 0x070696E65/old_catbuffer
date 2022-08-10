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

import { AddressKeyValueBuilder } from './AddressKeyValueBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of AddressKeyValueSetBuilder.
 */
export interface AddressKeyValueSetBuilderParams {
    /** Key value array. **/
    keys: AddressKeyValueBuilder[];
}

/**
 * Binary layout for mosaic address restriction key-value set
 **/
export class AddressKeyValueSetBuilder implements Serializer {
    /** Key value array. **/
    public readonly keys: AddressKeyValueBuilder[];

    /**
     * Constructor.
     *
     * @param keys Key value array.
     */
    public constructor({ keys }: AddressKeyValueSetBuilderParams) {
        GeneratorUtils.notNull(keys, 'keys is null or undefined');
        this.keys = keys;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressKeyValueSetBuilder {
        const byteArray = Array.from(payload);
        const keyValueCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const keys: AddressKeyValueBuilder[] = GeneratorUtils.loadFromBinary(
            AddressKeyValueBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            keyValueCount,
        );
        byteArray.splice(
            0,
            keys.reduce((sum, c) => sum + c.size, 0),
        );
        return new AddressKeyValueSetBuilder({ keys: keys });
    }

    /**
     * Creates an instance of AddressKeyValueSetBuilder.
     *
     * @param keys Key value array.
     * @return Instance of AddressKeyValueSetBuilder.
     */
    public static createAddressKeyValueSetBuilder(keys: AddressKeyValueBuilder[]): AddressKeyValueSetBuilder {
        return new AddressKeyValueSetBuilder({ keys: keys });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 1; // keyValueCount
        size += this.keys.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // keys
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const keyValueCountBytes = GeneratorUtils.uint8ToBuffer(this.keys.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, keyValueCountBytes);
        const keysBytes = GeneratorUtils.writeList(this.keys, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, keysBytes);
        return newArray;
    }
}

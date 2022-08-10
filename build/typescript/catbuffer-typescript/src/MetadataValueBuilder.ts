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
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of MetadataValueBuilder.
 */
export interface MetadataValueBuilderParams {
    /** Data of the value. **/
    data: Uint8Array;
}

/**
 * Binary layout of a metadata entry value
 **/
export class MetadataValueBuilder implements Serializer {
    /** Data of the value. **/
    public readonly data: Uint8Array;

    /**
     * Constructor.
     *
     * @param data Data of the value.
     */
    public constructor({ data }: MetadataValueBuilderParams) {
        GeneratorUtils.notNull(data, 'data is null or undefined');
        this.data = data;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MetadataValueBuilder {
        const byteArray = Array.from(payload);
        const size: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const data: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), size);
        byteArray.splice(0, size);
        return new MetadataValueBuilder({ data: data });
    }

    /**
     * Creates an instance of MetadataValueBuilder.
     *
     * @param data Data of the value.
     * @return Instance of MetadataValueBuilder.
     */
    public static createMetadataValueBuilder(data: Uint8Array): MetadataValueBuilder {
        return new MetadataValueBuilder({ data: data });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 2; // size
        size += this.data.length; // data
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils.uint16ToBuffer(this.data.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const dataBytes = this.data;
        newArray = GeneratorUtils.concatTypedArrays(newArray, dataBytes);
        return newArray;
    }
}

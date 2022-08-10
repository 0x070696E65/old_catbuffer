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
 *  Interface to create instances of ReceiptSourceBuilder.
 */
export interface ReceiptSourceBuilderParams {
    /** Transaction primary source (e.g. index within block). **/
    primaryId: number;
    /** Transaction secondary source (e.g. index within aggregate). **/
    secondaryId: number;
}

/**
 * Binary layout for receipt source
 **/
export class ReceiptSourceBuilder implements Serializer {
    /** Transaction primary source (e.g. index within block). **/
    public readonly primaryId: number;

    /** Transaction secondary source (e.g. index within aggregate). **/
    public readonly secondaryId: number;

    /**
     * Constructor.
     *
     * @param primaryId Transaction primary source (e.g. index within block).
     * @param secondaryId Transaction secondary source (e.g. index within aggregate).
     */
    public constructor({ primaryId, secondaryId }: ReceiptSourceBuilderParams) {
        GeneratorUtils.notNull(primaryId, 'primaryId is null or undefined');
        GeneratorUtils.notNull(secondaryId, 'secondaryId is null or undefined');
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ReceiptSourceBuilder {
        const byteArray = Array.from(payload);
        const primaryId: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const secondaryId: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new ReceiptSourceBuilder({ primaryId: primaryId, secondaryId: secondaryId });
    }

    /**
     * Creates an instance of ReceiptSourceBuilder.
     *
     * @param primaryId Transaction primary source (e.g. index within block).
     * @param secondaryId Transaction secondary source (e.g. index within aggregate).
     * @return Instance of ReceiptSourceBuilder.
     */
    public static createReceiptSourceBuilder(primaryId: number, secondaryId: number): ReceiptSourceBuilder {
        return new ReceiptSourceBuilder({ primaryId: primaryId, secondaryId: secondaryId });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 4; // primaryId
        size += 4; // secondaryId
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const primaryIdBytes = GeneratorUtils.uint32ToBuffer(this.primaryId);
        newArray = GeneratorUtils.concatTypedArrays(newArray, primaryIdBytes);
        const secondaryIdBytes = GeneratorUtils.uint32ToBuffer(this.secondaryId);
        newArray = GeneratorUtils.concatTypedArrays(newArray, secondaryIdBytes);
        return newArray;
    }
}

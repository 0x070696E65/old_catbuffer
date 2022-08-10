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
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of InflationReceiptBuilder.
 */
export interface InflationReceiptBuilderParams extends ReceiptBuilderParams {
    /** Mosaic. **/
    mosaic: MosaicBuilder;
}

/**
 * Binary layout for an inflation receipt
 **/
export class InflationReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Mosaic. **/
    public readonly mosaic: MosaicBuilder;

    /**
     * Constructor.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     */
    public constructor({ version, type, mosaic }: InflationReceiptBuilderParams) {
        super({ version, type });
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        this.mosaic = mosaic;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): InflationReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        return new InflationReceiptBuilder({ version: superObject.version, type: superObject.type, mosaic: mosaic });
    }

    /**
     * Creates an instance of InflationReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     * @return Instance of InflationReceiptBuilder.
     */
    public static createInflationReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder): InflationReceiptBuilder {
        return new InflationReceiptBuilder({ version: version, type: type, mosaic: mosaic });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaic.size; // mosaic
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
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}

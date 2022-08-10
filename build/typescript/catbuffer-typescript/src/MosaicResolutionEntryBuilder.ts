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
import { MosaicIdDto } from './MosaicIdDto';
import { ReceiptSourceBuilder } from './ReceiptSourceBuilder';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of MosaicResolutionEntryBuilder.
 */
export interface MosaicResolutionEntryBuilderParams {
    /** Source of resolution within block. **/
    source: ReceiptSourceBuilder;
    /** Resolved value. **/
    resolved: MosaicIdDto;
}

/**
 * Binary layout for mosaic resolution entry
 **/
export class MosaicResolutionEntryBuilder implements Serializer {
    /** Source of resolution within block. **/
    public readonly source: ReceiptSourceBuilder;

    /** Resolved value. **/
    public readonly resolved: MosaicIdDto;

    /**
     * Constructor.
     *
     * @param source Source of resolution within block.
     * @param resolved Resolved value.
     */
    public constructor({ source, resolved }: MosaicResolutionEntryBuilderParams) {
        GeneratorUtils.notNull(source, 'source is null or undefined');
        GeneratorUtils.notNull(resolved, 'resolved is null or undefined');
        this.source = source;
        this.resolved = resolved;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicResolutionEntryBuilder {
        const byteArray = Array.from(payload);
        const source: ReceiptSourceBuilder = ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.size);
        const resolved: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.size);
        return new MosaicResolutionEntryBuilder({ source: source, resolved: resolved });
    }

    /**
     * Creates an instance of MosaicResolutionEntryBuilder.
     *
     * @param source Source of resolution within block.
     * @param resolved Resolved value.
     * @return Instance of MosaicResolutionEntryBuilder.
     */
    public static createMosaicResolutionEntryBuilder(source: ReceiptSourceBuilder, resolved: MosaicIdDto): MosaicResolutionEntryBuilder {
        return new MosaicResolutionEntryBuilder({ source: source, resolved: resolved });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.source.size; // source
        size += this.resolved.size; // resolved
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sourceBytes = this.source.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        const resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    }
}

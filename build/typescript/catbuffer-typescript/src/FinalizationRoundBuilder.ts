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

import { FinalizationEpochDto } from './FinalizationEpochDto';
import { FinalizationPointDto } from './FinalizationPointDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of FinalizationRoundBuilder.
 */
export interface FinalizationRoundBuilderParams {
    /** Finalization epoch. **/
    epoch: FinalizationEpochDto;
    /** Finalization point. **/
    point: FinalizationPointDto;
}

/**
 * Binary layout for finalization round
 **/
export class FinalizationRoundBuilder implements Serializer {
    /** Finalization epoch. **/
    public readonly epoch: FinalizationEpochDto;

    /** Finalization point. **/
    public readonly point: FinalizationPointDto;

    /**
     * Constructor.
     *
     * @param epoch Finalization epoch.
     * @param point Finalization point.
     */
    public constructor({ epoch, point }: FinalizationRoundBuilderParams) {
        GeneratorUtils.notNull(epoch, 'epoch is null or undefined');
        GeneratorUtils.notNull(point, 'point is null or undefined');
        this.epoch = epoch;
        this.point = point;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): FinalizationRoundBuilder {
        const byteArray = Array.from(payload);
        const epoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, epoch.size);
        const point: FinalizationPointDto = FinalizationPointDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, point.size);
        return new FinalizationRoundBuilder({ epoch: epoch, point: point });
    }

    /**
     * Creates an instance of FinalizationRoundBuilder.
     *
     * @param epoch Finalization epoch.
     * @param point Finalization point.
     * @return Instance of FinalizationRoundBuilder.
     */
    public static createFinalizationRoundBuilder(epoch: FinalizationEpochDto, point: FinalizationPointDto): FinalizationRoundBuilder {
        return new FinalizationRoundBuilder({ epoch: epoch, point: point });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.epoch.size; // epoch
        size += this.point.size; // point
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const epochBytes = this.epoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, epochBytes);
        const pointBytes = this.point.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, pointBytes);
        return newArray;
    }
}

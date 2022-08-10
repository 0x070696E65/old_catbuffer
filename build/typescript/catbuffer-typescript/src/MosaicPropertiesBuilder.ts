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

import { BlockDurationDto } from './BlockDurationDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of MosaicPropertiesBuilder.
 */
export interface MosaicPropertiesBuilderParams {
    /** Mosaic flags. **/
    flags: MosaicFlagsDto[];
    /** Mosaic divisibility. **/
    divisibility: number;
    /** Mosaic duration. **/
    duration: BlockDurationDto;
}

/**
 * Binary layout for mosaic properties
 **/
export class MosaicPropertiesBuilder implements Serializer {
    /** Mosaic flags. **/
    public readonly flags: MosaicFlagsDto[];

    /** Mosaic divisibility. **/
    public readonly divisibility: number;

    /** Mosaic duration. **/
    public readonly duration: BlockDurationDto;

    /**
     * Constructor.
     *
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @param duration Mosaic duration.
     */
    public constructor({ flags, divisibility, duration }: MosaicPropertiesBuilderParams) {
        GeneratorUtils.notNull(flags, 'flags is null or undefined');
        GeneratorUtils.notNull(divisibility, 'divisibility is null or undefined');
        GeneratorUtils.notNull(duration, 'duration is null or undefined');
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicPropertiesBuilder {
        const byteArray = Array.from(payload);
        const flags: MosaicFlagsDto[] = GeneratorUtils.toFlags(MosaicFlagsDto, GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const duration: BlockDurationDto = BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        return new MosaicPropertiesBuilder({ flags: flags, divisibility: divisibility, duration: duration });
    }

    /**
     * Creates an instance of MosaicPropertiesBuilder.
     *
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @param duration Mosaic duration.
     * @return Instance of MosaicPropertiesBuilder.
     */
    public static createMosaicPropertiesBuilder(
        flags: MosaicFlagsDto[],
        divisibility: number,
        duration: BlockDurationDto,
    ): MosaicPropertiesBuilder {
        return new MosaicPropertiesBuilder({ flags: flags, divisibility: divisibility, duration: duration });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 1; // flags
        size += 1; // divisibility
        size += this.duration.size; // duration
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const flagsBytes = GeneratorUtils.uint8ToBuffer(GeneratorUtils.fromFlags(MosaicFlagsDto, this.flags));
        newArray = GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils.uint8ToBuffer(this.divisibility);
        newArray = GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        return newArray;
    }
}

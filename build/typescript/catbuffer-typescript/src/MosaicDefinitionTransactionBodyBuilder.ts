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
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of MosaicDefinitionTransactionBodyBuilder.
 */
export interface MosaicDefinitionTransactionBodyBuilderParams {
    /** Mosaic identifier. **/
    id: MosaicIdDto;
    /** Mosaic duration. **/
    duration: BlockDurationDto;
    /** Mosaic nonce. **/
    nonce: MosaicNonceDto;
    /** Mosaic flags. **/
    flags: MosaicFlagsDto[];
    /** Mosaic divisibility. **/
    divisibility: number;
}

/**
 * Binary layout for a mosaic definition transaction
 **/
export class MosaicDefinitionTransactionBodyBuilder implements Serializer {
    /** Mosaic identifier. **/
    public readonly id: MosaicIdDto;

    /** Mosaic duration. **/
    public readonly duration: BlockDurationDto;

    /** Mosaic nonce. **/
    public readonly nonce: MosaicNonceDto;

    /** Mosaic flags. **/
    public readonly flags: MosaicFlagsDto[];

    /** Mosaic divisibility. **/
    public readonly divisibility: number;

    /**
     * Constructor.
     *
     * @param id Mosaic identifier.
     * @param duration Mosaic duration.
     * @param nonce Mosaic nonce.
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     */
    public constructor({ id, duration, nonce, flags, divisibility }: MosaicDefinitionTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils.notNull(nonce, 'nonce is null or undefined');
        GeneratorUtils.notNull(flags, 'flags is null or undefined');
        GeneratorUtils.notNull(divisibility, 'divisibility is null or undefined');
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicDefinitionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const id: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const duration: BlockDurationDto = BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const nonce: MosaicNonceDto = MosaicNonceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.size);
        const flags: MosaicFlagsDto[] = GeneratorUtils.toFlags(MosaicFlagsDto, GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicDefinitionTransactionBodyBuilder({
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
        });
    }

    /**
     * Creates an instance of MosaicDefinitionTransactionBodyBuilder.
     *
     * @param id Mosaic identifier.
     * @param duration Mosaic duration.
     * @param nonce Mosaic nonce.
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @return Instance of MosaicDefinitionTransactionBodyBuilder.
     */
    public static createMosaicDefinitionTransactionBodyBuilder(
        id: MosaicIdDto,
        duration: BlockDurationDto,
        nonce: MosaicNonceDto,
        flags: MosaicFlagsDto[],
        divisibility: number,
    ): MosaicDefinitionTransactionBodyBuilder {
        return new MosaicDefinitionTransactionBodyBuilder({
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.id.size; // id
        size += this.duration.size; // duration
        size += this.nonce.size; // nonce
        size += 1; // flags
        size += 1; // divisibility
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const nonceBytes = this.nonce.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, nonceBytes);
        const flagsBytes = GeneratorUtils.uint8ToBuffer(GeneratorUtils.fromFlags(MosaicFlagsDto, this.flags));
        newArray = GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils.uint8ToBuffer(this.divisibility);
        newArray = GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    }
}

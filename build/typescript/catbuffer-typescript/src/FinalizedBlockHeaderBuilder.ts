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

import { FinalizationRoundBuilder } from './FinalizationRoundBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of FinalizedBlockHeaderBuilder.
 */
export interface FinalizedBlockHeaderBuilderParams {
    /** Finalization round. **/
    round: FinalizationRoundBuilder;
    /** Finalization height. **/
    height: HeightDto;
    /** Finalization hash. **/
    hash: Hash256Dto;
}

/**
 * Binary layout for finalized block header
 **/
export class FinalizedBlockHeaderBuilder implements Serializer {
    /** Finalization round. **/
    public readonly round: FinalizationRoundBuilder;

    /** Finalization height. **/
    public readonly height: HeightDto;

    /** Finalization hash. **/
    public readonly hash: Hash256Dto;

    /**
     * Constructor.
     *
     * @param round Finalization round.
     * @param height Finalization height.
     * @param hash Finalization hash.
     */
    public constructor({ round, height, hash }: FinalizedBlockHeaderBuilderParams) {
        GeneratorUtils.notNull(round, 'round is null or undefined');
        GeneratorUtils.notNull(height, 'height is null or undefined');
        GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.round = round;
        this.height = height;
        this.hash = hash;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): FinalizedBlockHeaderBuilder {
        const byteArray = Array.from(payload);
        const round: FinalizationRoundBuilder = FinalizationRoundBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, round.size);
        const height: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        const hash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new FinalizedBlockHeaderBuilder({ round: round, height: height, hash: hash });
    }

    /**
     * Creates an instance of FinalizedBlockHeaderBuilder.
     *
     * @param round Finalization round.
     * @param height Finalization height.
     * @param hash Finalization hash.
     * @return Instance of FinalizedBlockHeaderBuilder.
     */
    public static createFinalizedBlockHeaderBuilder(
        round: FinalizationRoundBuilder,
        height: HeightDto,
        hash: Hash256Dto,
    ): FinalizedBlockHeaderBuilder {
        return new FinalizedBlockHeaderBuilder({ round: round, height: height, hash: hash });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.round.size; // round
        size += this.height.size; // height
        size += this.hash.size; // hash
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const roundBytes = this.round.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, roundBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}

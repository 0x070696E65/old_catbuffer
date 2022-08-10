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
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 *  Interface to create instances of HashLockTransactionBodyBuilder.
 */
export interface HashLockTransactionBodyBuilderParams {
    /** Lock mosaic. **/
    mosaic: UnresolvedMosaicBuilder;
    /** Number of blocks for which a lock should be valid. **/
    duration: BlockDurationDto;
    /** Lock hash. **/
    hash: Hash256Dto;
}

/**
 * Binary layout for a hash lock transaction
 **/
export class HashLockTransactionBodyBuilder implements Serializer {
    /** Lock mosaic. **/
    public readonly mosaic: UnresolvedMosaicBuilder;

    /** Number of blocks for which a lock should be valid. **/
    public readonly duration: BlockDurationDto;

    /** Lock hash. **/
    public readonly hash: Hash256Dto;

    /**
     * Constructor.
     *
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     */
    public constructor({ mosaic, duration, hash }: HashLockTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = hash;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): HashLockTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const mosaic: UnresolvedMosaicBuilder = UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const duration: BlockDurationDto = BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const hash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new HashLockTransactionBodyBuilder({ mosaic: mosaic, duration: duration, hash: hash });
    }

    /**
     * Creates an instance of HashLockTransactionBodyBuilder.
     *
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     * @return Instance of HashLockTransactionBodyBuilder.
     */
    public static createHashLockTransactionBodyBuilder(
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hash: Hash256Dto,
    ): HashLockTransactionBodyBuilder {
        return new HashLockTransactionBodyBuilder({ mosaic: mosaic, duration: duration, hash: hash });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.mosaic.size; // mosaic
        size += this.duration.size; // duration
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
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}

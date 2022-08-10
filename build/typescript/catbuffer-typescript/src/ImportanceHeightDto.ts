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

/** Importance height. */
export class ImportanceHeightDto implements Serializer {
    /** Importance height. */
    public readonly importanceHeight: bigint;

    /**
     * Constructor.
     *
     * @param importanceHeight Importance height.
     */
    constructor(importanceHeight: bigint) {
        this.importanceHeight = importanceHeight;
    }

    /**
     * Creates an instance of ImportanceHeightDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of ImportanceHeightDto.
     */
    public static loadFromBinary(payload: Uint8Array): ImportanceHeightDto {
        const importanceHeight = GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new ImportanceHeightDto(importanceHeight);
    }

    /**
     * Creates an 'empty' instance of ImportanceHeightDto
     *
     * @return ImportanceHeightDto instance.
     */
    public static createEmpty(): ImportanceHeightDto {
        return new ImportanceHeightDto(BigInt(0));
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        return 8;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return GeneratorUtils.bigIntToBuffer(this.importanceHeight);
    }
}

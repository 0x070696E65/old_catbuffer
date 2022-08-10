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

/** Hash512. */
export class Hash512Dto implements Serializer {
    /** Hash512. */
    public readonly hash512: Uint8Array;

    /**
     * Constructor.
     *
     * @param hash512 Hash512.
     */
    constructor(hash512: Uint8Array) {
        this.hash512 = hash512;
    }

    /**
     * Creates an instance of Hash512Dto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of Hash512Dto.
     */
    public static loadFromBinary(payload: Uint8Array): Hash512Dto {
        const hash512 = GeneratorUtils.getBytes(Uint8Array.from(payload), 64);
        return new Hash512Dto(hash512);
    }

    /**
     * Creates an 'empty' instance of Hash512Dto
     *
     * @return Hash512Dto instance.
     */
    public static createEmpty(): Hash512Dto {
        return new Hash512Dto(Buffer.alloc(64));
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        return 64;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return this.hash512;
    }
}

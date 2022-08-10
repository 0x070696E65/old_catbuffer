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

/** Proof gamma. */
export class ProofGammaDto implements Serializer {
    /** Proof gamma. */
    public readonly proofGamma: Uint8Array;

    /**
     * Constructor.
     *
     * @param proofGamma Proof gamma.
     */
    constructor(proofGamma: Uint8Array) {
        this.proofGamma = proofGamma;
    }

    /**
     * Creates an instance of ProofGammaDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of ProofGammaDto.
     */
    public static loadFromBinary(payload: Uint8Array): ProofGammaDto {
        const proofGamma = GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new ProofGammaDto(proofGamma);
    }

    /**
     * Creates an 'empty' instance of ProofGammaDto
     *
     * @return ProofGammaDto instance.
     */
    public static createEmpty(): ProofGammaDto {
        return new ProofGammaDto(Buffer.alloc(32));
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        return 32;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return this.proofGamma;
    }
}

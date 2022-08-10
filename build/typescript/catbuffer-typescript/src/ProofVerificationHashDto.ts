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

/** Proof verification hash. */
export class ProofVerificationHashDto implements Serializer {
    /** Proof verification hash. */
    public readonly proofVerificationHash: Uint8Array;

    /**
     * Constructor.
     *
     * @param proofVerificationHash Proof verification hash.
     */
    constructor(proofVerificationHash: Uint8Array) {
        this.proofVerificationHash = proofVerificationHash;
    }

    /**
     * Creates an instance of ProofVerificationHashDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of ProofVerificationHashDto.
     */
    public static loadFromBinary(payload: Uint8Array): ProofVerificationHashDto {
        const proofVerificationHash = GeneratorUtils.getBytes(Uint8Array.from(payload), 16);
        return new ProofVerificationHashDto(proofVerificationHash);
    }

    /**
     * Creates an 'empty' instance of ProofVerificationHashDto
     *
     * @return ProofVerificationHashDto instance.
     */
    public static createEmpty(): ProofVerificationHashDto {
        return new ProofVerificationHashDto(Buffer.alloc(16));
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        return 16;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return this.proofVerificationHash;
    }
}

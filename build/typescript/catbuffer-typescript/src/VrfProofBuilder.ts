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
import { ProofGammaDto } from './ProofGammaDto';
import { ProofScalarDto } from './ProofScalarDto';
import { ProofVerificationHashDto } from './ProofVerificationHashDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of VrfProofBuilder.
 */
export interface VrfProofBuilderParams {
    /** Gamma. **/
    gamma: ProofGammaDto;
    /** Verification hash. **/
    verificationHash: ProofVerificationHashDto;
    /** Scalar. **/
    scalar: ProofScalarDto;
}

/**
 * Verfiable random function proof
 **/
export class VrfProofBuilder implements Serializer {
    /** Gamma. **/
    public readonly gamma: ProofGammaDto;

    /** Verification hash. **/
    public readonly verificationHash: ProofVerificationHashDto;

    /** Scalar. **/
    public readonly scalar: ProofScalarDto;

    /**
     * Constructor.
     *
     * @param gamma Gamma.
     * @param verificationHash Verification hash.
     * @param scalar Scalar.
     */
    public constructor({ gamma, verificationHash, scalar }: VrfProofBuilderParams) {
        GeneratorUtils.notNull(gamma, 'gamma is null or undefined');
        GeneratorUtils.notNull(verificationHash, 'verificationHash is null or undefined');
        GeneratorUtils.notNull(scalar, 'scalar is null or undefined');
        this.gamma = gamma;
        this.verificationHash = verificationHash;
        this.scalar = scalar;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): VrfProofBuilder {
        const byteArray = Array.from(payload);
        const gamma: ProofGammaDto = ProofGammaDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, gamma.size);
        const verificationHash: ProofVerificationHashDto = ProofVerificationHashDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, verificationHash.size);
        const scalar: ProofScalarDto = ProofScalarDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scalar.size);
        return new VrfProofBuilder({ gamma: gamma, verificationHash: verificationHash, scalar: scalar });
    }

    /**
     * Creates an instance of VrfProofBuilder.
     *
     * @param gamma Gamma.
     * @param verificationHash Verification hash.
     * @param scalar Scalar.
     * @return Instance of VrfProofBuilder.
     */
    public static createVrfProofBuilder(
        gamma: ProofGammaDto,
        verificationHash: ProofVerificationHashDto,
        scalar: ProofScalarDto,
    ): VrfProofBuilder {
        return new VrfProofBuilder({ gamma: gamma, verificationHash: verificationHash, scalar: scalar });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.gamma.size; // gamma
        size += this.verificationHash.size; // verificationHash
        size += this.scalar.size; // scalar
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const gammaBytes = this.gamma.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, gammaBytes);
        const verificationHashBytes = this.verificationHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, verificationHashBytes);
        const scalarBytes = this.scalar.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, scalarBytes);
        return newArray;
    }
}

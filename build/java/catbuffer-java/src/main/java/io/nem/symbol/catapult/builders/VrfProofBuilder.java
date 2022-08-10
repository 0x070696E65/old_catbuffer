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

package io.nem.symbol.catapult.builders;

import java.io.DataInputStream;
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;

/**
* Verfiable random function proof
**/
public class VrfProofBuilder implements Serializer {

    /** Gamma. **/
    private final ProofGammaDto gamma;

    /** Verification hash. **/
    private final ProofVerificationHashDto verificationHash;

    /** Scalar. **/
    private final ProofScalarDto scalar;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected VrfProofBuilder(DataInputStream stream) {
        try {
            this.gamma = ProofGammaDto.loadFromBinary(stream);
            this.verificationHash = ProofVerificationHashDto.loadFromBinary(stream);
            this.scalar = ProofScalarDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of VrfProofBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of VrfProofBuilder.
     */
    public static VrfProofBuilder loadFromBinary(DataInputStream stream) {
        return new VrfProofBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param gamma Gamma.
    * @param verificationHash Verification hash.
    * @param scalar Scalar.
    */
    protected VrfProofBuilder(ProofGammaDto gamma, ProofVerificationHashDto verificationHash, ProofScalarDto scalar) {
        GeneratorUtils.notNull(gamma, "gamma is null");
        GeneratorUtils.notNull(verificationHash, "verificationHash is null");
        GeneratorUtils.notNull(scalar, "scalar is null");
        this.gamma = gamma;
        this.verificationHash = verificationHash;
        this.scalar = scalar;
    }
    
    /**
     * Creates an instance of VrfProofBuilder.
     *
     * @param gamma Gamma.
     * @param verificationHash Verification hash.
     * @param scalar Scalar.
     * @return Instance of VrfProofBuilder.
     */
    public static VrfProofBuilder create(ProofGammaDto gamma, ProofVerificationHashDto verificationHash, ProofScalarDto scalar) {
        return new VrfProofBuilder(gamma, verificationHash, scalar);
    }

    /**
     * Gets gamma.
     *
     * @return Gamma.
     */
    public ProofGammaDto getGamma() {
        return this.gamma;
    }

    /**
     * Gets verification hash.
     *
     * @return Verification hash.
     */
    public ProofVerificationHashDto getVerificationHash() {
        return this.verificationHash;
    }

    /**
     * Gets scalar.
     *
     * @return Scalar.
     */
    public ProofScalarDto getScalar() {
        return this.scalar;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.gamma.getSize();
        size += this.verificationHash.getSize();
        size += this.scalar.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.gamma);
            GeneratorUtils.writeEntity(dataOutputStream, this.verificationHash);
            GeneratorUtils.writeEntity(dataOutputStream, this.scalar);
        });
    }
}


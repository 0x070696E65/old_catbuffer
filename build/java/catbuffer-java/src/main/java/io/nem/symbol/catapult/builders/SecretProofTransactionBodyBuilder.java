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
* Binary layout for a secret proof transaction
**/
public class SecretProofTransactionBodyBuilder implements Serializer {

    /** Locked mosaic recipient address. **/
    private final UnresolvedAddressDto recipientAddress;

    /** Secret. **/
    private final Hash256Dto secret;

    /** Hash algorithm. **/
    private final LockHashAlgorithmDto hashAlgorithm;

    /** Proof data. **/
    private final ByteBuffer proof;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected SecretProofTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.recipientAddress = UnresolvedAddressDto.loadFromBinary(stream);
            this.secret = Hash256Dto.loadFromBinary(stream);
            final short proofSize = Short.reverseBytes(stream.readShort());
            this.hashAlgorithm = LockHashAlgorithmDto.loadFromBinary(stream);
            this.proof = GeneratorUtils.readByteBuffer(stream, proofSize);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of SecretProofTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of SecretProofTransactionBodyBuilder.
     */
    public static SecretProofTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new SecretProofTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param recipientAddress Locked mosaic recipient address.
    * @param secret Secret.
    * @param hashAlgorithm Hash algorithm.
    * @param proof Proof data.
    */
    protected SecretProofTransactionBodyBuilder(UnresolvedAddressDto recipientAddress, Hash256Dto secret, LockHashAlgorithmDto hashAlgorithm, ByteBuffer proof) {
        GeneratorUtils.notNull(recipientAddress, "recipientAddress is null");
        GeneratorUtils.notNull(secret, "secret is null");
        GeneratorUtils.notNull(hashAlgorithm, "hashAlgorithm is null");
        GeneratorUtils.notNull(proof, "proof is null");
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.proof = proof;
    }
    
    /**
     * Creates an instance of SecretProofTransactionBodyBuilder.
     *
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param hashAlgorithm Hash algorithm.
     * @param proof Proof data.
     * @return Instance of SecretProofTransactionBodyBuilder.
     */
    public static SecretProofTransactionBodyBuilder create(UnresolvedAddressDto recipientAddress, Hash256Dto secret, LockHashAlgorithmDto hashAlgorithm, ByteBuffer proof) {
        return new SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }

    /**
     * Gets locked mosaic recipient address.
     *
     * @return Locked mosaic recipient address.
     */
    public UnresolvedAddressDto getRecipientAddress() {
        return this.recipientAddress;
    }

    /**
     * Gets secret.
     *
     * @return Secret.
     */
    public Hash256Dto getSecret() {
        return this.secret;
    }

    /**
     * Gets hash algorithm.
     *
     * @return Hash algorithm.
     */
    public LockHashAlgorithmDto getHashAlgorithm() {
        return this.hashAlgorithm;
    }

    /**
     * Gets proof data.
     *
     * @return Proof data.
     */
    public ByteBuffer getProof() {
        return this.proof;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.recipientAddress.getSize();
        size += this.secret.getSize();
        size += 2; // proofSize
        size += this.hashAlgorithm.getSize();
        size += this.proof.array().length;
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.recipientAddress);
            GeneratorUtils.writeEntity(dataOutputStream, this.secret);
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.getSize(this.getProof())));
            GeneratorUtils.writeEntity(dataOutputStream, this.hashAlgorithm);
            dataOutputStream.write(this.proof.array(), 0, this.proof.array().length);
        });
    }
}


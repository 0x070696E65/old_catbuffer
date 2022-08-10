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
* Binary layout for a non-embedded secret proof transaction
**/
public class SecretProofTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Secret proof transaction body. **/
    private final SecretProofTransactionBodyBuilder secretProofTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected SecretProofTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.secretProofTransactionBody = SecretProofTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of SecretProofTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of SecretProofTransactionBuilder.
     */
    public static SecretProofTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new SecretProofTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signature Entity signature.
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param fee Transaction fee.
    * @param deadline Transaction deadline.
    * @param recipientAddress Locked mosaic recipient address.
    * @param secret Secret.
    * @param hashAlgorithm Hash algorithm.
    * @param proof Proof data.
    */
    protected SecretProofTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto recipientAddress, Hash256Dto secret, LockHashAlgorithmDto hashAlgorithm, ByteBuffer proof) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(recipientAddress, "recipientAddress is null");
        GeneratorUtils.notNull(secret, "secret is null");
        GeneratorUtils.notNull(hashAlgorithm, "hashAlgorithm is null");
        GeneratorUtils.notNull(proof, "proof is null");
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }
    
    /**
     * Creates an instance of SecretProofTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param hashAlgorithm Hash algorithm.
     * @param proof Proof data.
     * @return Instance of SecretProofTransactionBuilder.
     */
    public static SecretProofTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto recipientAddress, Hash256Dto secret, LockHashAlgorithmDto hashAlgorithm, ByteBuffer proof) {
        return new SecretProofTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof);
    }

    /**
     * Gets locked mosaic recipient address.
     *
     * @return Locked mosaic recipient address.
     */
    public UnresolvedAddressDto getRecipientAddress() {
        return this.secretProofTransactionBody.getRecipientAddress();
    }

    /**
     * Gets secret.
     *
     * @return Secret.
     */
    public Hash256Dto getSecret() {
        return this.secretProofTransactionBody.getSecret();
    }

    /**
     * Gets hash algorithm.
     *
     * @return Hash algorithm.
     */
    public LockHashAlgorithmDto getHashAlgorithm() {
        return this.secretProofTransactionBody.getHashAlgorithm();
    }

    /**
     * Gets proof data.
     *
     * @return Proof data.
     */
    public ByteBuffer getProof() {
        return this.secretProofTransactionBody.getProof();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.secretProofTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public SecretProofTransactionBodyBuilder getBody() {
        return this.secretProofTransactionBody;
    }


    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            final byte[] superBytes = super.serialize();
            dataOutputStream.write(superBytes, 0, superBytes.length);
            GeneratorUtils.writeEntity(dataOutputStream, this.secretProofTransactionBody);
        });
    }
}


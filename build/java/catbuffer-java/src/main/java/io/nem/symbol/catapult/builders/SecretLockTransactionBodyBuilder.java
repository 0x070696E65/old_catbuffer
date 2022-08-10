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
* Binary layout for a secret lock transaction
**/
public class SecretLockTransactionBodyBuilder implements Serializer {

    /** Locked mosaic recipient address. **/
    private final UnresolvedAddressDto recipientAddress;

    /** Secret. **/
    private final Hash256Dto secret;

    /** Locked mosaic. **/
    private final UnresolvedMosaicBuilder mosaic;

    /** Number of blocks for which a lock should be valid. **/
    private final BlockDurationDto duration;

    /** Hash algorithm. **/
    private final LockHashAlgorithmDto hashAlgorithm;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected SecretLockTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.recipientAddress = UnresolvedAddressDto.loadFromBinary(stream);
            this.secret = Hash256Dto.loadFromBinary(stream);
            this.mosaic = UnresolvedMosaicBuilder.loadFromBinary(stream);
            this.duration = BlockDurationDto.loadFromBinary(stream);
            this.hashAlgorithm = LockHashAlgorithmDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of SecretLockTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of SecretLockTransactionBodyBuilder.
     */
    public static SecretLockTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new SecretLockTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param recipientAddress Locked mosaic recipient address.
    * @param secret Secret.
    * @param mosaic Locked mosaic.
    * @param duration Number of blocks for which a lock should be valid.
    * @param hashAlgorithm Hash algorithm.
    */
    protected SecretLockTransactionBodyBuilder(UnresolvedAddressDto recipientAddress, Hash256Dto secret, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, LockHashAlgorithmDto hashAlgorithm) {
        GeneratorUtils.notNull(recipientAddress, "recipientAddress is null");
        GeneratorUtils.notNull(secret, "secret is null");
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(duration, "duration is null");
        GeneratorUtils.notNull(hashAlgorithm, "hashAlgorithm is null");
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.mosaic = mosaic;
        this.duration = duration;
        this.hashAlgorithm = hashAlgorithm;
    }
    
    /**
     * Creates an instance of SecretLockTransactionBodyBuilder.
     *
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param mosaic Locked mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hashAlgorithm Hash algorithm.
     * @return Instance of SecretLockTransactionBodyBuilder.
     */
    public static SecretLockTransactionBodyBuilder create(UnresolvedAddressDto recipientAddress, Hash256Dto secret, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, LockHashAlgorithmDto hashAlgorithm) {
        return new SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
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
     * Gets locked mosaic.
     *
     * @return Locked mosaic.
     */
    public UnresolvedMosaicBuilder getMosaic() {
        return this.mosaic;
    }

    /**
     * Gets number of blocks for which a lock should be valid.
     *
     * @return Number of blocks for which a lock should be valid.
     */
    public BlockDurationDto getDuration() {
        return this.duration;
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
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.recipientAddress.getSize();
        size += this.secret.getSize();
        size += this.mosaic.getSize();
        size += this.duration.getSize();
        size += this.hashAlgorithm.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaic);
            GeneratorUtils.writeEntity(dataOutputStream, this.duration);
            GeneratorUtils.writeEntity(dataOutputStream, this.hashAlgorithm);
        });
    }
}


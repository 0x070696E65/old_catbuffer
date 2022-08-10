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
* Binary layout for serialized lock transaction
**/
public class SecretLockInfoBuilder extends StateHeaderBuilder implements Serializer {

    /** Owner address. **/
    private final AddressDto ownerAddress;

    /** Mosaic associated with lock. **/
    private final MosaicBuilder mosaic;

    /** Height at which the lock expires. **/
    private final HeightDto endHeight;

    /** Flag indicating whether or not the lock was already used. **/
    private final LockStatusDto status;

    /** Hash algorithm. **/
    private final LockHashAlgorithmDto hashAlgorithm;

    /** Transaction secret. **/
    private final Hash256Dto secret;

    /** Transaction recipient. **/
    private final AddressDto recipient;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected SecretLockInfoBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.ownerAddress = AddressDto.loadFromBinary(stream);
            this.mosaic = MosaicBuilder.loadFromBinary(stream);
            this.endHeight = HeightDto.loadFromBinary(stream);
            this.status = LockStatusDto.loadFromBinary(stream);
            this.hashAlgorithm = LockHashAlgorithmDto.loadFromBinary(stream);
            this.secret = Hash256Dto.loadFromBinary(stream);
            this.recipient = AddressDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of SecretLockInfoBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of SecretLockInfoBuilder.
     */
    public static SecretLockInfoBuilder loadFromBinary(DataInputStream stream) {
        return new SecretLockInfoBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param ownerAddress Owner address.
    * @param mosaic Mosaic associated with lock.
    * @param endHeight Height at which the lock expires.
    * @param status Flag indicating whether or not the lock was already used.
    * @param hashAlgorithm Hash algorithm.
    * @param secret Transaction secret.
    * @param recipient Transaction recipient.
    */
    protected SecretLockInfoBuilder(short version, AddressDto ownerAddress, MosaicBuilder mosaic, HeightDto endHeight, LockStatusDto status, LockHashAlgorithmDto hashAlgorithm, Hash256Dto secret, AddressDto recipient) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(ownerAddress, "ownerAddress is null");
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(endHeight, "endHeight is null");
        GeneratorUtils.notNull(status, "status is null");
        GeneratorUtils.notNull(hashAlgorithm, "hashAlgorithm is null");
        GeneratorUtils.notNull(secret, "secret is null");
        GeneratorUtils.notNull(recipient, "recipient is null");
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipient = recipient;
    }
    
    /**
     * Creates an instance of SecretLockInfoBuilder.
     *
     * @param version Serialization version.
     * @param ownerAddress Owner address.
     * @param mosaic Mosaic associated with lock.
     * @param endHeight Height at which the lock expires.
     * @param status Flag indicating whether or not the lock was already used.
     * @param hashAlgorithm Hash algorithm.
     * @param secret Transaction secret.
     * @param recipient Transaction recipient.
     * @return Instance of SecretLockInfoBuilder.
     */
    public static SecretLockInfoBuilder create(short version, AddressDto ownerAddress, MosaicBuilder mosaic, HeightDto endHeight, LockStatusDto status, LockHashAlgorithmDto hashAlgorithm, Hash256Dto secret, AddressDto recipient) {
        return new SecretLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient);
    }

    /**
     * Gets owner address.
     *
     * @return Owner address.
     */
    public AddressDto getOwnerAddress() {
        return this.ownerAddress;
    }

    /**
     * Gets mosaic associated with lock.
     *
     * @return Mosaic associated with lock.
     */
    public MosaicBuilder getMosaic() {
        return this.mosaic;
    }

    /**
     * Gets height at which the lock expires.
     *
     * @return Height at which the lock expires.
     */
    public HeightDto getEndHeight() {
        return this.endHeight;
    }

    /**
     * Gets flag indicating whether or not the lock was already used.
     *
     * @return Flag indicating whether or not the lock was already used.
     */
    public LockStatusDto getStatus() {
        return this.status;
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
     * Gets transaction secret.
     *
     * @return Transaction secret.
     */
    public Hash256Dto getSecret() {
        return this.secret;
    }

    /**
     * Gets transaction recipient.
     *
     * @return Transaction recipient.
     */
    public AddressDto getRecipient() {
        return this.recipient;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.ownerAddress.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += this.status.getSize();
        size += this.hashAlgorithm.getSize();
        size += this.secret.getSize();
        size += this.recipient.getSize();
        return size;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.ownerAddress);
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaic);
            GeneratorUtils.writeEntity(dataOutputStream, this.endHeight);
            GeneratorUtils.writeEntity(dataOutputStream, this.status);
            GeneratorUtils.writeEntity(dataOutputStream, this.hashAlgorithm);
            GeneratorUtils.writeEntity(dataOutputStream, this.secret);
            GeneratorUtils.writeEntity(dataOutputStream, this.recipient);
        });
    }
}


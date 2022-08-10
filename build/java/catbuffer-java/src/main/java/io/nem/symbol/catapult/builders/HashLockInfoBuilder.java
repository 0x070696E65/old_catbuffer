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
* Binary layout for hash lock transaction info
**/
public class HashLockInfoBuilder extends StateHeaderBuilder implements Serializer {

    /** Owner address. **/
    private final AddressDto ownerAddress;

    /** Mosaic associated with lock. **/
    private final MosaicBuilder mosaic;

    /** Height at which the lock expires. **/
    private final HeightDto endHeight;

    /** Flag indicating whether or not the lock was already used. **/
    private final LockStatusDto status;

    /** Hash. **/
    private final Hash256Dto hash;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected HashLockInfoBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.ownerAddress = AddressDto.loadFromBinary(stream);
            this.mosaic = MosaicBuilder.loadFromBinary(stream);
            this.endHeight = HeightDto.loadFromBinary(stream);
            this.status = LockStatusDto.loadFromBinary(stream);
            this.hash = Hash256Dto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of HashLockInfoBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of HashLockInfoBuilder.
     */
    public static HashLockInfoBuilder loadFromBinary(DataInputStream stream) {
        return new HashLockInfoBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param ownerAddress Owner address.
    * @param mosaic Mosaic associated with lock.
    * @param endHeight Height at which the lock expires.
    * @param status Flag indicating whether or not the lock was already used.
    * @param hash Hash.
    */
    protected HashLockInfoBuilder(short version, AddressDto ownerAddress, MosaicBuilder mosaic, HeightDto endHeight, LockStatusDto status, Hash256Dto hash) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(ownerAddress, "ownerAddress is null");
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(endHeight, "endHeight is null");
        GeneratorUtils.notNull(status, "status is null");
        GeneratorUtils.notNull(hash, "hash is null");
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hash = hash;
    }
    
    /**
     * Creates an instance of HashLockInfoBuilder.
     *
     * @param version Serialization version.
     * @param ownerAddress Owner address.
     * @param mosaic Mosaic associated with lock.
     * @param endHeight Height at which the lock expires.
     * @param status Flag indicating whether or not the lock was already used.
     * @param hash Hash.
     * @return Instance of HashLockInfoBuilder.
     */
    public static HashLockInfoBuilder create(short version, AddressDto ownerAddress, MosaicBuilder mosaic, HeightDto endHeight, LockStatusDto status, Hash256Dto hash) {
        return new HashLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hash);
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
     * Gets hash.
     *
     * @return Hash.
     */
    public Hash256Dto getHash() {
        return this.hash;
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
        size += this.hash.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.hash);
        });
    }
}


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
* Binary layout for a mosaic address restriction transaction
**/
public class MosaicAddressRestrictionTransactionBodyBuilder implements Serializer {

    /** Identifier of the mosaic to which the restriction applies. **/
    private final UnresolvedMosaicIdDto mosaicId;

    /** Restriction key. **/
    private final long restrictionKey;

    /** Previous restriction value. **/
    private final long previousRestrictionValue;

    /** New restriction value. **/
    private final long newRestrictionValue;

    /** Address being restricted. **/
    private final UnresolvedAddressDto targetAddress;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicAddressRestrictionTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.mosaicId = UnresolvedMosaicIdDto.loadFromBinary(stream);
            this.restrictionKey = Long.reverseBytes(stream.readLong());
            this.previousRestrictionValue = Long.reverseBytes(stream.readLong());
            this.newRestrictionValue = Long.reverseBytes(stream.readLong());
            this.targetAddress = UnresolvedAddressDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicAddressRestrictionTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicAddressRestrictionTransactionBodyBuilder.
     */
    public static MosaicAddressRestrictionTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicAddressRestrictionTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param mosaicId Identifier of the mosaic to which the restriction applies.
    * @param restrictionKey Restriction key.
    * @param previousRestrictionValue Previous restriction value.
    * @param newRestrictionValue New restriction value.
    * @param targetAddress Address being restricted.
    */
    protected MosaicAddressRestrictionTransactionBodyBuilder(UnresolvedMosaicIdDto mosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, UnresolvedAddressDto targetAddress) {
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(restrictionKey, "restrictionKey is null");
        GeneratorUtils.notNull(previousRestrictionValue, "previousRestrictionValue is null");
        GeneratorUtils.notNull(newRestrictionValue, "newRestrictionValue is null");
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }
    
    /**
     * Creates an instance of MosaicAddressRestrictionTransactionBodyBuilder.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey Restriction key.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param targetAddress Address being restricted.
     * @return Instance of MosaicAddressRestrictionTransactionBodyBuilder.
     */
    public static MosaicAddressRestrictionTransactionBodyBuilder create(UnresolvedMosaicIdDto mosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, UnresolvedAddressDto targetAddress) {
        return new MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }

    /**
     * Gets identifier of the mosaic to which the restriction applies.
     *
     * @return Identifier of the mosaic to which the restriction applies.
     */
    public UnresolvedMosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets restriction key.
     *
     * @return Restriction key.
     */
    public long getRestrictionKey() {
        return this.restrictionKey;
    }

    /**
     * Gets previous restriction value.
     *
     * @return Previous restriction value.
     */
    public long getPreviousRestrictionValue() {
        return this.previousRestrictionValue;
    }

    /**
     * Gets new restriction value.
     *
     * @return New restriction value.
     */
    public long getNewRestrictionValue() {
        return this.newRestrictionValue;
    }

    /**
     * Gets address being restricted.
     *
     * @return Address being restricted.
     */
    public UnresolvedAddressDto getTargetAddress() {
        return this.targetAddress;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.mosaicId.getSize();
        size += 8; // restrictionKey
        size += 8; // previousRestrictionValue
        size += 8; // newRestrictionValue
        size += this.targetAddress.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicId);
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getRestrictionKey()));
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getPreviousRestrictionValue()));
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getNewRestrictionValue()));
            GeneratorUtils.writeEntity(dataOutputStream, this.targetAddress);
        });
    }
}


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
* Binary layout for a mosaic global restriction transaction
**/
public class MosaicGlobalRestrictionTransactionBodyBuilder implements Serializer {

    /** Identifier of the mosaic being restricted. **/
    private final UnresolvedMosaicIdDto mosaicId;

    /** Identifier of the mosaic providing the restriction key. **/
    private final UnresolvedMosaicIdDto referenceMosaicId;

    /** Restriction key relative to the reference mosaic identifier. **/
    private final long restrictionKey;

    /** Previous restriction value. **/
    private final long previousRestrictionValue;

    /** New restriction value. **/
    private final long newRestrictionValue;

    /** Previous restriction type. **/
    private final MosaicRestrictionTypeDto previousRestrictionType;

    /** New restriction type. **/
    private final MosaicRestrictionTypeDto newRestrictionType;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicGlobalRestrictionTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.mosaicId = UnresolvedMosaicIdDto.loadFromBinary(stream);
            this.referenceMosaicId = UnresolvedMosaicIdDto.loadFromBinary(stream);
            this.restrictionKey = Long.reverseBytes(stream.readLong());
            this.previousRestrictionValue = Long.reverseBytes(stream.readLong());
            this.newRestrictionValue = Long.reverseBytes(stream.readLong());
            this.previousRestrictionType = MosaicRestrictionTypeDto.loadFromBinary(stream);
            this.newRestrictionType = MosaicRestrictionTypeDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicGlobalRestrictionTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     */
    public static MosaicGlobalRestrictionTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicGlobalRestrictionTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param mosaicId Identifier of the mosaic being restricted.
    * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
    * @param restrictionKey Restriction key relative to the reference mosaic identifier.
    * @param previousRestrictionValue Previous restriction value.
    * @param newRestrictionValue New restriction value.
    * @param previousRestrictionType Previous restriction type.
    * @param newRestrictionType New restriction type.
    */
    protected MosaicGlobalRestrictionTransactionBodyBuilder(UnresolvedMosaicIdDto mosaicId, UnresolvedMosaicIdDto referenceMosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, MosaicRestrictionTypeDto previousRestrictionType, MosaicRestrictionTypeDto newRestrictionType) {
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(referenceMosaicId, "referenceMosaicId is null");
        GeneratorUtils.notNull(restrictionKey, "restrictionKey is null");
        GeneratorUtils.notNull(previousRestrictionValue, "previousRestrictionValue is null");
        GeneratorUtils.notNull(newRestrictionValue, "newRestrictionValue is null");
        GeneratorUtils.notNull(previousRestrictionType, "previousRestrictionType is null");
        GeneratorUtils.notNull(newRestrictionType, "newRestrictionType is null");
        this.mosaicId = mosaicId;
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionType = newRestrictionType;
    }
    
    /**
     * Creates an instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     *
     * @param mosaicId Identifier of the mosaic being restricted.
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionKey Restriction key relative to the reference mosaic identifier.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param previousRestrictionType Previous restriction type.
     * @param newRestrictionType New restriction type.
     * @return Instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     */
    public static MosaicGlobalRestrictionTransactionBodyBuilder create(UnresolvedMosaicIdDto mosaicId, UnresolvedMosaicIdDto referenceMosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, MosaicRestrictionTypeDto previousRestrictionType, MosaicRestrictionTypeDto newRestrictionType) {
        return new MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }

    /**
     * Gets identifier of the mosaic being restricted.
     *
     * @return Identifier of the mosaic being restricted.
     */
    public UnresolvedMosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets identifier of the mosaic providing the restriction key.
     *
     * @return Identifier of the mosaic providing the restriction key.
     */
    public UnresolvedMosaicIdDto getReferenceMosaicId() {
        return this.referenceMosaicId;
    }

    /**
     * Gets restriction key relative to the reference mosaic identifier.
     *
     * @return Restriction key relative to the reference mosaic identifier.
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
     * Gets previous restriction type.
     *
     * @return Previous restriction type.
     */
    public MosaicRestrictionTypeDto getPreviousRestrictionType() {
        return this.previousRestrictionType;
    }

    /**
     * Gets new restriction type.
     *
     * @return New restriction type.
     */
    public MosaicRestrictionTypeDto getNewRestrictionType() {
        return this.newRestrictionType;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.mosaicId.getSize();
        size += this.referenceMosaicId.getSize();
        size += 8; // restrictionKey
        size += 8; // previousRestrictionValue
        size += 8; // newRestrictionValue
        size += this.previousRestrictionType.getSize();
        size += this.newRestrictionType.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.referenceMosaicId);
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getRestrictionKey()));
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getPreviousRestrictionValue()));
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getNewRestrictionValue()));
            GeneratorUtils.writeEntity(dataOutputStream, this.previousRestrictionType);
            GeneratorUtils.writeEntity(dataOutputStream, this.newRestrictionType);
        });
    }
}


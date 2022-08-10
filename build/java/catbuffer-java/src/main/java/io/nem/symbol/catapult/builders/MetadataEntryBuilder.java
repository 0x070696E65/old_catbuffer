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
* Binary layout of a metadata entry
**/
public class MetadataEntryBuilder extends StateHeaderBuilder implements Serializer {

    /** Metadata source address (provider). **/
    private final AddressDto sourceAddress;

    /** Metadata target address. **/
    private final AddressDto targetAddress;

    /** Metadata key scoped to source, target and type. **/
    private final ScopedMetadataKeyDto scopedMetadataKey;

    /** Target id. **/
    private final long targetId;

    /** Metadata type. **/
    private final MetadataTypeDto metadataType;

    /** Value. **/
    private final MetadataValueBuilder value;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MetadataEntryBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.sourceAddress = AddressDto.loadFromBinary(stream);
            this.targetAddress = AddressDto.loadFromBinary(stream);
            this.scopedMetadataKey = ScopedMetadataKeyDto.loadFromBinary(stream);
            this.targetId = Long.reverseBytes(stream.readLong());
            this.metadataType = MetadataTypeDto.loadFromBinary(stream);
            this.value = MetadataValueBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MetadataEntryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MetadataEntryBuilder.
     */
    public static MetadataEntryBuilder loadFromBinary(DataInputStream stream) {
        return new MetadataEntryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param sourceAddress Metadata source address (provider).
    * @param targetAddress Metadata target address.
    * @param scopedMetadataKey Metadata key scoped to source, target and type.
    * @param targetId Target id.
    * @param metadataType Metadata type.
    * @param value Value.
    */
    protected MetadataEntryBuilder(short version, AddressDto sourceAddress, AddressDto targetAddress, ScopedMetadataKeyDto scopedMetadataKey, long targetId, MetadataTypeDto metadataType, MetadataValueBuilder value) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(sourceAddress, "sourceAddress is null");
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        GeneratorUtils.notNull(scopedMetadataKey, "scopedMetadataKey is null");
        GeneratorUtils.notNull(targetId, "targetId is null");
        GeneratorUtils.notNull(metadataType, "metadataType is null");
        GeneratorUtils.notNull(value, "value is null");
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }
    
    /**
     * Creates an instance of MetadataEntryBuilder.
     *
     * @param version Serialization version.
     * @param sourceAddress Metadata source address (provider).
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetId Target id.
     * @param metadataType Metadata type.
     * @param value Value.
     * @return Instance of MetadataEntryBuilder.
     */
    public static MetadataEntryBuilder create(short version, AddressDto sourceAddress, AddressDto targetAddress, ScopedMetadataKeyDto scopedMetadataKey, long targetId, MetadataTypeDto metadataType, MetadataValueBuilder value) {
        return new MetadataEntryBuilder(version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value);
    }

    /**
     * Gets metadata source address (provider).
     *
     * @return Metadata source address (provider).
     */
    public AddressDto getSourceAddress() {
        return this.sourceAddress;
    }

    /**
     * Gets metadata target address.
     *
     * @return Metadata target address.
     */
    public AddressDto getTargetAddress() {
        return this.targetAddress;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public ScopedMetadataKeyDto getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }

    /**
     * Gets target id.
     *
     * @return Target id.
     */
    public long getTargetId() {
        return this.targetId;
    }

    /**
     * Gets metadata type.
     *
     * @return Metadata type.
     */
    public MetadataTypeDto getMetadataType() {
        return this.metadataType;
    }

    /**
     * Gets value.
     *
     * @return Value.
     */
    public MetadataValueBuilder getValue() {
        return this.value;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.sourceAddress.getSize();
        size += this.targetAddress.getSize();
        size += this.scopedMetadataKey.getSize();
        size += 8; // targetId
        size += this.metadataType.getSize();
        size += this.value.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.sourceAddress);
            GeneratorUtils.writeEntity(dataOutputStream, this.targetAddress);
            GeneratorUtils.writeEntity(dataOutputStream, this.scopedMetadataKey);
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getTargetId()));
            GeneratorUtils.writeEntity(dataOutputStream, this.metadataType);
            GeneratorUtils.writeEntity(dataOutputStream, this.value);
        });
    }
}


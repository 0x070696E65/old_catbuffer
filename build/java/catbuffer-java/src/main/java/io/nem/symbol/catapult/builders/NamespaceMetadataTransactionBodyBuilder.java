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
* Binary layout for a namespace metadata transaction
**/
public class NamespaceMetadataTransactionBodyBuilder implements Serializer {

    /** Metadata target address. **/
    private final UnresolvedAddressDto targetAddress;

    /** Metadata key scoped to source, target and type. **/
    private final long scopedMetadataKey;

    /** Target namespace identifier. **/
    private final NamespaceIdDto targetNamespaceId;

    /** Change in value size in bytes. **/
    private final short valueSizeDelta;

    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). **/
    private final ByteBuffer value;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceMetadataTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.targetAddress = UnresolvedAddressDto.loadFromBinary(stream);
            this.scopedMetadataKey = Long.reverseBytes(stream.readLong());
            this.targetNamespaceId = NamespaceIdDto.loadFromBinary(stream);
            this.valueSizeDelta = Short.reverseBytes(stream.readShort());
            final short valueSize = Short.reverseBytes(stream.readShort());
            this.value = GeneratorUtils.readByteBuffer(stream, valueSize);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceMetadataTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceMetadataTransactionBodyBuilder.
     */
    public static NamespaceMetadataTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceMetadataTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param targetAddress Metadata target address.
    * @param scopedMetadataKey Metadata key scoped to source, target and type.
    * @param targetNamespaceId Target namespace identifier.
    * @param valueSizeDelta Change in value size in bytes.
    * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
    */
    protected NamespaceMetadataTransactionBodyBuilder(UnresolvedAddressDto targetAddress, long scopedMetadataKey, NamespaceIdDto targetNamespaceId, short valueSizeDelta, ByteBuffer value) {
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        GeneratorUtils.notNull(scopedMetadataKey, "scopedMetadataKey is null");
        GeneratorUtils.notNull(targetNamespaceId, "targetNamespaceId is null");
        GeneratorUtils.notNull(valueSizeDelta, "valueSizeDelta is null");
        GeneratorUtils.notNull(value, "value is null");
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetNamespaceId = targetNamespaceId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    
    /**
     * Creates an instance of NamespaceMetadataTransactionBodyBuilder.
     *
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetNamespaceId Target namespace identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of NamespaceMetadataTransactionBodyBuilder.
     */
    public static NamespaceMetadataTransactionBodyBuilder create(UnresolvedAddressDto targetAddress, long scopedMetadataKey, NamespaceIdDto targetNamespaceId, short valueSizeDelta, ByteBuffer value) {
        return new NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }

    /**
     * Gets metadata target address.
     *
     * @return Metadata target address.
     */
    public UnresolvedAddressDto getTargetAddress() {
        return this.targetAddress;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public long getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }

    /**
     * Gets target namespace identifier.
     *
     * @return Target namespace identifier.
     */
    public NamespaceIdDto getTargetNamespaceId() {
        return this.targetNamespaceId;
    }

    /**
     * Gets change in value size in bytes.
     *
     * @return Change in value size in bytes.
     */
    public short getValueSizeDelta() {
        return this.valueSizeDelta;
    }

    /**
     * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     *
     * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public ByteBuffer getValue() {
        return this.value;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.targetAddress.getSize();
        size += 8; // scopedMetadataKey
        size += this.targetNamespaceId.getSize();
        size += 2; // valueSizeDelta
        size += 2; // valueSize
        size += this.value.array().length;
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.targetAddress);
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getScopedMetadataKey()));
            GeneratorUtils.writeEntity(dataOutputStream, this.targetNamespaceId);
            dataOutputStream.writeShort(Short.reverseBytes((short) this.getValueSizeDelta()));
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.getSize(this.getValue())));
            dataOutputStream.write(this.value.array(), 0, this.value.array().length);
        });
    }
}


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
* Binary layout for an account metadata transaction
**/
public class AccountMetadataTransactionBodyBuilder implements Serializer {

    /** Metadata target address. **/
    private final UnresolvedAddressDto targetAddress;

    /** Metadata key scoped to source, target and type. **/
    private final long scopedMetadataKey;

    /** Change in value size in bytes. **/
    private final short valueSizeDelta;

    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). **/
    private final ByteBuffer value;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountMetadataTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.targetAddress = UnresolvedAddressDto.loadFromBinary(stream);
            this.scopedMetadataKey = Long.reverseBytes(stream.readLong());
            this.valueSizeDelta = Short.reverseBytes(stream.readShort());
            final short valueSize = Short.reverseBytes(stream.readShort());
            this.value = GeneratorUtils.readByteBuffer(stream, valueSize);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountMetadataTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountMetadataTransactionBodyBuilder.
     */
    public static AccountMetadataTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new AccountMetadataTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param targetAddress Metadata target address.
    * @param scopedMetadataKey Metadata key scoped to source, target and type.
    * @param valueSizeDelta Change in value size in bytes.
    * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
    */
    protected AccountMetadataTransactionBodyBuilder(UnresolvedAddressDto targetAddress, long scopedMetadataKey, short valueSizeDelta, ByteBuffer value) {
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        GeneratorUtils.notNull(scopedMetadataKey, "scopedMetadataKey is null");
        GeneratorUtils.notNull(valueSizeDelta, "valueSizeDelta is null");
        GeneratorUtils.notNull(value, "value is null");
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    
    /**
     * Creates an instance of AccountMetadataTransactionBodyBuilder.
     *
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of AccountMetadataTransactionBodyBuilder.
     */
    public static AccountMetadataTransactionBodyBuilder create(UnresolvedAddressDto targetAddress, long scopedMetadataKey, short valueSizeDelta, ByteBuffer value) {
        return new AccountMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, valueSizeDelta, value);
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
            dataOutputStream.writeShort(Short.reverseBytes((short) this.getValueSizeDelta()));
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.getSize(this.getValue())));
            dataOutputStream.write(this.value.array(), 0, this.value.array().length);
        });
    }
}


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
* Layout for mosaic address restriction key-value pair
**/
public class AddressKeyValueBuilder implements Serializer {

    /** Key for value. **/
    private final MosaicRestrictionKeyDto key;

    /** Value associated by key. **/
    private final long value;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AddressKeyValueBuilder(DataInputStream stream) {
        try {
            this.key = MosaicRestrictionKeyDto.loadFromBinary(stream);
            this.value = Long.reverseBytes(stream.readLong());
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AddressKeyValueBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AddressKeyValueBuilder.
     */
    public static AddressKeyValueBuilder loadFromBinary(DataInputStream stream) {
        return new AddressKeyValueBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param key Key for value.
    * @param value Value associated by key.
    */
    protected AddressKeyValueBuilder(MosaicRestrictionKeyDto key, long value) {
        GeneratorUtils.notNull(key, "key is null");
        GeneratorUtils.notNull(value, "value is null");
        this.key = key;
        this.value = value;
    }
    
    /**
     * Creates an instance of AddressKeyValueBuilder.
     *
     * @param key Key for value.
     * @param value Value associated by key.
     * @return Instance of AddressKeyValueBuilder.
     */
    public static AddressKeyValueBuilder create(MosaicRestrictionKeyDto key, long value) {
        return new AddressKeyValueBuilder(key, value);
    }

    /**
     * Gets key for value.
     *
     * @return Key for value.
     */
    public MosaicRestrictionKeyDto getKey() {
        return this.key;
    }

    /**
     * Gets value associated by key.
     *
     * @return Value associated by key.
     */
    public long getValue() {
        return this.value;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.key.getSize();
        size += 8; // value
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.key);
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getValue()));
        });
    }
}


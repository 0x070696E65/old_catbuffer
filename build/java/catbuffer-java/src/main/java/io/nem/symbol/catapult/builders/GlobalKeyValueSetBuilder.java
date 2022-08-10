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
* Binary layout for a global restriction key-value set
**/
public class GlobalKeyValueSetBuilder implements Serializer {

    /** Key value array. **/
    private final List<GlobalKeyValueBuilder> keys;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected GlobalKeyValueSetBuilder(DataInputStream stream) {
        try {
            final byte keyValueCount = stream.readByte();
            this.keys = GeneratorUtils.loadFromBinaryArray(GlobalKeyValueBuilder::loadFromBinary, stream, keyValueCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of GlobalKeyValueSetBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of GlobalKeyValueSetBuilder.
     */
    public static GlobalKeyValueSetBuilder loadFromBinary(DataInputStream stream) {
        return new GlobalKeyValueSetBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param keys Key value array.
    */
    protected GlobalKeyValueSetBuilder(List<GlobalKeyValueBuilder> keys) {
        GeneratorUtils.notNull(keys, "keys is null");
        this.keys = keys;
    }
    
    /**
     * Creates an instance of GlobalKeyValueSetBuilder.
     *
     * @param keys Key value array.
     * @return Instance of GlobalKeyValueSetBuilder.
     */
    public static GlobalKeyValueSetBuilder create(List<GlobalKeyValueBuilder> keys) {
        return new GlobalKeyValueSetBuilder(keys);
    }

    /**
     * Gets key value array.
     *
     * @return Key value array.
     */
    public List<GlobalKeyValueBuilder> getKeys() {
        return this.keys;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 1; // keyValueCount
        size +=  GeneratorUtils.getSumSize(this.keys, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getKeys()));
            GeneratorUtils.writeList(dataOutputStream, this.keys, 0);
        });
    }
}


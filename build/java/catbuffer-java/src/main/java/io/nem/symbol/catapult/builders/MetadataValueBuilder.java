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
* Binary layout of a metadata entry value
**/
public class MetadataValueBuilder implements Serializer {

    /** Data of the value. **/
    private final ByteBuffer data;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MetadataValueBuilder(DataInputStream stream) {
        try {
            final short size = Short.reverseBytes(stream.readShort());
            this.data = GeneratorUtils.readByteBuffer(stream, size);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MetadataValueBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MetadataValueBuilder.
     */
    public static MetadataValueBuilder loadFromBinary(DataInputStream stream) {
        return new MetadataValueBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param data Data of the value.
    */
    protected MetadataValueBuilder(ByteBuffer data) {
        GeneratorUtils.notNull(data, "data is null");
        this.data = data;
    }
    
    /**
     * Creates an instance of MetadataValueBuilder.
     *
     * @param data Data of the value.
     * @return Instance of MetadataValueBuilder.
     */
    public static MetadataValueBuilder create(ByteBuffer data) {
        return new MetadataValueBuilder(data);
    }

    /**
     * Gets data of the value.
     *
     * @return Data of the value.
     */
    public ByteBuffer getData() {
        return this.data;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 2; // size
        size += this.data.array().length;
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.getSize(this.getData())));
            dataOutputStream.write(this.data.array(), 0, this.data.array().length);
        });
    }
}


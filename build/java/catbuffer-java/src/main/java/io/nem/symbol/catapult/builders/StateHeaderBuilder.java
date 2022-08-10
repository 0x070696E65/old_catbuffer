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
* Header common to all serialized states
**/
public class StateHeaderBuilder implements Serializer {

    /** Serialization version. **/
    private final short version;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected StateHeaderBuilder(DataInputStream stream) {
        try {
            this.version = Short.reverseBytes(stream.readShort());
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of StateHeaderBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of StateHeaderBuilder.
     */
    public static StateHeaderBuilder loadFromBinary(DataInputStream stream) {
        return new StateHeaderBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    */
    protected StateHeaderBuilder(short version) {
        GeneratorUtils.notNull(version, "version is null");
        this.version = version;
    }
    
    /**
     * Creates an instance of StateHeaderBuilder.
     *
     * @param version Serialization version.
     * @return Instance of StateHeaderBuilder.
     */
    public static StateHeaderBuilder create(short version) {
        return new StateHeaderBuilder(version);
    }

    /**
     * Gets serialization version.
     *
     * @return Serialization version.
     */
    public short getVersion() {
        return this.version;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 2; // version
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeShort(Short.reverseBytes((short) this.getVersion()));
        });
    }
}


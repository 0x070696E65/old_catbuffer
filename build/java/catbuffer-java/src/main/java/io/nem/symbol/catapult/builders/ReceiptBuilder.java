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
* Binary layout for a receipt entity
**/
public class ReceiptBuilder implements Serializer {

    /** Entity size. **/
    private int size;

    /** Receipt version. **/
    private final short version;

    /** Receipt type. **/
    private final ReceiptTypeDto type;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected ReceiptBuilder(DataInputStream stream) {
        try {
            this.size = Integer.reverseBytes(stream.readInt());
            this.version = Short.reverseBytes(stream.readShort());
            this.type = ReceiptTypeDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of ReceiptBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of ReceiptBuilder.
     */
    public static ReceiptBuilder loadFromBinary(DataInputStream stream) {
        return new ReceiptBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Receipt version.
    * @param type Receipt type.
    */
    protected ReceiptBuilder(short version, ReceiptTypeDto type) {
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(type, "type is null");
        this.version = version;
        this.type = type;
    }
    
    /**
     * Creates an instance of ReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @return Instance of ReceiptBuilder.
     */
    public static ReceiptBuilder create(short version, ReceiptTypeDto type) {
        return new ReceiptBuilder(version, type);
    }

    /**
     * Gets entity size.
     *
     * @return Entity size.
     */
    public int getStreamSize() {
        return this.size;
    }

    /**
     * Gets receipt version.
     *
     * @return Receipt version.
     */
    public short getVersion() {
        return this.version;
    }

    /**
     * Gets receipt type.
     *
     * @return Receipt type.
     */
    public ReceiptTypeDto getType() {
        return this.type;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 4; // size
        size += 2; // version
        size += this.type.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            // Ignored serialization: size AttributeKind.SIMPLE
            dataOutputStream.writeShort(Short.reverseBytes((short) this.getVersion()));
            GeneratorUtils.writeEntity(dataOutputStream, this.type);
        });
    }
}


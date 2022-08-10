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
* Binary layout for receipt source
**/
public class ReceiptSourceBuilder implements Serializer {

    /** Transaction primary source (e.g. index within block). **/
    private final int primaryId;

    /** Transaction secondary source (e.g. index within aggregate). **/
    private final int secondaryId;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected ReceiptSourceBuilder(DataInputStream stream) {
        try {
            this.primaryId = Integer.reverseBytes(stream.readInt());
            this.secondaryId = Integer.reverseBytes(stream.readInt());
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of ReceiptSourceBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of ReceiptSourceBuilder.
     */
    public static ReceiptSourceBuilder loadFromBinary(DataInputStream stream) {
        return new ReceiptSourceBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param primaryId Transaction primary source (e.g. index within block).
    * @param secondaryId Transaction secondary source (e.g. index within aggregate).
    */
    protected ReceiptSourceBuilder(int primaryId, int secondaryId) {
        GeneratorUtils.notNull(primaryId, "primaryId is null");
        GeneratorUtils.notNull(secondaryId, "secondaryId is null");
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }
    
    /**
     * Creates an instance of ReceiptSourceBuilder.
     *
     * @param primaryId Transaction primary source (e.g. index within block).
     * @param secondaryId Transaction secondary source (e.g. index within aggregate).
     * @return Instance of ReceiptSourceBuilder.
     */
    public static ReceiptSourceBuilder create(int primaryId, int secondaryId) {
        return new ReceiptSourceBuilder(primaryId, secondaryId);
    }

    /**
     * Gets transaction primary source (e.g. index within block).
     *
     * @return Transaction primary source (e.g. index within block).
     */
    public int getPrimaryId() {
        return this.primaryId;
    }

    /**
     * Gets transaction secondary source (e.g. index within aggregate).
     *
     * @return Transaction secondary source (e.g. index within aggregate).
     */
    public int getSecondaryId() {
        return this.secondaryId;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 4; // primaryId
        size += 4; // secondaryId
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getPrimaryId()));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getSecondaryId()));
        });
    }
}


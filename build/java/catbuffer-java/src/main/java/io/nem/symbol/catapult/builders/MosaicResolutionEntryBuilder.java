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
* Binary layout for mosaic resolution entry
**/
public class MosaicResolutionEntryBuilder implements Serializer {

    /** Source of resolution within block. **/
    private final ReceiptSourceBuilder source;

    /** Resolved value. **/
    private final MosaicIdDto resolved;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicResolutionEntryBuilder(DataInputStream stream) {
        try {
            this.source = ReceiptSourceBuilder.loadFromBinary(stream);
            this.resolved = MosaicIdDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicResolutionEntryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicResolutionEntryBuilder.
     */
    public static MosaicResolutionEntryBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicResolutionEntryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param source Source of resolution within block.
    * @param resolved Resolved value.
    */
    protected MosaicResolutionEntryBuilder(ReceiptSourceBuilder source, MosaicIdDto resolved) {
        GeneratorUtils.notNull(source, "source is null");
        GeneratorUtils.notNull(resolved, "resolved is null");
        this.source = source;
        this.resolved = resolved;
    }
    
    /**
     * Creates an instance of MosaicResolutionEntryBuilder.
     *
     * @param source Source of resolution within block.
     * @param resolved Resolved value.
     * @return Instance of MosaicResolutionEntryBuilder.
     */
    public static MosaicResolutionEntryBuilder create(ReceiptSourceBuilder source, MosaicIdDto resolved) {
        return new MosaicResolutionEntryBuilder(source, resolved);
    }

    /**
     * Gets source of resolution within block.
     *
     * @return Source of resolution within block.
     */
    public ReceiptSourceBuilder getSource() {
        return this.source;
    }

    /**
     * Gets resolved value.
     *
     * @return Resolved value.
     */
    public MosaicIdDto getResolved() {
        return this.resolved;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.source.getSize();
        size += this.resolved.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.source);
            GeneratorUtils.writeEntity(dataOutputStream, this.resolved);
        });
    }
}


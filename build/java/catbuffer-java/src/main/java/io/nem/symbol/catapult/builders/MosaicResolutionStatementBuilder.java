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
* Binary layout for a mosaic resolution statement
**/
public class MosaicResolutionStatementBuilder extends ReceiptBuilder implements Serializer {

    /** Unresolved mosaic. **/
    private final UnresolvedMosaicIdDto unresolved;

    /** Resolution entries. **/
    private final List<MosaicResolutionEntryBuilder> resolutionEntries;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicResolutionStatementBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.unresolved = UnresolvedMosaicIdDto.loadFromBinary(stream);
            this.resolutionEntries = GeneratorUtils.loadFromBinaryArrayRemaining(MosaicResolutionEntryBuilder::loadFromBinary, stream, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicResolutionStatementBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicResolutionStatementBuilder.
     */
    public static MosaicResolutionStatementBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicResolutionStatementBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Receipt version.
    * @param type Receipt type.
    * @param unresolved Unresolved mosaic.
    * @param resolutionEntries Resolution entries.
    */
    protected MosaicResolutionStatementBuilder(short version, ReceiptTypeDto type, UnresolvedMosaicIdDto unresolved, List<MosaicResolutionEntryBuilder> resolutionEntries) {
        super(version, type);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(unresolved, "unresolved is null");
        GeneratorUtils.notNull(resolutionEntries, "resolutionEntries is null");
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    
    /**
     * Creates an instance of MosaicResolutionStatementBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param unresolved Unresolved mosaic.
     * @param resolutionEntries Resolution entries.
     * @return Instance of MosaicResolutionStatementBuilder.
     */
    public static MosaicResolutionStatementBuilder create(short version, ReceiptTypeDto type, UnresolvedMosaicIdDto unresolved, List<MosaicResolutionEntryBuilder> resolutionEntries) {
        return new MosaicResolutionStatementBuilder(version, type, unresolved, resolutionEntries);
    }

    /**
     * Gets unresolved mosaic.
     *
     * @return Unresolved mosaic.
     */
    public UnresolvedMosaicIdDto getUnresolved() {
        return this.unresolved;
    }

    /**
     * Gets resolution entries.
     *
     * @return Resolution entries.
     */
    public List<MosaicResolutionEntryBuilder> getResolutionEntries() {
        return this.resolutionEntries;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.unresolved.getSize();
        size +=  GeneratorUtils.getSumSize(this.resolutionEntries, 0);
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
            GeneratorUtils.writeEntity(dataOutputStream, this.unresolved);
            GeneratorUtils.writeList(dataOutputStream, this.resolutionEntries, 0);
        });
    }
}


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
* Binary layout for mosaic entry
**/
public class MosaicEntryBuilder extends StateHeaderBuilder implements Serializer {

    /** Entry id. **/
    private final MosaicIdDto mosaicId;

    /** Total supply amount. **/
    private final AmountDto supply;

    /** Definition comprised of entry properties. **/
    private final MosaicDefinitionBuilder definition;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicEntryBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.mosaicId = MosaicIdDto.loadFromBinary(stream);
            this.supply = AmountDto.loadFromBinary(stream);
            this.definition = MosaicDefinitionBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicEntryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicEntryBuilder.
     */
    public static MosaicEntryBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicEntryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param mosaicId Entry id.
    * @param supply Total supply amount.
    * @param definition Definition comprised of entry properties.
    */
    protected MosaicEntryBuilder(short version, MosaicIdDto mosaicId, AmountDto supply, MosaicDefinitionBuilder definition) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(supply, "supply is null");
        GeneratorUtils.notNull(definition, "definition is null");
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }
    
    /**
     * Creates an instance of MosaicEntryBuilder.
     *
     * @param version Serialization version.
     * @param mosaicId Entry id.
     * @param supply Total supply amount.
     * @param definition Definition comprised of entry properties.
     * @return Instance of MosaicEntryBuilder.
     */
    public static MosaicEntryBuilder create(short version, MosaicIdDto mosaicId, AmountDto supply, MosaicDefinitionBuilder definition) {
        return new MosaicEntryBuilder(version, mosaicId, supply, definition);
    }

    /**
     * Gets entry id.
     *
     * @return Entry id.
     */
    public MosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets total supply amount.
     *
     * @return Total supply amount.
     */
    public AmountDto getSupply() {
        return this.supply;
    }

    /**
     * Gets definition comprised of entry properties.
     *
     * @return Definition comprised of entry properties.
     */
    public MosaicDefinitionBuilder getDefinition() {
        return this.definition;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.mosaicId.getSize();
        size += this.supply.getSize();
        size += this.definition.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicId);
            GeneratorUtils.writeEntity(dataOutputStream, this.supply);
            GeneratorUtils.writeEntity(dataOutputStream, this.definition);
        });
    }
}


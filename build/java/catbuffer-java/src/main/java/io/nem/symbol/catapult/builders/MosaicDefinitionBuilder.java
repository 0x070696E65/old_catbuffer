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
* Binary layout for mosaic definition
**/
public class MosaicDefinitionBuilder implements Serializer {

    /** Block height. **/
    private final HeightDto startHeight;

    /** Mosaic owner. **/
    private final AddressDto ownerAddress;

    /** Revision. **/
    private final int revision;

    /** Properties. **/
    private final MosaicPropertiesBuilder properties;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicDefinitionBuilder(DataInputStream stream) {
        try {
            this.startHeight = HeightDto.loadFromBinary(stream);
            this.ownerAddress = AddressDto.loadFromBinary(stream);
            this.revision = Integer.reverseBytes(stream.readInt());
            this.properties = MosaicPropertiesBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicDefinitionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicDefinitionBuilder.
     */
    public static MosaicDefinitionBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicDefinitionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param startHeight Block height.
    * @param ownerAddress Mosaic owner.
    * @param revision Revision.
    * @param properties Properties.
    */
    protected MosaicDefinitionBuilder(HeightDto startHeight, AddressDto ownerAddress, int revision, MosaicPropertiesBuilder properties) {
        GeneratorUtils.notNull(startHeight, "startHeight is null");
        GeneratorUtils.notNull(ownerAddress, "ownerAddress is null");
        GeneratorUtils.notNull(revision, "revision is null");
        GeneratorUtils.notNull(properties, "properties is null");
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.properties = properties;
    }
    
    /**
     * Creates an instance of MosaicDefinitionBuilder.
     *
     * @param startHeight Block height.
     * @param ownerAddress Mosaic owner.
     * @param revision Revision.
     * @param properties Properties.
     * @return Instance of MosaicDefinitionBuilder.
     */
    public static MosaicDefinitionBuilder create(HeightDto startHeight, AddressDto ownerAddress, int revision, MosaicPropertiesBuilder properties) {
        return new MosaicDefinitionBuilder(startHeight, ownerAddress, revision, properties);
    }

    /**
     * Gets block height.
     *
     * @return Block height.
     */
    public HeightDto getStartHeight() {
        return this.startHeight;
    }

    /**
     * Gets mosaic owner.
     *
     * @return Mosaic owner.
     */
    public AddressDto getOwnerAddress() {
        return this.ownerAddress;
    }

    /**
     * Gets revision.
     *
     * @return Revision.
     */
    public int getRevision() {
        return this.revision;
    }

    /**
     * Gets properties.
     *
     * @return Properties.
     */
    public MosaicPropertiesBuilder getProperties() {
        return this.properties;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.startHeight.getSize();
        size += this.ownerAddress.getSize();
        size += 4; // revision
        size += this.properties.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.startHeight);
            GeneratorUtils.writeEntity(dataOutputStream, this.ownerAddress);
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getRevision()));
            GeneratorUtils.writeEntity(dataOutputStream, this.properties);
        });
    }
}


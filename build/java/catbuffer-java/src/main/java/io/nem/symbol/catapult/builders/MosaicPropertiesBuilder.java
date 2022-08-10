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
* Binary layout for mosaic properties
**/
public class MosaicPropertiesBuilder implements Serializer {

    /** Mosaic flags. **/
    private final EnumSet<MosaicFlagsDto> flags;

    /** Mosaic divisibility. **/
    private final byte divisibility;

    /** Mosaic duration. **/
    private final BlockDurationDto duration;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicPropertiesBuilder(DataInputStream stream) {
        try {
            this.flags = GeneratorUtils.toSet(MosaicFlagsDto.class, stream.readByte());
            this.divisibility = stream.readByte();
            this.duration = BlockDurationDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicPropertiesBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicPropertiesBuilder.
     */
    public static MosaicPropertiesBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicPropertiesBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param flags Mosaic flags.
    * @param divisibility Mosaic divisibility.
    * @param duration Mosaic duration.
    */
    protected MosaicPropertiesBuilder(EnumSet<MosaicFlagsDto> flags, byte divisibility, BlockDurationDto duration) {
        GeneratorUtils.notNull(flags, "flags is null");
        GeneratorUtils.notNull(divisibility, "divisibility is null");
        GeneratorUtils.notNull(duration, "duration is null");
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    
    /**
     * Creates an instance of MosaicPropertiesBuilder.
     *
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @param duration Mosaic duration.
     * @return Instance of MosaicPropertiesBuilder.
     */
    public static MosaicPropertiesBuilder create(EnumSet<MosaicFlagsDto> flags, byte divisibility, BlockDurationDto duration) {
        return new MosaicPropertiesBuilder(flags, divisibility, duration);
    }

    /**
     * Gets mosaic flags.
     *
     * @return Mosaic flags.
     */
    public EnumSet<MosaicFlagsDto> getFlags() {
        return this.flags;
    }

    /**
     * Gets mosaic divisibility.
     *
     * @return Mosaic divisibility.
     */
    public byte getDivisibility() {
        return this.divisibility;
    }

    /**
     * Gets mosaic duration.
     *
     * @return Mosaic duration.
     */
    public BlockDurationDto getDuration() {
        return this.duration;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += MosaicFlagsDto.values()[0].getSize();
        size += 1; // divisibility
        size += this.duration.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeByte((byte) GeneratorUtils.toLong(MosaicFlagsDto.class, this.flags));
            dataOutputStream.writeByte((byte) this.getDivisibility());
            GeneratorUtils.writeEntity(dataOutputStream, this.duration);
        });
    }
}


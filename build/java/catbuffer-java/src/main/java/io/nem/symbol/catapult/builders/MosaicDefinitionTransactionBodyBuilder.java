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
* Binary layout for a mosaic definition transaction
**/
public class MosaicDefinitionTransactionBodyBuilder implements Serializer {

    /** Mosaic identifier. **/
    private final MosaicIdDto id;

    /** Mosaic duration. **/
    private final BlockDurationDto duration;

    /** Mosaic nonce. **/
    private final MosaicNonceDto nonce;

    /** Mosaic flags. **/
    private final EnumSet<MosaicFlagsDto> flags;

    /** Mosaic divisibility. **/
    private final byte divisibility;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicDefinitionTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.id = MosaicIdDto.loadFromBinary(stream);
            this.duration = BlockDurationDto.loadFromBinary(stream);
            this.nonce = MosaicNonceDto.loadFromBinary(stream);
            this.flags = GeneratorUtils.toSet(MosaicFlagsDto.class, stream.readByte());
            this.divisibility = stream.readByte();
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicDefinitionTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicDefinitionTransactionBodyBuilder.
     */
    public static MosaicDefinitionTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicDefinitionTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param id Mosaic identifier.
    * @param duration Mosaic duration.
    * @param nonce Mosaic nonce.
    * @param flags Mosaic flags.
    * @param divisibility Mosaic divisibility.
    */
    protected MosaicDefinitionTransactionBodyBuilder(MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, EnumSet<MosaicFlagsDto> flags, byte divisibility) {
        GeneratorUtils.notNull(id, "id is null");
        GeneratorUtils.notNull(duration, "duration is null");
        GeneratorUtils.notNull(nonce, "nonce is null");
        GeneratorUtils.notNull(flags, "flags is null");
        GeneratorUtils.notNull(divisibility, "divisibility is null");
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }
    
    /**
     * Creates an instance of MosaicDefinitionTransactionBodyBuilder.
     *
     * @param id Mosaic identifier.
     * @param duration Mosaic duration.
     * @param nonce Mosaic nonce.
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @return Instance of MosaicDefinitionTransactionBodyBuilder.
     */
    public static MosaicDefinitionTransactionBodyBuilder create(MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, EnumSet<MosaicFlagsDto> flags, byte divisibility) {
        return new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }

    /**
     * Gets mosaic identifier.
     *
     * @return Mosaic identifier.
     */
    public MosaicIdDto getId() {
        return this.id;
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
     * Gets mosaic nonce.
     *
     * @return Mosaic nonce.
     */
    public MosaicNonceDto getNonce() {
        return this.nonce;
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
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.id.getSize();
        size += this.duration.getSize();
        size += this.nonce.getSize();
        size += MosaicFlagsDto.values()[0].getSize();
        size += 1; // divisibility
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.id);
            GeneratorUtils.writeEntity(dataOutputStream, this.duration);
            GeneratorUtils.writeEntity(dataOutputStream, this.nonce);
            dataOutputStream.writeByte((byte) GeneratorUtils.toLong(MosaicFlagsDto.class, this.flags));
            dataOutputStream.writeByte((byte) this.getDivisibility());
        });
    }
}


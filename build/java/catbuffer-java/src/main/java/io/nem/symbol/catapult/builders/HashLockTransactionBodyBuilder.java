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
* Binary layout for a hash lock transaction
**/
public class HashLockTransactionBodyBuilder implements Serializer {

    /** Lock mosaic. **/
    private final UnresolvedMosaicBuilder mosaic;

    /** Number of blocks for which a lock should be valid. **/
    private final BlockDurationDto duration;

    /** Lock hash. **/
    private final Hash256Dto hash;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected HashLockTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.mosaic = UnresolvedMosaicBuilder.loadFromBinary(stream);
            this.duration = BlockDurationDto.loadFromBinary(stream);
            this.hash = Hash256Dto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of HashLockTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of HashLockTransactionBodyBuilder.
     */
    public static HashLockTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new HashLockTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param mosaic Lock mosaic.
    * @param duration Number of blocks for which a lock should be valid.
    * @param hash Lock hash.
    */
    protected HashLockTransactionBodyBuilder(UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(duration, "duration is null");
        GeneratorUtils.notNull(hash, "hash is null");
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = hash;
    }
    
    /**
     * Creates an instance of HashLockTransactionBodyBuilder.
     *
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     * @return Instance of HashLockTransactionBodyBuilder.
     */
    public static HashLockTransactionBodyBuilder create(UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
        return new HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }

    /**
     * Gets lock mosaic.
     *
     * @return Lock mosaic.
     */
    public UnresolvedMosaicBuilder getMosaic() {
        return this.mosaic;
    }

    /**
     * Gets number of blocks for which a lock should be valid.
     *
     * @return Number of blocks for which a lock should be valid.
     */
    public BlockDurationDto getDuration() {
        return this.duration;
    }

    /**
     * Gets lock hash.
     *
     * @return Lock hash.
     */
    public Hash256Dto getHash() {
        return this.hash;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.mosaic.getSize();
        size += this.duration.getSize();
        size += this.hash.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaic);
            GeneratorUtils.writeEntity(dataOutputStream, this.duration);
            GeneratorUtils.writeEntity(dataOutputStream, this.hash);
        });
    }
}


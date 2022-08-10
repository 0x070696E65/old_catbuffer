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
* Binary layout for finalized block header
**/
public class FinalizedBlockHeaderBuilder implements Serializer {

    /** Finalization round. **/
    private final FinalizationRoundBuilder round;

    /** Finalization height. **/
    private final HeightDto height;

    /** Finalization hash. **/
    private final Hash256Dto hash;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected FinalizedBlockHeaderBuilder(DataInputStream stream) {
        try {
            this.round = FinalizationRoundBuilder.loadFromBinary(stream);
            this.height = HeightDto.loadFromBinary(stream);
            this.hash = Hash256Dto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of FinalizedBlockHeaderBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of FinalizedBlockHeaderBuilder.
     */
    public static FinalizedBlockHeaderBuilder loadFromBinary(DataInputStream stream) {
        return new FinalizedBlockHeaderBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param round Finalization round.
    * @param height Finalization height.
    * @param hash Finalization hash.
    */
    protected FinalizedBlockHeaderBuilder(FinalizationRoundBuilder round, HeightDto height, Hash256Dto hash) {
        GeneratorUtils.notNull(round, "round is null");
        GeneratorUtils.notNull(height, "height is null");
        GeneratorUtils.notNull(hash, "hash is null");
        this.round = round;
        this.height = height;
        this.hash = hash;
    }
    
    /**
     * Creates an instance of FinalizedBlockHeaderBuilder.
     *
     * @param round Finalization round.
     * @param height Finalization height.
     * @param hash Finalization hash.
     * @return Instance of FinalizedBlockHeaderBuilder.
     */
    public static FinalizedBlockHeaderBuilder create(FinalizationRoundBuilder round, HeightDto height, Hash256Dto hash) {
        return new FinalizedBlockHeaderBuilder(round, height, hash);
    }

    /**
     * Gets finalization round.
     *
     * @return Finalization round.
     */
    public FinalizationRoundBuilder getRound() {
        return this.round;
    }

    /**
     * Gets finalization height.
     *
     * @return Finalization height.
     */
    public HeightDto getHeight() {
        return this.height;
    }

    /**
     * Gets finalization hash.
     *
     * @return Finalization hash.
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
        size += this.round.getSize();
        size += this.height.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.round);
            GeneratorUtils.writeEntity(dataOutputStream, this.height);
            GeneratorUtils.writeEntity(dataOutputStream, this.hash);
        });
    }
}


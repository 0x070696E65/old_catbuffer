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
* Binary layout for a mosaic
**/
public class MosaicBuilder implements Serializer {

    /** Mosaic identifier. **/
    private final MosaicIdDto mosaicId;

    /** Mosaic amount. **/
    private final AmountDto amount;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicBuilder(DataInputStream stream) {
        try {
            this.mosaicId = MosaicIdDto.loadFromBinary(stream);
            this.amount = AmountDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicBuilder.
     */
    public static MosaicBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param mosaicId Mosaic identifier.
    * @param amount Mosaic amount.
    */
    protected MosaicBuilder(MosaicIdDto mosaicId, AmountDto amount) {
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(amount, "amount is null");
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    
    /**
     * Creates an instance of MosaicBuilder.
     *
     * @param mosaicId Mosaic identifier.
     * @param amount Mosaic amount.
     * @return Instance of MosaicBuilder.
     */
    public static MosaicBuilder create(MosaicIdDto mosaicId, AmountDto amount) {
        return new MosaicBuilder(mosaicId, amount);
    }

    /**
     * Gets mosaic identifier.
     *
     * @return Mosaic identifier.
     */
    public MosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets mosaic amount.
     *
     * @return Mosaic amount.
     */
    public AmountDto getAmount() {
        return this.amount;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.mosaicId.getSize();
        size += this.amount.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicId);
            GeneratorUtils.writeEntity(dataOutputStream, this.amount);
        });
    }
}


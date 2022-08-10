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
* Binary layout for a mosaic supply change transaction
**/
public class MosaicSupplyChangeTransactionBodyBuilder implements Serializer {

    /** Affected mosaic identifier. **/
    private final UnresolvedMosaicIdDto mosaicId;

    /** Change amount. **/
    private final AmountDto delta;

    /** Supply change action. **/
    private final MosaicSupplyChangeActionDto action;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicSupplyChangeTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.mosaicId = UnresolvedMosaicIdDto.loadFromBinary(stream);
            this.delta = AmountDto.loadFromBinary(stream);
            this.action = MosaicSupplyChangeActionDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicSupplyChangeTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicSupplyChangeTransactionBodyBuilder.
     */
    public static MosaicSupplyChangeTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicSupplyChangeTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param mosaicId Affected mosaic identifier.
    * @param delta Change amount.
    * @param action Supply change action.
    */
    protected MosaicSupplyChangeTransactionBodyBuilder(UnresolvedMosaicIdDto mosaicId, AmountDto delta, MosaicSupplyChangeActionDto action) {
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(delta, "delta is null");
        GeneratorUtils.notNull(action, "action is null");
        this.mosaicId = mosaicId;
        this.delta = delta;
        this.action = action;
    }
    
    /**
     * Creates an instance of MosaicSupplyChangeTransactionBodyBuilder.
     *
     * @param mosaicId Affected mosaic identifier.
     * @param delta Change amount.
     * @param action Supply change action.
     * @return Instance of MosaicSupplyChangeTransactionBodyBuilder.
     */
    public static MosaicSupplyChangeTransactionBodyBuilder create(UnresolvedMosaicIdDto mosaicId, AmountDto delta, MosaicSupplyChangeActionDto action) {
        return new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }

    /**
     * Gets affected mosaic identifier.
     *
     * @return Affected mosaic identifier.
     */
    public UnresolvedMosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets change amount.
     *
     * @return Change amount.
     */
    public AmountDto getDelta() {
        return this.delta;
    }

    /**
     * Gets supply change action.
     *
     * @return Supply change action.
     */
    public MosaicSupplyChangeActionDto getAction() {
        return this.action;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.mosaicId.getSize();
        size += this.delta.getSize();
        size += this.action.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.delta);
            GeneratorUtils.writeEntity(dataOutputStream, this.action);
        });
    }
}


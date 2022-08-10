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
* Binary layout for a balance change receipt
**/
public class BalanceChangeReceiptBuilder extends ReceiptBuilder implements Serializer {

    /** Mosaic. **/
    private final MosaicBuilder mosaic;

    /** Account address. **/
    private final AddressDto targetAddress;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected BalanceChangeReceiptBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.mosaic = MosaicBuilder.loadFromBinary(stream);
            this.targetAddress = AddressDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of BalanceChangeReceiptBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of BalanceChangeReceiptBuilder.
     */
    public static BalanceChangeReceiptBuilder loadFromBinary(DataInputStream stream) {
        return new BalanceChangeReceiptBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Receipt version.
    * @param type Receipt type.
    * @param mosaic Mosaic.
    * @param targetAddress Account address.
    */
    protected BalanceChangeReceiptBuilder(short version, ReceiptTypeDto type, MosaicBuilder mosaic, AddressDto targetAddress) {
        super(version, type);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        this.mosaic = mosaic;
        this.targetAddress = targetAddress;
    }
    
    /**
     * Creates an instance of BalanceChangeReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     * @param targetAddress Account address.
     * @return Instance of BalanceChangeReceiptBuilder.
     */
    public static BalanceChangeReceiptBuilder create(short version, ReceiptTypeDto type, MosaicBuilder mosaic, AddressDto targetAddress) {
        return new BalanceChangeReceiptBuilder(version, type, mosaic, targetAddress);
    }

    /**
     * Gets mosaic.
     *
     * @return Mosaic.
     */
    public MosaicBuilder getMosaic() {
        return this.mosaic;
    }

    /**
     * Gets account address.
     *
     * @return Account address.
     */
    public AddressDto getTargetAddress() {
        return this.targetAddress;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.mosaic.getSize();
        size += this.targetAddress.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaic);
            GeneratorUtils.writeEntity(dataOutputStream, this.targetAddress);
        });
    }
}


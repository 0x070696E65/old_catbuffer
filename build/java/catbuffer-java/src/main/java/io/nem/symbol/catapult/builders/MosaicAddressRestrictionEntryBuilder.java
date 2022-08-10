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
* Binary layout for a mosaic restriction
**/
public class MosaicAddressRestrictionEntryBuilder implements Serializer {

    /** Identifier of the mosaic to which the restriction applies. **/
    private final MosaicIdDto mosaicId;

    /** Address being restricted. **/
    private final AddressDto address;

    /** Address key value restriction set. **/
    private final AddressKeyValueSetBuilder keyPairs;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicAddressRestrictionEntryBuilder(DataInputStream stream) {
        try {
            this.mosaicId = MosaicIdDto.loadFromBinary(stream);
            this.address = AddressDto.loadFromBinary(stream);
            this.keyPairs = AddressKeyValueSetBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicAddressRestrictionEntryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicAddressRestrictionEntryBuilder.
     */
    public static MosaicAddressRestrictionEntryBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicAddressRestrictionEntryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param mosaicId Identifier of the mosaic to which the restriction applies.
    * @param address Address being restricted.
    * @param keyPairs Address key value restriction set.
    */
    protected MosaicAddressRestrictionEntryBuilder(MosaicIdDto mosaicId, AddressDto address, AddressKeyValueSetBuilder keyPairs) {
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(address, "address is null");
        GeneratorUtils.notNull(keyPairs, "keyPairs is null");
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }
    
    /**
     * Creates an instance of MosaicAddressRestrictionEntryBuilder.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param address Address being restricted.
     * @param keyPairs Address key value restriction set.
     * @return Instance of MosaicAddressRestrictionEntryBuilder.
     */
    public static MosaicAddressRestrictionEntryBuilder create(MosaicIdDto mosaicId, AddressDto address, AddressKeyValueSetBuilder keyPairs) {
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    }

    /**
     * Gets identifier of the mosaic to which the restriction applies.
     *
     * @return Identifier of the mosaic to which the restriction applies.
     */
    public MosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets address being restricted.
     *
     * @return Address being restricted.
     */
    public AddressDto getAddress() {
        return this.address;
    }

    /**
     * Gets address key value restriction set.
     *
     * @return Address key value restriction set.
     */
    public AddressKeyValueSetBuilder getKeyPairs() {
        return this.keyPairs;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.mosaicId.getSize();
        size += this.address.getSize();
        size += this.keyPairs.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.address);
            GeneratorUtils.writeEntity(dataOutputStream, this.keyPairs);
        });
    }
}


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
* Binary layout for address based account restriction
**/
public class AccountRestrictionAddressValueBuilder implements Serializer {

    /** Restriction values. **/
    private final List<AddressDto> restrictionValues;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountRestrictionAddressValueBuilder(DataInputStream stream) {
        try {
            final long restrictionValuesCount = Long.reverseBytes(stream.readLong());
            this.restrictionValues = GeneratorUtils.loadFromBinaryArray(AddressDto::loadFromBinary, stream, restrictionValuesCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountRestrictionAddressValueBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountRestrictionAddressValueBuilder.
     */
    public static AccountRestrictionAddressValueBuilder loadFromBinary(DataInputStream stream) {
        return new AccountRestrictionAddressValueBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param restrictionValues Restriction values.
    */
    protected AccountRestrictionAddressValueBuilder(List<AddressDto> restrictionValues) {
        GeneratorUtils.notNull(restrictionValues, "restrictionValues is null");
        this.restrictionValues = restrictionValues;
    }
    
    /**
     * Creates an instance of AccountRestrictionAddressValueBuilder.
     *
     * @param restrictionValues Restriction values.
     * @return Instance of AccountRestrictionAddressValueBuilder.
     */
    public static AccountRestrictionAddressValueBuilder create(List<AddressDto> restrictionValues) {
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
    }

    /**
     * Gets restriction values.
     *
     * @return Restriction values.
     */
    public List<AddressDto> getRestrictionValues() {
        return this.restrictionValues;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 8; // restrictionValuesCount
        size +=  GeneratorUtils.getSumSize(this.restrictionValues, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeLong(Long.reverseBytes((long) GeneratorUtils.getSize(this.getRestrictionValues())));
            GeneratorUtils.writeList(dataOutputStream, this.restrictionValues, 0);
        });
    }
}


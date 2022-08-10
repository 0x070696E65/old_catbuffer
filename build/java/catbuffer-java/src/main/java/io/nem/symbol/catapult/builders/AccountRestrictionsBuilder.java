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
* Binary layout for account restrictions
**/
public class AccountRestrictionsBuilder extends StateHeaderBuilder implements Serializer {

    /** Address on which restrictions are placed. **/
    private final AddressDto address;

    /** Account restrictions. **/
    private final List<AccountRestrictionsInfoBuilder> restrictions;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountRestrictionsBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.address = AddressDto.loadFromBinary(stream);
            final long restrictionsCount = Long.reverseBytes(stream.readLong());
            this.restrictions = GeneratorUtils.loadFromBinaryArray(AccountRestrictionsInfoBuilder::loadFromBinary, stream, restrictionsCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountRestrictionsBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountRestrictionsBuilder.
     */
    public static AccountRestrictionsBuilder loadFromBinary(DataInputStream stream) {
        return new AccountRestrictionsBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param address Address on which restrictions are placed.
    * @param restrictions Account restrictions.
    */
    protected AccountRestrictionsBuilder(short version, AddressDto address, List<AccountRestrictionsInfoBuilder> restrictions) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(address, "address is null");
        GeneratorUtils.notNull(restrictions, "restrictions is null");
        this.address = address;
        this.restrictions = restrictions;
    }
    
    /**
     * Creates an instance of AccountRestrictionsBuilder.
     *
     * @param version Serialization version.
     * @param address Address on which restrictions are placed.
     * @param restrictions Account restrictions.
     * @return Instance of AccountRestrictionsBuilder.
     */
    public static AccountRestrictionsBuilder create(short version, AddressDto address, List<AccountRestrictionsInfoBuilder> restrictions) {
        return new AccountRestrictionsBuilder(version, address, restrictions);
    }

    /**
     * Gets address on which restrictions are placed.
     *
     * @return Address on which restrictions are placed.
     */
    public AddressDto getAddress() {
        return this.address;
    }

    /**
     * Gets account restrictions.
     *
     * @return Account restrictions.
     */
    public List<AccountRestrictionsInfoBuilder> getRestrictions() {
        return this.restrictions;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.address.getSize();
        size += 8; // restrictionsCount
        size +=  GeneratorUtils.getSumSize(this.restrictions, 0);
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
            GeneratorUtils.writeEntity(dataOutputStream, this.address);
            dataOutputStream.writeLong(Long.reverseBytes((long) GeneratorUtils.getSize(this.getRestrictions())));
            GeneratorUtils.writeList(dataOutputStream, this.restrictions, 0);
        });
    }
}


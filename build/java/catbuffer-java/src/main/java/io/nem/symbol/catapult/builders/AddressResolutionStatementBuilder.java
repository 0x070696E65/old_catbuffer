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
* Binary layout for an address resolution statement
**/
public class AddressResolutionStatementBuilder extends ReceiptBuilder implements Serializer {

    /** Unresolved address. **/
    private final UnresolvedAddressDto unresolved;

    /** Resolution entries. **/
    private final List<AddressResolutionEntryBuilder> resolutionEntries;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AddressResolutionStatementBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.unresolved = UnresolvedAddressDto.loadFromBinary(stream);
            this.resolutionEntries = GeneratorUtils.loadFromBinaryArrayRemaining(AddressResolutionEntryBuilder::loadFromBinary, stream, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AddressResolutionStatementBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AddressResolutionStatementBuilder.
     */
    public static AddressResolutionStatementBuilder loadFromBinary(DataInputStream stream) {
        return new AddressResolutionStatementBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Receipt version.
    * @param type Receipt type.
    * @param unresolved Unresolved address.
    * @param resolutionEntries Resolution entries.
    */
    protected AddressResolutionStatementBuilder(short version, ReceiptTypeDto type, UnresolvedAddressDto unresolved, List<AddressResolutionEntryBuilder> resolutionEntries) {
        super(version, type);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(unresolved, "unresolved is null");
        GeneratorUtils.notNull(resolutionEntries, "resolutionEntries is null");
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    
    /**
     * Creates an instance of AddressResolutionStatementBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param unresolved Unresolved address.
     * @param resolutionEntries Resolution entries.
     * @return Instance of AddressResolutionStatementBuilder.
     */
    public static AddressResolutionStatementBuilder create(short version, ReceiptTypeDto type, UnresolvedAddressDto unresolved, List<AddressResolutionEntryBuilder> resolutionEntries) {
        return new AddressResolutionStatementBuilder(version, type, unresolved, resolutionEntries);
    }

    /**
     * Gets unresolved address.
     *
     * @return Unresolved address.
     */
    public UnresolvedAddressDto getUnresolved() {
        return this.unresolved;
    }

    /**
     * Gets resolution entries.
     *
     * @return Resolution entries.
     */
    public List<AddressResolutionEntryBuilder> getResolutionEntries() {
        return this.resolutionEntries;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.unresolved.getSize();
        size +=  GeneratorUtils.getSumSize(this.resolutionEntries, 0);
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
            GeneratorUtils.writeEntity(dataOutputStream, this.unresolved);
            GeneratorUtils.writeList(dataOutputStream, this.resolutionEntries, 0);
        });
    }
}


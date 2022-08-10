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

/** Address. */
public final class AddressDto implements Serializer {
    /** Address. */
    private final ByteBuffer address;

    /**
     * Constructor.
     *
     * @param address Address.
     */
    public AddressDto(final ByteBuffer address) {
        this.address = address;
    }

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize.
     */
    public AddressDto(final DataInputStream stream) {
        try {
            this.address = GeneratorUtils.readByteBuffer(stream, 24);
        } catch(Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Gets Address.
     *
     * @return Address.
     */
    public ByteBuffer getAddress() {
        return this.address;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        return 24;
    }

    /**
     * Creates an instance of AddressDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AddressDto.
     */
    public static AddressDto loadFromBinary(final DataInputStream stream) {
        return new AddressDto(stream);
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize(dataOutputStream -> {
            dataOutputStream.write(this.address.array(), 0, this.address.array().length);
        });
    }
}


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

/** Unresolved address. */
public final class UnresolvedAddressDto implements Serializer {
    /** Unresolved address. */
    private final ByteBuffer unresolvedAddress;

    /**
     * Constructor.
     *
     * @param unresolvedAddress Unresolved address.
     */
    public UnresolvedAddressDto(final ByteBuffer unresolvedAddress) {
        this.unresolvedAddress = unresolvedAddress;
    }

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize.
     */
    public UnresolvedAddressDto(final DataInputStream stream) {
        try {
            this.unresolvedAddress = GeneratorUtils.readByteBuffer(stream, 24);
        } catch(Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Gets Unresolved address.
     *
     * @return Unresolved address.
     */
    public ByteBuffer getUnresolvedAddress() {
        return this.unresolvedAddress;
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
     * Creates an instance of UnresolvedAddressDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of UnresolvedAddressDto.
     */
    public static UnresolvedAddressDto loadFromBinary(final DataInputStream stream) {
        return new UnresolvedAddressDto(stream);
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize(dataOutputStream -> {
            dataOutputStream.write(this.unresolvedAddress.array(), 0, this.unresolvedAddress.array().length);
        });
    }
}


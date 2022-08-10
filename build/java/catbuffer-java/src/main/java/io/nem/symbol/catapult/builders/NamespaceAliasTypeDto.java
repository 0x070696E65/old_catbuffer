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

/**
* Namespace alias type
**/
public enum NamespaceAliasTypeDto implements Serializer {

    /** no alias. */
    NONE((byte) 0),

    /** if alias is mosaicId. */
    MOSAIC_ID((byte) 1),

    /** if alias is address. */
    ADDRESS((byte) 2);


    /** Enum value. */
    private final byte value;

    /**
     * Constructor.
     *
     * @param value Enum value.
     */
     NamespaceAliasTypeDto(final byte value) {
        this.value = value;
    }

    /**
     * Gets enum value.
     *
     * @param value Raw value of the enum.
     * @return Enum value.
     */
    public static NamespaceAliasTypeDto rawValueOf(final byte value) {
        for (NamespaceAliasTypeDto current : NamespaceAliasTypeDto.values()) {
            if (value == current.value) {
                return current;
            }
        }
        throw new IllegalArgumentException(value + " was not a backing value for NamespaceAliasTypeDto.");
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        return 1;
    }

    /**
     * Gets the value of the enum.
     *
     * @return Value of the enum.
     */
    public byte getValue() {
        return this.value;
    }
    /**
     * Creates an instance of NamespaceAliasTypeDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceAliasTypeDto.
     */
    public static NamespaceAliasTypeDto loadFromBinary(final DataInputStream stream) {
        try {
            final byte streamValue = stream.readByte();
            return rawValueOf(streamValue);
        } catch(Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize(dataOutputStream -> {
            dataOutputStream.writeByte(this.value);
        });
    }
}


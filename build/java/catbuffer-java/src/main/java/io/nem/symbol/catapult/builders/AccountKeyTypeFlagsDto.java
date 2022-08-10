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
* Enumeration of account key type flags
**/
public enum AccountKeyTypeFlagsDto implements BitMaskable, Serializer {

    /** unset key. */
    UNSET((byte) 0),

    /** linked account public key \note this can be either a remote or main account public key depending on context. */
    LINKED((byte) 1),

    /** node public key on which remote is allowed to harvest. */
    NODE((byte) 2),

    /** VRF public key. */
    VRF((byte) 4);


    /** Enum value. */
    private final byte value;

    /**
     * Constructor.
     *
     * @param value Enum value.
     */
     AccountKeyTypeFlagsDto(final byte value) {
        this.value = value;
    }

    /**
     * Gets enum value.
     *
     * @param value Raw value of the enum.
     * @return Enum value.
     */
    public static AccountKeyTypeFlagsDto rawValueOf(final byte value) {
        for (AccountKeyTypeFlagsDto current : AccountKeyTypeFlagsDto.values()) {
            if (value == current.value) {
                return current;
            }
        }
        throw new IllegalArgumentException(value + " was not a backing value for AccountKeyTypeFlagsDto.");
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
     * Gets the value of the enum.
     *
     * @return Value of the enum.
     */
    public long getValueAsLong() {
        return GeneratorUtils.toUnsignedInt(this.value);
    }

    /**
     * Creates an instance of AccountKeyTypeFlagsDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountKeyTypeFlagsDto.
     */
    public static AccountKeyTypeFlagsDto loadFromBinary(final DataInputStream stream) {
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


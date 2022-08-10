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
* Enumeration of account types
**/
public enum AccountTypeDto implements Serializer {

    /** account is not linked to another account. */
    UNLINKED((byte) 0),

    /** account is a balance-holding account that is linked to a remote harvester account. */
    MAIN((byte) 1),

    /** account is a remote harvester account that is linked to a balance-holding account. */
    REMOTE((byte) 2),

    /** account is a remote harvester eligible account that is unlinked \note this allows an account that has previously been used as remote to be reused as a remote. */
    REMOTE_UNLINKED((byte) 3);


    /** Enum value. */
    private final byte value;

    /**
     * Constructor.
     *
     * @param value Enum value.
     */
     AccountTypeDto(final byte value) {
        this.value = value;
    }

    /**
     * Gets enum value.
     *
     * @param value Raw value of the enum.
     * @return Enum value.
     */
    public static AccountTypeDto rawValueOf(final byte value) {
        for (AccountTypeDto current : AccountTypeDto.values()) {
            if (value == current.value) {
                return current;
            }
        }
        throw new IllegalArgumentException(value + " was not a backing value for AccountTypeDto.");
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
     * Creates an instance of AccountTypeDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountTypeDto.
     */
    public static AccountTypeDto loadFromBinary(final DataInputStream stream) {
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


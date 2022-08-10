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
* Enumeration of receipt types
**/
public enum ReceiptTypeDto implements Serializer {

    /** reserved receipt type. */
    RESERVED((short) 0),

    /** mosaic rental fee receipt type. */
    MOSAIC_RENTAL_FEE((short) 4685),

    /** namespace rental fee receipt type. */
    NAMESPACE_RENTAL_FEE((short) 4942),

    /** harvest fee receipt type. */
    HARVEST_FEE((short) 8515),

    /** lock hash completed receipt type. */
    LOCK_HASH_COMPLETED((short) 8776),

    /** lock hash expired receipt type. */
    LOCK_HASH_EXPIRED((short) 9032),

    /** lock secret completed receipt type. */
    LOCK_SECRET_COMPLETED((short) 8786),

    /** lock secret expired receipt type. */
    LOCK_SECRET_EXPIRED((short) 9042),

    /** lock hash created receipt type. */
    LOCK_HASH_CREATED((short) 12616),

    /** lock secret created receipt type. */
    LOCK_SECRET_CREATED((short) 12626),

    /** mosaic expired receipt type. */
    MOSAIC_EXPIRED((short) 16717),

    /** namespace expired receipt type. */
    NAMESPACE_EXPIRED((short) 16718),

    /** namespace deleted receipt type. */
    NAMESPACE_DELETED((short) 16974),

    /** inflation receipt type. */
    INFLATION((short) 20803),

    /** transaction group receipt type. */
    TRANSACTION_GROUP((short) 57667),

    /** address alias resolution receipt type. */
    ADDRESS_ALIAS_RESOLUTION((short) 61763),

    /** mosaic alias resolution receipt type. */
    MOSAIC_ALIAS_RESOLUTION((short) 62019);


    /** Enum value. */
    private final short value;

    /**
     * Constructor.
     *
     * @param value Enum value.
     */
     ReceiptTypeDto(final short value) {
        this.value = value;
    }

    /**
     * Gets enum value.
     *
     * @param value Raw value of the enum.
     * @return Enum value.
     */
    public static ReceiptTypeDto rawValueOf(final short value) {
        for (ReceiptTypeDto current : ReceiptTypeDto.values()) {
            if (value == current.value) {
                return current;
            }
        }
        throw new IllegalArgumentException(value + " was not a backing value for ReceiptTypeDto.");
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        return 2;
    }

    /**
     * Gets the value of the enum.
     *
     * @return Value of the enum.
     */
    public short getValue() {
        return this.value;
    }
    /**
     * Creates an instance of ReceiptTypeDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of ReceiptTypeDto.
     */
    public static ReceiptTypeDto loadFromBinary(final DataInputStream stream) {
        try {
            final short streamValue = Short.reverseBytes(stream.readShort());
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
            dataOutputStream.writeShort(Short.reverseBytes(this.value));
        });
    }
}


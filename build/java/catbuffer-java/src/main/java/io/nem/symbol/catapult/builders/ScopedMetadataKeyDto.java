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

/** Scoped metadata key. */
public final class ScopedMetadataKeyDto implements Serializer {
    /** Scoped metadata key. */
    private final long scopedMetadataKey;

    /**
     * Constructor.
     *
     * @param scopedMetadataKey Scoped metadata key.
     */
    public ScopedMetadataKeyDto(final long scopedMetadataKey) {
        this.scopedMetadataKey = scopedMetadataKey;
    }

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize.
     */
    public ScopedMetadataKeyDto(final DataInputStream stream) {
        try {
            this.scopedMetadataKey = Long.reverseBytes(stream.readLong());
        } catch(Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Gets Scoped metadata key.
     *
     * @return Scoped metadata key.
     */
    public long getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        return 8;
    }

    /**
     * Creates an instance of ScopedMetadataKeyDto from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of ScopedMetadataKeyDto.
     */
    public static ScopedMetadataKeyDto loadFromBinary(final DataInputStream stream) {
        return new ScopedMetadataKeyDto(stream);
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize(dataOutputStream -> {
            dataOutputStream.writeLong(Long.reverseBytes(this.getScopedMetadataKey()));
        });
    }
}


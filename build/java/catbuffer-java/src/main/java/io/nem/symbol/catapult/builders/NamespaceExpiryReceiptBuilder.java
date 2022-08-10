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
* Binary layout for a namespace expiry receipt
**/
public class NamespaceExpiryReceiptBuilder extends ReceiptBuilder implements Serializer {

    /** Expiring namespace id. **/
    private final NamespaceIdDto artifactId;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceExpiryReceiptBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.artifactId = NamespaceIdDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceExpiryReceiptBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceExpiryReceiptBuilder.
     */
    public static NamespaceExpiryReceiptBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceExpiryReceiptBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Receipt version.
    * @param type Receipt type.
    * @param artifactId Expiring namespace id.
    */
    protected NamespaceExpiryReceiptBuilder(short version, ReceiptTypeDto type, NamespaceIdDto artifactId) {
        super(version, type);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(artifactId, "artifactId is null");
        this.artifactId = artifactId;
    }
    
    /**
     * Creates an instance of NamespaceExpiryReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param artifactId Expiring namespace id.
     * @return Instance of NamespaceExpiryReceiptBuilder.
     */
    public static NamespaceExpiryReceiptBuilder create(short version, ReceiptTypeDto type, NamespaceIdDto artifactId) {
        return new NamespaceExpiryReceiptBuilder(version, type, artifactId);
    }

    /**
     * Gets expiring namespace id.
     *
     * @return Expiring namespace id.
     */
    public NamespaceIdDto getArtifactId() {
        return this.artifactId;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.artifactId.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.artifactId);
        });
    }
}


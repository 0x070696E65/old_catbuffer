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
* Binary layout for an embedded transaction
**/
public class EmbeddedTransactionBuilder implements Serializer {

    /** Entity size. **/
    private int size;

    /** Reserved padding to align end of EmbeddedTransactionHeader on 8-byte boundary. **/
    private final int embeddedTransactionHeader_Reserved1;

    /** Entity signer's public key. **/
    private final KeyDto signerPublicKey;

    /** Reserved padding to align end of EntityBody on 8-byte boundary. **/
    private final int entityBody_Reserved1;

    /** Entity version. **/
    private final byte version;

    /** Entity network. **/
    private final NetworkTypeDto network;

    /** Entity type. **/
    private final EntityTypeDto type;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected EmbeddedTransactionBuilder(DataInputStream stream) {
        try {
            this.size = Integer.reverseBytes(stream.readInt());
            this.embeddedTransactionHeader_Reserved1 = Integer.reverseBytes(stream.readInt());
            this.signerPublicKey = KeyDto.loadFromBinary(stream);
            this.entityBody_Reserved1 = Integer.reverseBytes(stream.readInt());
            this.version = stream.readByte();
            this.network = NetworkTypeDto.loadFromBinary(stream);
            this.type = EntityTypeDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of EmbeddedTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of EmbeddedTransactionBuilder.
     */
    public static EmbeddedTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new EmbeddedTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    */
    protected EmbeddedTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type) {
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        this.embeddedTransactionHeader_Reserved1 = 0;
        this.signerPublicKey = signerPublicKey;
        this.entityBody_Reserved1 = 0;
        this.version = version;
        this.network = network;
        this.type = type;
    }
    
    /**
     * Creates an instance of EmbeddedTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @return Instance of EmbeddedTransactionBuilder.
     */
    public static EmbeddedTransactionBuilder create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type) {
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
    }

    /**
     * Gets entity size.
     *
     * @return Entity size.
     */
    public int getStreamSize() {
        return this.size;
    }

    /**
     * Gets reserved padding to align end of EmbeddedTransactionHeader on 8-byte boundary.
     *
     * @return Reserved padding to align end of EmbeddedTransactionHeader on 8-byte boundary.
     */
    private int getEmbeddedTransactionHeader_Reserved1() {
        return this.embeddedTransactionHeader_Reserved1;
    }

    /**
     * Gets entity signer's public key.
     *
     * @return Entity signer's public key.
     */
    public KeyDto getSignerPublicKey() {
        return this.signerPublicKey;
    }

    /**
     * Gets reserved padding to align end of EntityBody on 8-byte boundary.
     *
     * @return Reserved padding to align end of EntityBody on 8-byte boundary.
     */
    private int getEntityBody_Reserved1() {
        return this.entityBody_Reserved1;
    }

    /**
     * Gets entity version.
     *
     * @return Entity version.
     */
    public byte getVersion() {
        return this.version;
    }

    /**
     * Gets entity network.
     *
     * @return Entity network.
     */
    public NetworkTypeDto getNetwork() {
        return this.network;
    }

    /**
     * Gets entity type.
     *
     * @return Entity type.
     */
    public EntityTypeDto getType() {
        return this.type;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 4; // size
        size += 4; // embeddedTransactionHeader_Reserved1
        size += this.signerPublicKey.getSize();
        size += 4; // entityBody_Reserved1
        size += 1; // version
        size += this.network.getSize();
        size += this.type.getSize();
        return size;
    }


    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public Serializer getBody() {
        return null;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getSize()));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getEmbeddedTransactionHeader_Reserved1()));
            GeneratorUtils.writeEntity(dataOutputStream, this.signerPublicKey);
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getEntityBody_Reserved1()));
            dataOutputStream.writeByte((byte) this.getVersion());
            GeneratorUtils.writeEntity(dataOutputStream, this.network);
            GeneratorUtils.writeEntity(dataOutputStream, this.type);
        });
    }
}


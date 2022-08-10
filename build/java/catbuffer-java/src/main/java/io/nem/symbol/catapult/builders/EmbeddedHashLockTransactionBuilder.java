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
* Binary layout for an embedded hash lock transaction
**/
public class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {

    /** Hash lock transaction body. **/
    private final HashLockTransactionBodyBuilder hashLockTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected EmbeddedHashLockTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.hashLockTransactionBody = HashLockTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of EmbeddedHashLockTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of EmbeddedHashLockTransactionBuilder.
     */
    public static EmbeddedHashLockTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new EmbeddedHashLockTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param mosaic Lock mosaic.
    * @param duration Number of blocks for which a lock should be valid.
    * @param hash Lock hash.
    */
    protected EmbeddedHashLockTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
        super(signerPublicKey, version, network, type);
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(duration, "duration is null");
        GeneratorUtils.notNull(hash, "hash is null");
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    
    /**
     * Creates an instance of EmbeddedHashLockTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     * @return Instance of EmbeddedHashLockTransactionBuilder.
     */
    public static EmbeddedHashLockTransactionBuilder create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
        return new EmbeddedHashLockTransactionBuilder(signerPublicKey, version, network, type, mosaic, duration, hash);
    }

    /**
     * Gets lock mosaic.
     *
     * @return Lock mosaic.
     */
    public UnresolvedMosaicBuilder getMosaic() {
        return this.hashLockTransactionBody.getMosaic();
    }

    /**
     * Gets number of blocks for which a lock should be valid.
     *
     * @return Number of blocks for which a lock should be valid.
     */
    public BlockDurationDto getDuration() {
        return this.hashLockTransactionBody.getDuration();
    }

    /**
     * Gets lock hash.
     *
     * @return Lock hash.
     */
    public Hash256Dto getHash() {
        return this.hashLockTransactionBody.getHash();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.hashLockTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public HashLockTransactionBodyBuilder getBody() {
        return this.hashLockTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.hashLockTransactionBody);
        });
    }
}


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
* Binary layout for a non-embedded hash lock transaction
**/
public class HashLockTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Hash lock transaction body. **/
    private final HashLockTransactionBodyBuilder hashLockTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected HashLockTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.hashLockTransactionBody = HashLockTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of HashLockTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of HashLockTransactionBuilder.
     */
    public static HashLockTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new HashLockTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signature Entity signature.
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param fee Transaction fee.
    * @param deadline Transaction deadline.
    * @param mosaic Lock mosaic.
    * @param duration Number of blocks for which a lock should be valid.
    * @param hash Lock hash.
    */
    protected HashLockTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(mosaic, "mosaic is null");
        GeneratorUtils.notNull(duration, "duration is null");
        GeneratorUtils.notNull(hash, "hash is null");
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    
    /**
     * Creates an instance of HashLockTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     * @return Instance of HashLockTransactionBuilder.
     */
    public static HashLockTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
        return new HashLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash);
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


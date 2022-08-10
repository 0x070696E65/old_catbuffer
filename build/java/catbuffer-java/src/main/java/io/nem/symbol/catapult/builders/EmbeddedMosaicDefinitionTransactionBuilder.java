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
* Binary layout for an embedded mosaic definition transaction
**/
public class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {

    /** Mosaic definition transaction body. **/
    private final MosaicDefinitionTransactionBodyBuilder mosaicDefinitionTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected EmbeddedMosaicDefinitionTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of EmbeddedMosaicDefinitionTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of EmbeddedMosaicDefinitionTransactionBuilder.
     */
    public static EmbeddedMosaicDefinitionTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new EmbeddedMosaicDefinitionTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param id Mosaic identifier.
    * @param duration Mosaic duration.
    * @param nonce Mosaic nonce.
    * @param flags Mosaic flags.
    * @param divisibility Mosaic divisibility.
    */
    protected EmbeddedMosaicDefinitionTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, EnumSet<MosaicFlagsDto> flags, byte divisibility) {
        super(signerPublicKey, version, network, type);
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(id, "id is null");
        GeneratorUtils.notNull(duration, "duration is null");
        GeneratorUtils.notNull(nonce, "nonce is null");
        GeneratorUtils.notNull(flags, "flags is null");
        GeneratorUtils.notNull(divisibility, "divisibility is null");
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }
    
    /**
     * Creates an instance of EmbeddedMosaicDefinitionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param id Mosaic identifier.
     * @param duration Mosaic duration.
     * @param nonce Mosaic nonce.
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @return Instance of EmbeddedMosaicDefinitionTransactionBuilder.
     */
    public static EmbeddedMosaicDefinitionTransactionBuilder create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, EnumSet<MosaicFlagsDto> flags, byte divisibility) {
        return new EmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility);
    }

    /**
     * Gets mosaic identifier.
     *
     * @return Mosaic identifier.
     */
    public MosaicIdDto getId() {
        return this.mosaicDefinitionTransactionBody.getId();
    }

    /**
     * Gets mosaic duration.
     *
     * @return Mosaic duration.
     */
    public BlockDurationDto getDuration() {
        return this.mosaicDefinitionTransactionBody.getDuration();
    }

    /**
     * Gets mosaic nonce.
     *
     * @return Mosaic nonce.
     */
    public MosaicNonceDto getNonce() {
        return this.mosaicDefinitionTransactionBody.getNonce();
    }

    /**
     * Gets mosaic flags.
     *
     * @return Mosaic flags.
     */
    public EnumSet<MosaicFlagsDto> getFlags() {
        return this.mosaicDefinitionTransactionBody.getFlags();
    }

    /**
     * Gets mosaic divisibility.
     *
     * @return Mosaic divisibility.
     */
    public byte getDivisibility() {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.mosaicDefinitionTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public MosaicDefinitionTransactionBodyBuilder getBody() {
        return this.mosaicDefinitionTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicDefinitionTransactionBody);
        });
    }
}


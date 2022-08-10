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
* Binary layout for a non-embedded mosaic supply change transaction
**/
public class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Mosaic supply change transaction body. **/
    private final MosaicSupplyChangeTransactionBodyBuilder mosaicSupplyChangeTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicSupplyChangeTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicSupplyChangeTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicSupplyChangeTransactionBuilder.
     */
    public static MosaicSupplyChangeTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicSupplyChangeTransactionBuilder(stream);
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
    * @param mosaicId Affected mosaic identifier.
    * @param delta Change amount.
    * @param action Supply change action.
    */
    protected MosaicSupplyChangeTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicIdDto mosaicId, AmountDto delta, MosaicSupplyChangeActionDto action) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(delta, "delta is null");
        GeneratorUtils.notNull(action, "action is null");
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }
    
    /**
     * Creates an instance of MosaicSupplyChangeTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param mosaicId Affected mosaic identifier.
     * @param delta Change amount.
     * @param action Supply change action.
     * @return Instance of MosaicSupplyChangeTransactionBuilder.
     */
    public static MosaicSupplyChangeTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicIdDto mosaicId, AmountDto delta, MosaicSupplyChangeActionDto action) {
        return new MosaicSupplyChangeTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action);
    }

    /**
     * Gets affected mosaic identifier.
     *
     * @return Affected mosaic identifier.
     */
    public UnresolvedMosaicIdDto getMosaicId() {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    }

    /**
     * Gets change amount.
     *
     * @return Change amount.
     */
    public AmountDto getDelta() {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    }

    /**
     * Gets supply change action.
     *
     * @return Supply change action.
     */
    public MosaicSupplyChangeActionDto getAction() {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.mosaicSupplyChangeTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public MosaicSupplyChangeTransactionBodyBuilder getBody() {
        return this.mosaicSupplyChangeTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicSupplyChangeTransactionBody);
        });
    }
}


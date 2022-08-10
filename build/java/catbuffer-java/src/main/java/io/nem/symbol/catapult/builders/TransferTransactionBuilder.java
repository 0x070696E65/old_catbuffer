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
* Binary layout for a non-embedded transfer transaction
**/
public class TransferTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Transfer transaction body. **/
    private final TransferTransactionBodyBuilder transferTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected TransferTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.transferTransactionBody = TransferTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of TransferTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of TransferTransactionBuilder.
     */
    public static TransferTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new TransferTransactionBuilder(stream);
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
    * @param recipientAddress Recipient address.
    * @param mosaics Attached mosaics.
    * @param message Attached message.
    */
    protected TransferTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto recipientAddress, List<UnresolvedMosaicBuilder> mosaics, ByteBuffer message) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(recipientAddress, "recipientAddress is null");
        GeneratorUtils.notNull(mosaics, "mosaics is null");
        GeneratorUtils.notNull(message, "message is null");
        this.transferTransactionBody = new TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }
    
    /**
     * Creates an instance of TransferTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     * @return Instance of TransferTransactionBuilder.
     */
    public static TransferTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto recipientAddress, List<UnresolvedMosaicBuilder> mosaics, ByteBuffer message) {
        return new TransferTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message);
    }

    /**
     * Gets recipient address.
     *
     * @return Recipient address.
     */
    public UnresolvedAddressDto getRecipientAddress() {
        return this.transferTransactionBody.getRecipientAddress();
    }

    /**
     * Gets attached mosaics.
     *
     * @return Attached mosaics.
     */
    public List<UnresolvedMosaicBuilder> getMosaics() {
        return this.transferTransactionBody.getMosaics();
    }

    /**
     * Gets attached message.
     *
     * @return Attached message.
     */
    public ByteBuffer getMessage() {
        return this.transferTransactionBody.getMessage();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.transferTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public TransferTransactionBodyBuilder getBody() {
        return this.transferTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.transferTransactionBody);
        });
    }
}


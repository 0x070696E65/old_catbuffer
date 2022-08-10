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
* Binary layout for a non-embedded node key link transaction
**/
public class NodeKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Node key link transaction body. **/
    private final NodeKeyLinkTransactionBodyBuilder nodeKeyLinkTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NodeKeyLinkTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NodeKeyLinkTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NodeKeyLinkTransactionBuilder.
     */
    public static NodeKeyLinkTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new NodeKeyLinkTransactionBuilder(stream);
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
    * @param linkedPublicKey Linked public key.
    * @param linkAction Link action.
    */
    protected NodeKeyLinkTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, KeyDto linkedPublicKey, LinkActionDto linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(linkedPublicKey, "linkedPublicKey is null");
        GeneratorUtils.notNull(linkAction, "linkAction is null");
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    
    /**
     * Creates an instance of NodeKeyLinkTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     * @return Instance of NodeKeyLinkTransactionBuilder.
     */
    public static NodeKeyLinkTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, KeyDto linkedPublicKey, LinkActionDto linkAction) {
        return new NodeKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction);
    }

    /**
     * Gets linked public key.
     *
     * @return Linked public key.
     */
    public KeyDto getLinkedPublicKey() {
        return this.nodeKeyLinkTransactionBody.getLinkedPublicKey();
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public LinkActionDto getLinkAction() {
        return this.nodeKeyLinkTransactionBody.getLinkAction();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.nodeKeyLinkTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public NodeKeyLinkTransactionBodyBuilder getBody() {
        return this.nodeKeyLinkTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.nodeKeyLinkTransactionBody);
        });
    }
}


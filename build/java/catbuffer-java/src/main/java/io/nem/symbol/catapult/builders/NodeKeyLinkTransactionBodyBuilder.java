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
* Binary layout for a node key link transaction
**/
public class NodeKeyLinkTransactionBodyBuilder implements Serializer {

    /** Linked public key. **/
    private final KeyDto linkedPublicKey;

    /** Link action. **/
    private final LinkActionDto linkAction;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NodeKeyLinkTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.linkedPublicKey = KeyDto.loadFromBinary(stream);
            this.linkAction = LinkActionDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NodeKeyLinkTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NodeKeyLinkTransactionBodyBuilder.
     */
    public static NodeKeyLinkTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new NodeKeyLinkTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param linkedPublicKey Linked public key.
    * @param linkAction Link action.
    */
    protected NodeKeyLinkTransactionBodyBuilder(KeyDto linkedPublicKey, LinkActionDto linkAction) {
        GeneratorUtils.notNull(linkedPublicKey, "linkedPublicKey is null");
        GeneratorUtils.notNull(linkAction, "linkAction is null");
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }
    
    /**
     * Creates an instance of NodeKeyLinkTransactionBodyBuilder.
     *
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     * @return Instance of NodeKeyLinkTransactionBodyBuilder.
     */
    public static NodeKeyLinkTransactionBodyBuilder create(KeyDto linkedPublicKey, LinkActionDto linkAction) {
        return new NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }

    /**
     * Gets linked public key.
     *
     * @return Linked public key.
     */
    public KeyDto getLinkedPublicKey() {
        return this.linkedPublicKey;
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public LinkActionDto getLinkAction() {
        return this.linkAction;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.linkedPublicKey.getSize();
        size += this.linkAction.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.linkedPublicKey);
            GeneratorUtils.writeEntity(dataOutputStream, this.linkAction);
        });
    }
}


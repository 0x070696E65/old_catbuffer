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
* Binary layout for a voting key link transaction
**/
public class VotingKeyLinkTransactionBodyBuilder implements Serializer {

    /** Linked public key. **/
    private final VotingKeyDto linkedPublicKey;

    /** Start finalization epoch. **/
    private final FinalizationEpochDto startEpoch;

    /** End finalization epoch. **/
    private final FinalizationEpochDto endEpoch;

    /** Link action. **/
    private final LinkActionDto linkAction;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected VotingKeyLinkTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.linkedPublicKey = VotingKeyDto.loadFromBinary(stream);
            this.startEpoch = FinalizationEpochDto.loadFromBinary(stream);
            this.endEpoch = FinalizationEpochDto.loadFromBinary(stream);
            this.linkAction = LinkActionDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of VotingKeyLinkTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of VotingKeyLinkTransactionBodyBuilder.
     */
    public static VotingKeyLinkTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new VotingKeyLinkTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param linkedPublicKey Linked public key.
    * @param startEpoch Start finalization epoch.
    * @param endEpoch End finalization epoch.
    * @param linkAction Link action.
    */
    protected VotingKeyLinkTransactionBodyBuilder(VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction) {
        GeneratorUtils.notNull(linkedPublicKey, "linkedPublicKey is null");
        GeneratorUtils.notNull(startEpoch, "startEpoch is null");
        GeneratorUtils.notNull(endEpoch, "endEpoch is null");
        GeneratorUtils.notNull(linkAction, "linkAction is null");
        this.linkedPublicKey = linkedPublicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
        this.linkAction = linkAction;
    }
    
    /**
     * Creates an instance of VotingKeyLinkTransactionBodyBuilder.
     *
     * @param linkedPublicKey Linked public key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     * @param linkAction Link action.
     * @return Instance of VotingKeyLinkTransactionBodyBuilder.
     */
    public static VotingKeyLinkTransactionBodyBuilder create(VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction) {
        return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }

    /**
     * Gets linked public key.
     *
     * @return Linked public key.
     */
    public VotingKeyDto getLinkedPublicKey() {
        return this.linkedPublicKey;
    }

    /**
     * Gets start finalization epoch.
     *
     * @return Start finalization epoch.
     */
    public FinalizationEpochDto getStartEpoch() {
        return this.startEpoch;
    }

    /**
     * Gets end finalization epoch.
     *
     * @return End finalization epoch.
     */
    public FinalizationEpochDto getEndEpoch() {
        return this.endEpoch;
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
        size += this.startEpoch.getSize();
        size += this.endEpoch.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.startEpoch);
            GeneratorUtils.writeEntity(dataOutputStream, this.endEpoch);
            GeneratorUtils.writeEntity(dataOutputStream, this.linkAction);
        });
    }
}


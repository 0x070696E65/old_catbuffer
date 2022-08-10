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
* Binary layout for a non-embedded voting key link transaction
**/
public class VotingKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Voting key link transaction body. **/
    private final VotingKeyLinkTransactionBodyBuilder votingKeyLinkTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected VotingKeyLinkTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of VotingKeyLinkTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of VotingKeyLinkTransactionBuilder.
     */
    public static VotingKeyLinkTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new VotingKeyLinkTransactionBuilder(stream);
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
    * @param startEpoch Start finalization epoch.
    * @param endEpoch End finalization epoch.
    * @param linkAction Link action.
    */
    protected VotingKeyLinkTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(linkedPublicKey, "linkedPublicKey is null");
        GeneratorUtils.notNull(startEpoch, "startEpoch is null");
        GeneratorUtils.notNull(endEpoch, "endEpoch is null");
        GeneratorUtils.notNull(linkAction, "linkAction is null");
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }
    
    /**
     * Creates an instance of VotingKeyLinkTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param linkedPublicKey Linked public key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     * @param linkAction Link action.
     * @return Instance of VotingKeyLinkTransactionBuilder.
     */
    public static VotingKeyLinkTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction) {
        return new VotingKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction);
    }

    /**
     * Gets linked public key.
     *
     * @return Linked public key.
     */
    public VotingKeyDto getLinkedPublicKey() {
        return this.votingKeyLinkTransactionBody.getLinkedPublicKey();
    }

    /**
     * Gets start finalization epoch.
     *
     * @return Start finalization epoch.
     */
    public FinalizationEpochDto getStartEpoch() {
        return this.votingKeyLinkTransactionBody.getStartEpoch();
    }

    /**
     * Gets end finalization epoch.
     *
     * @return End finalization epoch.
     */
    public FinalizationEpochDto getEndEpoch() {
        return this.votingKeyLinkTransactionBody.getEndEpoch();
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public LinkActionDto getLinkAction() {
        return this.votingKeyLinkTransactionBody.getLinkAction();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.votingKeyLinkTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public VotingKeyLinkTransactionBodyBuilder getBody() {
        return this.votingKeyLinkTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.votingKeyLinkTransactionBody);
        });
    }
}


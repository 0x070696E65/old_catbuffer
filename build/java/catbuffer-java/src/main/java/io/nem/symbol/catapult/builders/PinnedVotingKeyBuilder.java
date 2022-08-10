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
* Pinned voting key
**/
public class PinnedVotingKeyBuilder implements Serializer {

    /** Voting key. **/
    private final VotingKeyDto votingKey;

    /** Start finalization epoch. **/
    private final FinalizationEpochDto startEpoch;

    /** End finalization epoch. **/
    private final FinalizationEpochDto endEpoch;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected PinnedVotingKeyBuilder(DataInputStream stream) {
        try {
            this.votingKey = VotingKeyDto.loadFromBinary(stream);
            this.startEpoch = FinalizationEpochDto.loadFromBinary(stream);
            this.endEpoch = FinalizationEpochDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of PinnedVotingKeyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of PinnedVotingKeyBuilder.
     */
    public static PinnedVotingKeyBuilder loadFromBinary(DataInputStream stream) {
        return new PinnedVotingKeyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param votingKey Voting key.
    * @param startEpoch Start finalization epoch.
    * @param endEpoch End finalization epoch.
    */
    protected PinnedVotingKeyBuilder(VotingKeyDto votingKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch) {
        GeneratorUtils.notNull(votingKey, "votingKey is null");
        GeneratorUtils.notNull(startEpoch, "startEpoch is null");
        GeneratorUtils.notNull(endEpoch, "endEpoch is null");
        this.votingKey = votingKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }
    
    /**
     * Creates an instance of PinnedVotingKeyBuilder.
     *
     * @param votingKey Voting key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     * @return Instance of PinnedVotingKeyBuilder.
     */
    public static PinnedVotingKeyBuilder create(VotingKeyDto votingKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch) {
        return new PinnedVotingKeyBuilder(votingKey, startEpoch, endEpoch);
    }

    /**
     * Gets voting key.
     *
     * @return Voting key.
     */
    public VotingKeyDto getVotingKey() {
        return this.votingKey;
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
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.votingKey.getSize();
        size += this.startEpoch.getSize();
        size += this.endEpoch.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.votingKey);
            GeneratorUtils.writeEntity(dataOutputStream, this.startEpoch);
            GeneratorUtils.writeEntity(dataOutputStream, this.endEpoch);
        });
    }
}


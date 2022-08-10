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

import { FinalizationEpochDto } from './FinalizationEpochDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { VotingKeyDto } from './VotingKeyDto';

/**
 *  Interface to create instances of PinnedVotingKeyBuilder.
 */
export interface PinnedVotingKeyBuilderParams {
    /** Voting key. **/
    votingKey: VotingKeyDto;
    /** Start finalization epoch. **/
    startEpoch: FinalizationEpochDto;
    /** End finalization epoch. **/
    endEpoch: FinalizationEpochDto;
}

/**
 * Pinned voting key
 **/
export class PinnedVotingKeyBuilder implements Serializer {
    /** Voting key. **/
    public readonly votingKey: VotingKeyDto;

    /** Start finalization epoch. **/
    public readonly startEpoch: FinalizationEpochDto;

    /** End finalization epoch. **/
    public readonly endEpoch: FinalizationEpochDto;

    /**
     * Constructor.
     *
     * @param votingKey Voting key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     */
    public constructor({ votingKey, startEpoch, endEpoch }: PinnedVotingKeyBuilderParams) {
        GeneratorUtils.notNull(votingKey, 'votingKey is null or undefined');
        GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        this.votingKey = votingKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): PinnedVotingKeyBuilder {
        const byteArray = Array.from(payload);
        const votingKey: VotingKeyDto = VotingKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKey.size);
        const startEpoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        return new PinnedVotingKeyBuilder({ votingKey: votingKey, startEpoch: startEpoch, endEpoch: endEpoch });
    }

    /**
     * Creates an instance of PinnedVotingKeyBuilder.
     *
     * @param votingKey Voting key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     * @return Instance of PinnedVotingKeyBuilder.
     */
    public static createPinnedVotingKeyBuilder(
        votingKey: VotingKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
    ): PinnedVotingKeyBuilder {
        return new PinnedVotingKeyBuilder({ votingKey: votingKey, startEpoch: startEpoch, endEpoch: endEpoch });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.votingKey.size; // votingKey
        size += this.startEpoch.size; // startEpoch
        size += this.endEpoch.size; // endEpoch
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const votingKeyBytes = this.votingKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        return newArray;
    }
}

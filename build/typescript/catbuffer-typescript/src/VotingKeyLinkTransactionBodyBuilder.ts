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
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
import { VotingKeyDto } from './VotingKeyDto';

/**
 *  Interface to create instances of VotingKeyLinkTransactionBodyBuilder.
 */
export interface VotingKeyLinkTransactionBodyBuilderParams {
    /** Linked public key. **/
    linkedPublicKey: VotingKeyDto;
    /** Start finalization epoch. **/
    startEpoch: FinalizationEpochDto;
    /** End finalization epoch. **/
    endEpoch: FinalizationEpochDto;
    /** Link action. **/
    linkAction: LinkActionDto;
}

/**
 * Binary layout for a voting key link transaction
 **/
export class VotingKeyLinkTransactionBodyBuilder implements Serializer {
    /** Linked public key. **/
    public readonly linkedPublicKey: VotingKeyDto;

    /** Start finalization epoch. **/
    public readonly startEpoch: FinalizationEpochDto;

    /** End finalization epoch. **/
    public readonly endEpoch: FinalizationEpochDto;

    /** Link action. **/
    public readonly linkAction: LinkActionDto;

    /**
     * Constructor.
     *
     * @param linkedPublicKey Linked public key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     * @param linkAction Link action.
     */
    public constructor({ linkedPublicKey, startEpoch, endEpoch, linkAction }: VotingKeyLinkTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
        this.linkAction = linkAction;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const linkedPublicKey: VotingKeyDto = VotingKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.size);
        const startEpoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch: FinalizationEpochDto = FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        const linkAction: LinkActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new VotingKeyLinkTransactionBodyBuilder({
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
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
    public static createVotingKeyLinkTransactionBodyBuilder(
        linkedPublicKey: VotingKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
        linkAction: LinkActionDto,
    ): VotingKeyLinkTransactionBodyBuilder {
        return new VotingKeyLinkTransactionBodyBuilder({
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.linkedPublicKey.size; // linkedPublicKey
        size += this.startEpoch.size; // startEpoch
        size += this.endEpoch.size; // endEpoch
        size += 1; // linkAction
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        const linkActionBytes = GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}

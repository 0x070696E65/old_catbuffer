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

import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { FinalizationEpochDto } from './FinalizationEpochDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { VotingKeyDto } from './VotingKeyDto';
import { VotingKeyLinkTransactionBodyBuilder } from './VotingKeyLinkTransactionBodyBuilder';

/**
 *  Interface to create instances of VotingKeyLinkTransactionBuilder.
 */
export interface VotingKeyLinkTransactionBuilderParams extends TransactionBuilderParams {
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
 * Binary layout for a non-embedded voting key link transaction
 **/
export class VotingKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.VOTING_KEY_LINK_TRANSACTION;

    /** Voting key link transaction body. **/
    public readonly votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder;

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
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        linkedPublicKey,
        startEpoch,
        endEpoch,
        linkAction,
    }: VotingKeyLinkTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder({ linkedPublicKey, startEpoch, endEpoch, linkAction });
        if (version !== VotingKeyLinkTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + VotingKeyLinkTransactionBuilder.VERSION,
            );
        if (type !== VotingKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + VotingKeyLinkTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder = VotingKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, votingKeyLinkTransactionBody.size);
        return new VotingKeyLinkTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            linkedPublicKey: votingKeyLinkTransactionBody.linkedPublicKey,
            startEpoch: votingKeyLinkTransactionBody.startEpoch,
            endEpoch: votingKeyLinkTransactionBody.endEpoch,
            linkAction: votingKeyLinkTransactionBody.linkAction,
        });
    }

    /**
     * Creates an instance of VotingKeyLinkTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param linkedPublicKey Linked public key.
     * @param startEpoch Start finalization epoch.
     * @param endEpoch End finalization epoch.
     * @param linkAction Link action.
     * @return Instance of VotingKeyLinkTransactionBuilder.
     */
    public static createVotingKeyLinkTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        linkedPublicKey: VotingKeyDto,
        startEpoch: FinalizationEpochDto,
        endEpoch: FinalizationEpochDto,
        linkAction: LinkActionDto,
    ): VotingKeyLinkTransactionBuilder {
        const version = VotingKeyLinkTransactionBuilder.VERSION;
        const type = VotingKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new VotingKeyLinkTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
    }

    /**
     * Gets linked public key.
     *
     * @return Linked public key.
     */
    public get linkedPublicKey(): VotingKeyDto {
        return this.votingKeyLinkTransactionBody.linkedPublicKey;
    }

    /**
     * Gets start finalization epoch.
     *
     * @return Start finalization epoch.
     */
    public get startEpoch(): FinalizationEpochDto {
        return this.votingKeyLinkTransactionBody.startEpoch;
    }

    /**
     * Gets end finalization epoch.
     *
     * @return End finalization epoch.
     */
    public get endEpoch(): FinalizationEpochDto {
        return this.votingKeyLinkTransactionBody.endEpoch;
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public get linkAction(): LinkActionDto {
        return this.votingKeyLinkTransactionBody.linkAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.votingKeyLinkTransactionBody.size; // votingKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): VotingKeyLinkTransactionBodyBuilder {
        return this.votingKeyLinkTransactionBody;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const votingKeyLinkTransactionBodyBytes = this.votingKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingKeyLinkTransactionBodyBytes);
        return newArray;
    }
}

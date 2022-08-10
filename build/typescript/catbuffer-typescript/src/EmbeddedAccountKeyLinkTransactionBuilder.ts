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

import { AccountKeyLinkTransactionBodyBuilder } from './AccountKeyLinkTransactionBodyBuilder';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of EmbeddedAccountKeyLinkTransactionBuilder.
 */
export interface EmbeddedAccountKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Linked public key. **/
    linkedPublicKey: KeyDto;
    /** Link action. **/
    linkAction: LinkActionDto;
}

/**
 * Binary layout for an embedded account key link transaction
 **/
export class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_ACCOUNT_KEY_LINK_TRANSACTION;

    /** Account key link transaction body. **/
    public readonly accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        linkedPublicKey,
        linkAction,
    }: EmbeddedAccountKeyLinkTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== EmbeddedAccountKeyLinkTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountKeyLinkTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder = AccountKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, accountKeyLinkTransactionBody.size);
        return new EmbeddedAccountKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: accountKeyLinkTransactionBody.linkedPublicKey,
            linkAction: accountKeyLinkTransactionBody.linkAction,
        });
    }

    /**
     * Creates an instance of EmbeddedAccountKeyLinkTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     * @return Instance of EmbeddedAccountKeyLinkTransactionBuilder.
     */
    public static createEmbeddedAccountKeyLinkTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        linkedPublicKey: KeyDto,
        linkAction: LinkActionDto,
    ): EmbeddedAccountKeyLinkTransactionBuilder {
        const version = EmbeddedAccountKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountKeyLinkTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            linkedPublicKey: linkedPublicKey,
            linkAction: linkAction,
        });
    }

    /**
     * Gets linked public key.
     *
     * @return Linked public key.
     */
    public get linkedPublicKey(): KeyDto {
        return this.accountKeyLinkTransactionBody.linkedPublicKey;
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public get linkAction(): LinkActionDto {
        return this.accountKeyLinkTransactionBody.linkAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.accountKeyLinkTransactionBody.size; // accountKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AccountKeyLinkTransactionBodyBuilder {
        return this.accountKeyLinkTransactionBody;
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
        const accountKeyLinkTransactionBodyBytes = this.accountKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountKeyLinkTransactionBodyBytes);
        return newArray;
    }
}

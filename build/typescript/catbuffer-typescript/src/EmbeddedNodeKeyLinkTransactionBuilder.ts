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

import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { NodeKeyLinkTransactionBodyBuilder } from './NodeKeyLinkTransactionBodyBuilder';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of EmbeddedNodeKeyLinkTransactionBuilder.
 */
export interface EmbeddedNodeKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Linked public key. **/
    linkedPublicKey: KeyDto;
    /** Link action. **/
    linkAction: LinkActionDto;
}

/**
 * Binary layout for an embedded node key link transaction
 **/
export class EmbeddedNodeKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_NODE_KEY_LINK_TRANSACTION;

    /** Node key link transaction body. **/
    public readonly nodeKeyLinkTransactionBody: NodeKeyLinkTransactionBodyBuilder;

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
    }: EmbeddedNodeKeyLinkTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== EmbeddedNodeKeyLinkTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedNodeKeyLinkTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedNodeKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const nodeKeyLinkTransactionBody: NodeKeyLinkTransactionBodyBuilder = NodeKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, nodeKeyLinkTransactionBody.size);
        return new EmbeddedNodeKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: nodeKeyLinkTransactionBody.linkedPublicKey,
            linkAction: nodeKeyLinkTransactionBody.linkAction,
        });
    }

    /**
     * Creates an instance of EmbeddedNodeKeyLinkTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     * @return Instance of EmbeddedNodeKeyLinkTransactionBuilder.
     */
    public static createEmbeddedNodeKeyLinkTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        linkedPublicKey: KeyDto,
        linkAction: LinkActionDto,
    ): EmbeddedNodeKeyLinkTransactionBuilder {
        const version = EmbeddedNodeKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedNodeKeyLinkTransactionBuilder({
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
        return this.nodeKeyLinkTransactionBody.linkedPublicKey;
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public get linkAction(): LinkActionDto {
        return this.nodeKeyLinkTransactionBody.linkAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.nodeKeyLinkTransactionBody.size; // nodeKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): NodeKeyLinkTransactionBodyBuilder {
        return this.nodeKeyLinkTransactionBody;
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
        const nodeKeyLinkTransactionBodyBytes = this.nodeKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, nodeKeyLinkTransactionBodyBytes);
        return newArray;
    }
}

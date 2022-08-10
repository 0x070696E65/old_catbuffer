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
import { Serializer } from './Serializer';
import { VrfKeyLinkTransactionBodyBuilder } from './VrfKeyLinkTransactionBodyBuilder';

/**
 *  Interface to create instances of EmbeddedVrfKeyLinkTransactionBuilder.
 */
export interface EmbeddedVrfKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Linked public key. **/
    linkedPublicKey: KeyDto;
    /** Link action. **/
    linkAction: LinkActionDto;
}

/**
 * Binary layout for an embedded vrf key link transaction
 **/
export class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_VRF_KEY_LINK_TRANSACTION;

    /** Vrf key link transaction body. **/
    public readonly vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder;

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
    }: EmbeddedVrfKeyLinkTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== EmbeddedVrfKeyLinkTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedVrfKeyLinkTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedVrfKeyLinkTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder = VrfKeyLinkTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, vrfKeyLinkTransactionBody.size);
        return new EmbeddedVrfKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: vrfKeyLinkTransactionBody.linkedPublicKey,
            linkAction: vrfKeyLinkTransactionBody.linkAction,
        });
    }

    /**
     * Creates an instance of EmbeddedVrfKeyLinkTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     * @return Instance of EmbeddedVrfKeyLinkTransactionBuilder.
     */
    public static createEmbeddedVrfKeyLinkTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        linkedPublicKey: KeyDto,
        linkAction: LinkActionDto,
    ): EmbeddedVrfKeyLinkTransactionBuilder {
        const version = EmbeddedVrfKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedVrfKeyLinkTransactionBuilder({
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
        return this.vrfKeyLinkTransactionBody.linkedPublicKey;
    }

    /**
     * Gets link action.
     *
     * @return Link action.
     */
    public get linkAction(): LinkActionDto {
        return this.vrfKeyLinkTransactionBody.linkAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.vrfKeyLinkTransactionBody.size; // vrfKeyLinkTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): VrfKeyLinkTransactionBodyBuilder {
        return this.vrfKeyLinkTransactionBody;
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
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}

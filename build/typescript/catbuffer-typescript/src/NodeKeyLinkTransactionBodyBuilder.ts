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

import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of NodeKeyLinkTransactionBodyBuilder.
 */
export interface NodeKeyLinkTransactionBodyBuilderParams {
    /** Linked public key. **/
    linkedPublicKey: KeyDto;
    /** Link action. **/
    linkAction: LinkActionDto;
}

/**
 * Binary layout for a node key link transaction
 **/
export class NodeKeyLinkTransactionBodyBuilder implements Serializer {
    /** Linked public key. **/
    public readonly linkedPublicKey: KeyDto;

    /** Link action. **/
    public readonly linkAction: LinkActionDto;

    /**
     * Constructor.
     *
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     */
    public constructor({ linkedPublicKey, linkAction }: NodeKeyLinkTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NodeKeyLinkTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const linkedPublicKey: KeyDto = KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.size);
        const linkAction: LinkActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new NodeKeyLinkTransactionBodyBuilder({ linkedPublicKey: linkedPublicKey, linkAction: linkAction });
    }

    /**
     * Creates an instance of NodeKeyLinkTransactionBodyBuilder.
     *
     * @param linkedPublicKey Linked public key.
     * @param linkAction Link action.
     * @return Instance of NodeKeyLinkTransactionBodyBuilder.
     */
    public static createNodeKeyLinkTransactionBodyBuilder(
        linkedPublicKey: KeyDto,
        linkAction: LinkActionDto,
    ): NodeKeyLinkTransactionBodyBuilder {
        return new NodeKeyLinkTransactionBodyBuilder({ linkedPublicKey: linkedPublicKey, linkAction: linkAction });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.linkedPublicKey.size; // linkedPublicKey
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
        const linkActionBytes = GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}

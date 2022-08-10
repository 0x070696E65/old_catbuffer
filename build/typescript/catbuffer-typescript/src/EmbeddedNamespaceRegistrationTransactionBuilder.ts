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

import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of EmbeddedNamespaceRegistrationTransactionBuilder.
 */
export interface EmbeddedNamespaceRegistrationTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Namespace duration. **/
    duration?: BlockDurationDto;
    /** Parent namespace identifier. **/
    parentId?: NamespaceIdDto;
    /** Namespace identifier. **/
    id: NamespaceIdDto;
    /** Namespace registration type. **/
    registrationType: NamespaceRegistrationTypeDto;
    /** Namespace name. **/
    name: Uint8Array;
}

/**
 * Binary layout for an embedded namespace registration transaction
 **/
export class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_NAMESPACE_REGISTRATION_TRANSACTION;

    /** Namespace registration transaction body. **/
    public readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param duration Namespace duration.
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param registrationType Namespace registration type.
     * @param name Namespace name.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        duration,
        parentId,
        id,
        registrationType,
        name,
    }: EmbeddedNamespaceRegistrationTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder({
            duration,
            parentId,
            id,
            registrationType,
            name,
        });
        if (version !== EmbeddedNamespaceRegistrationTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedNamespaceRegistrationTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder =
            NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.size);
        return new EmbeddedNamespaceRegistrationTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            duration: namespaceRegistrationTransactionBody.duration,
            parentId: namespaceRegistrationTransactionBody.parentId,
            id: namespaceRegistrationTransactionBody.id,
            registrationType: namespaceRegistrationTransactionBody.registrationType,
            name: namespaceRegistrationTransactionBody.name,
        });
    }

    /**
     * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param duration Namespace duration.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     */
    public static createEmbeddedNamespaceRegistrationTransactionBuilderRoot(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        duration: BlockDurationDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): EmbeddedNamespaceRegistrationTransactionBuilder {
        const version = EmbeddedNamespaceRegistrationTransactionBuilder.VERSION;
        const type = EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new EmbeddedNamespaceRegistrationTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            duration: duration,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }

    /**
     * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
     */
    public static createEmbeddedNamespaceRegistrationTransactionBuilderChild(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        parentId: NamespaceIdDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): EmbeddedNamespaceRegistrationTransactionBuilder {
        const version = EmbeddedNamespaceRegistrationTransactionBuilder.VERSION;
        const type = EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new EmbeddedNamespaceRegistrationTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }

    /**
     * Gets namespace duration.
     *
     * @return Namespace duration.
     */
    public get duration(): BlockDurationDto | undefined {
        return this.namespaceRegistrationTransactionBody.duration;
    }

    /**
     * Gets parent namespace identifier.
     *
     * @return Parent namespace identifier.
     */
    public get parentId(): NamespaceIdDto | undefined {
        return this.namespaceRegistrationTransactionBody.parentId;
    }

    /**
     * Gets namespace identifier.
     *
     * @return Namespace identifier.
     */
    public get id(): NamespaceIdDto {
        return this.namespaceRegistrationTransactionBody.id;
    }

    /**
     * Gets namespace registration type.
     *
     * @return Namespace registration type.
     */
    public get registrationType(): NamespaceRegistrationTypeDto {
        return this.namespaceRegistrationTransactionBody.registrationType;
    }

    /**
     * Gets namespace name.
     *
     * @return Namespace name.
     */
    public get name(): Uint8Array {
        return this.namespaceRegistrationTransactionBody.name;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.namespaceRegistrationTransactionBody.size; // namespaceRegistrationTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): NamespaceRegistrationTransactionBodyBuilder {
        return this.namespaceRegistrationTransactionBody;
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
        const namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    }
}

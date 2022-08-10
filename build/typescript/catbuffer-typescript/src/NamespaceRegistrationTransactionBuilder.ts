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
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';

/**
 *  Interface to create instances of NamespaceRegistrationTransactionBuilder.
 */
export interface NamespaceRegistrationTransactionBuilderParams extends TransactionBuilderParams {
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
 * Binary layout for a non-embedded namespace registration transaction
 **/
export class NamespaceRegistrationTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.NAMESPACE_REGISTRATION_TRANSACTION;

    /** Namespace registration transaction body. **/
    public readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;

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
     * @param duration Namespace duration.
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param registrationType Namespace registration type.
     * @param name Namespace name.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        duration,
        parentId,
        id,
        registrationType,
        name,
    }: NamespaceRegistrationTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder({
            duration,
            parentId,
            id,
            registrationType,
            name,
        });
        if (version !== NamespaceRegistrationTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    NamespaceRegistrationTransactionBuilder.VERSION,
            );
        if (type !== NamespaceRegistrationTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + NamespaceRegistrationTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder =
            NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.size);
        return new NamespaceRegistrationTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            duration: namespaceRegistrationTransactionBody.duration,
            parentId: namespaceRegistrationTransactionBody.parentId,
            id: namespaceRegistrationTransactionBody.id,
            registrationType: namespaceRegistrationTransactionBody.registrationType,
            name: namespaceRegistrationTransactionBody.name,
        });
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param duration Namespace duration.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBuilder.
     */
    public static createNamespaceRegistrationTransactionBuilderRoot(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        duration: BlockDurationDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): NamespaceRegistrationTransactionBuilder {
        const version = NamespaceRegistrationTransactionBuilder.VERSION;
        const type = NamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            duration: duration,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBuilder.
     */
    public static createNamespaceRegistrationTransactionBuilderChild(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        parentId: NamespaceIdDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): NamespaceRegistrationTransactionBuilder {
        const version = NamespaceRegistrationTransactionBuilder.VERSION;
        const type = NamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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

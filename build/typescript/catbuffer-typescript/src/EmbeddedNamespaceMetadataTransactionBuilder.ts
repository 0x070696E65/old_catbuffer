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
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceMetadataTransactionBodyBuilder } from './NamespaceMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of EmbeddedNamespaceMetadataTransactionBuilder.
 */
export interface EmbeddedNamespaceMetadataTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Metadata target address. **/
    targetAddress: UnresolvedAddressDto;
    /** Metadata key scoped to source, target and type. **/
    scopedMetadataKey: bigint;
    /** Target namespace identifier. **/
    targetNamespaceId: NamespaceIdDto;
    /** Change in value size in bytes. **/
    valueSizeDelta: number;
    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). **/
    value: Uint8Array;
}

/**
 * Binary layout for an embedded namespace metadata transaction
 **/
export class EmbeddedNamespaceMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_NAMESPACE_METADATA_TRANSACTION;

    /** Namespace metadata transaction body. **/
    public readonly namespaceMetadataTransactionBody: NamespaceMetadataTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetNamespaceId Target namespace identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        targetAddress,
        scopedMetadataKey,
        targetNamespaceId,
        valueSizeDelta,
        value,
    }: EmbeddedNamespaceMetadataTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            targetNamespaceId,
            valueSizeDelta,
            value,
        });
        if (version !== EmbeddedNamespaceMetadataTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedNamespaceMetadataTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceMetadataTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceMetadataTransactionBody: NamespaceMetadataTransactionBodyBuilder =
            NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.size);
        return new EmbeddedNamespaceMetadataTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            targetAddress: namespaceMetadataTransactionBody.targetAddress,
            scopedMetadataKey: namespaceMetadataTransactionBody.scopedMetadataKey,
            targetNamespaceId: namespaceMetadataTransactionBody.targetNamespaceId,
            valueSizeDelta: namespaceMetadataTransactionBody.valueSizeDelta,
            value: namespaceMetadataTransactionBody.value,
        });
    }

    /**
     * Creates an instance of EmbeddedNamespaceMetadataTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetNamespaceId Target namespace identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of EmbeddedNamespaceMetadataTransactionBuilder.
     */
    public static createEmbeddedNamespaceMetadataTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: bigint,
        targetNamespaceId: NamespaceIdDto,
        valueSizeDelta: number,
        value: Uint8Array,
    ): EmbeddedNamespaceMetadataTransactionBuilder {
        const version = EmbeddedNamespaceMetadataTransactionBuilder.VERSION;
        const type = EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedNamespaceMetadataTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetNamespaceId: targetNamespaceId,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }

    /**
     * Gets metadata target address.
     *
     * @return Metadata target address.
     */
    public get targetAddress(): UnresolvedAddressDto {
        return this.namespaceMetadataTransactionBody.targetAddress;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public get scopedMetadataKey(): bigint {
        return this.namespaceMetadataTransactionBody.scopedMetadataKey;
    }

    /**
     * Gets target namespace identifier.
     *
     * @return Target namespace identifier.
     */
    public get targetNamespaceId(): NamespaceIdDto {
        return this.namespaceMetadataTransactionBody.targetNamespaceId;
    }

    /**
     * Gets change in value size in bytes.
     *
     * @return Change in value size in bytes.
     */
    public get valueSizeDelta(): number {
        return this.namespaceMetadataTransactionBody.valueSizeDelta;
    }

    /**
     * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     *
     * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public get value(): Uint8Array {
        return this.namespaceMetadataTransactionBody.value;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.namespaceMetadataTransactionBody.size; // namespaceMetadataTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): NamespaceMetadataTransactionBodyBuilder {
        return this.namespaceMetadataTransactionBody;
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
        const namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    }
}

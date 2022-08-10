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
import { MosaicMetadataTransactionBodyBuilder } from './MosaicMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of EmbeddedMosaicMetadataTransactionBuilder.
 */
export interface EmbeddedMosaicMetadataTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Metadata target address. **/
    targetAddress: UnresolvedAddressDto;
    /** Metadata key scoped to source, target and type. **/
    scopedMetadataKey: bigint;
    /** Target mosaic identifier. **/
    targetMosaicId: UnresolvedMosaicIdDto;
    /** Change in value size in bytes. **/
    valueSizeDelta: number;
    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). **/
    value: Uint8Array;
}

/**
 * Binary layout for an embedded mosaic metadata transaction
 **/
export class EmbeddedMosaicMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_MOSAIC_METADATA_TRANSACTION;

    /** Mosaic metadata transaction body. **/
    public readonly mosaicMetadataTransactionBody: MosaicMetadataTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetMosaicId Target mosaic identifier.
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
        targetMosaicId,
        valueSizeDelta,
        value,
    }: EmbeddedMosaicMetadataTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            targetMosaicId,
            valueSizeDelta,
            value,
        });
        if (version !== EmbeddedMosaicMetadataTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedMosaicMetadataTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicMetadataTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicMetadataTransactionBody: MosaicMetadataTransactionBodyBuilder = MosaicMetadataTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, mosaicMetadataTransactionBody.size);
        return new EmbeddedMosaicMetadataTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            targetAddress: mosaicMetadataTransactionBody.targetAddress,
            scopedMetadataKey: mosaicMetadataTransactionBody.scopedMetadataKey,
            targetMosaicId: mosaicMetadataTransactionBody.targetMosaicId,
            valueSizeDelta: mosaicMetadataTransactionBody.valueSizeDelta,
            value: mosaicMetadataTransactionBody.value,
        });
    }

    /**
     * Creates an instance of EmbeddedMosaicMetadataTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetMosaicId Target mosaic identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of EmbeddedMosaicMetadataTransactionBuilder.
     */
    public static createEmbeddedMosaicMetadataTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: bigint,
        targetMosaicId: UnresolvedMosaicIdDto,
        valueSizeDelta: number,
        value: Uint8Array,
    ): EmbeddedMosaicMetadataTransactionBuilder {
        const version = EmbeddedMosaicMetadataTransactionBuilder.VERSION;
        const type = EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicMetadataTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetMosaicId: targetMosaicId,
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
        return this.mosaicMetadataTransactionBody.targetAddress;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public get scopedMetadataKey(): bigint {
        return this.mosaicMetadataTransactionBody.scopedMetadataKey;
    }

    /**
     * Gets target mosaic identifier.
     *
     * @return Target mosaic identifier.
     */
    public get targetMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicMetadataTransactionBody.targetMosaicId;
    }

    /**
     * Gets change in value size in bytes.
     *
     * @return Change in value size in bytes.
     */
    public get valueSizeDelta(): number {
        return this.mosaicMetadataTransactionBody.valueSizeDelta;
    }

    /**
     * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     *
     * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public get value(): Uint8Array {
        return this.mosaicMetadataTransactionBody.value;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaicMetadataTransactionBody.size; // mosaicMetadataTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MosaicMetadataTransactionBodyBuilder {
        return this.mosaicMetadataTransactionBody;
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
        const mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    }
}

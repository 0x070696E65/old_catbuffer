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

import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MetadataTypeDto } from './MetadataTypeDto';
import { MetadataValueBuilder } from './MetadataValueBuilder';
import { ScopedMetadataKeyDto } from './ScopedMetadataKeyDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';

/**
 *  Interface to create instances of MetadataEntryBuilder.
 */
export interface MetadataEntryBuilderParams extends StateHeaderBuilderParams {
    /** Metadata source address (provider). **/
    sourceAddress: AddressDto;
    /** Metadata target address. **/
    targetAddress: AddressDto;
    /** Metadata key scoped to source, target and type. **/
    scopedMetadataKey: ScopedMetadataKeyDto;
    /** Target id. **/
    targetId: bigint;
    /** Metadata type. **/
    metadataType: MetadataTypeDto;
    /** Value. **/
    value: MetadataValueBuilder;
}

/**
 * Binary layout of a metadata entry
 **/
export class MetadataEntryBuilder extends StateHeaderBuilder implements Serializer {
    /** Metadata source address (provider). **/
    public readonly sourceAddress: AddressDto;

    /** Metadata target address. **/
    public readonly targetAddress: AddressDto;

    /** Metadata key scoped to source, target and type. **/
    public readonly scopedMetadataKey: ScopedMetadataKeyDto;

    /** Target id. **/
    public readonly targetId: bigint;

    /** Metadata type. **/
    public readonly metadataType: MetadataTypeDto;

    /** Value. **/
    public readonly value: MetadataValueBuilder;

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param sourceAddress Metadata source address (provider).
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetId Target id.
     * @param metadataType Metadata type.
     * @param value Value.
     */
    public constructor({
        version,
        sourceAddress,
        targetAddress,
        scopedMetadataKey,
        targetId,
        metadataType,
        value,
    }: MetadataEntryBuilderParams) {
        super({ version });
        GeneratorUtils.notNull(sourceAddress, 'sourceAddress is null or undefined');
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils.notNull(targetId, 'targetId is null or undefined');
        GeneratorUtils.notNull(metadataType, 'metadataType is null or undefined');
        GeneratorUtils.notNull(value, 'value is null or undefined');
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MetadataEntryBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const sourceAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.size);
        const targetAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey: ScopedMetadataKeyDto = ScopedMetadataKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.size);
        const targetId: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const metadataType: MetadataTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const value: MetadataValueBuilder = MetadataValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, value.size);
        return new MetadataEntryBuilder({
            version: superObject.version,
            sourceAddress: sourceAddress,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetId: targetId,
            metadataType: metadataType,
            value: value,
        });
    }

    /**
     * Creates an instance of MetadataEntryBuilder.
     *
     * @param version Serialization version.
     * @param sourceAddress Metadata source address (provider).
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetId Target id.
     * @param metadataType Metadata type.
     * @param value Value.
     * @return Instance of MetadataEntryBuilder.
     */
    public static createMetadataEntryBuilder(
        version: number,
        sourceAddress: AddressDto,
        targetAddress: AddressDto,
        scopedMetadataKey: ScopedMetadataKeyDto,
        targetId: bigint,
        metadataType: MetadataTypeDto,
        value: MetadataValueBuilder,
    ): MetadataEntryBuilder {
        return new MetadataEntryBuilder({
            version: version,
            sourceAddress: sourceAddress,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetId: targetId,
            metadataType: metadataType,
            value: value,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.sourceAddress.size; // sourceAddress
        size += this.targetAddress.size; // targetAddress
        size += this.scopedMetadataKey.size; // scopedMetadataKey
        size += 8; // targetId
        size += 1; // metadataType
        size += this.value.size; // value
        return size;
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
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, sourceAddressBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetIdBytes = GeneratorUtils.bigIntToBuffer(this.targetId);
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetIdBytes);
        const metadataTypeBytes = GeneratorUtils.uint8ToBuffer(this.metadataType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, metadataTypeBytes);
        const valueBytes = this.value.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}

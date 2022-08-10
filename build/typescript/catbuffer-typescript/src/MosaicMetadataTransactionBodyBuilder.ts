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
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of MosaicMetadataTransactionBodyBuilder.
 */
export interface MosaicMetadataTransactionBodyBuilderParams {
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
 * Binary layout for a mosaic metadata transaction
 **/
export class MosaicMetadataTransactionBodyBuilder implements Serializer {
    /** Metadata target address. **/
    public readonly targetAddress: UnresolvedAddressDto;

    /** Metadata key scoped to source, target and type. **/
    public readonly scopedMetadataKey: bigint;

    /** Target mosaic identifier. **/
    public readonly targetMosaicId: UnresolvedMosaicIdDto;

    /** Change in value size in bytes. **/
    public readonly valueSizeDelta: number;

    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). **/
    public readonly value: Uint8Array;

    /**
     * Constructor.
     *
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetMosaicId Target mosaic identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public constructor({
        targetAddress,
        scopedMetadataKey,
        targetMosaicId,
        valueSizeDelta,
        value,
    }: MosaicMetadataTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils.notNull(targetMosaicId, 'targetMosaicId is null or undefined');
        GeneratorUtils.notNull(valueSizeDelta, 'valueSizeDelta is null or undefined');
        GeneratorUtils.notNull(value, 'value is null or undefined');
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetMosaicId = targetMosaicId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicMetadataTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const targetAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetMosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetMosaicId.size);
        const valueSizeDelta: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new MosaicMetadataTransactionBodyBuilder({
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetMosaicId: targetMosaicId,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }

    /**
     * Creates an instance of MosaicMetadataTransactionBodyBuilder.
     *
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetMosaicId Target mosaic identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of MosaicMetadataTransactionBodyBuilder.
     */
    public static createMosaicMetadataTransactionBodyBuilder(
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: bigint,
        targetMosaicId: UnresolvedMosaicIdDto,
        valueSizeDelta: number,
        value: Uint8Array,
    ): MosaicMetadataTransactionBodyBuilder {
        return new MosaicMetadataTransactionBodyBuilder({
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetMosaicId: targetMosaicId,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.targetAddress.size; // targetAddress
        size += 8; // scopedMetadataKey
        size += this.targetMosaicId.size; // targetMosaicId
        size += 2; // valueSizeDelta
        size += 2; // valueSize
        size += this.value.length; // value
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = GeneratorUtils.bigIntToBuffer(this.scopedMetadataKey);
        newArray = GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetMosaicIdBytes = this.targetMosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetMosaicIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils.uint16ToBuffer(this.valueSizeDelta);
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils.uint16ToBuffer(this.value.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
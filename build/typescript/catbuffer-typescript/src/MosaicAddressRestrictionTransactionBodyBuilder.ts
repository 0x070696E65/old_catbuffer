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
 *  Interface to create instances of MosaicAddressRestrictionTransactionBodyBuilder.
 */
export interface MosaicAddressRestrictionTransactionBodyBuilderParams {
    /** Identifier of the mosaic to which the restriction applies. **/
    mosaicId: UnresolvedMosaicIdDto;
    /** Restriction key. **/
    restrictionKey: bigint;
    /** Previous restriction value. **/
    previousRestrictionValue: bigint;
    /** New restriction value. **/
    newRestrictionValue: bigint;
    /** Address being restricted. **/
    targetAddress: UnresolvedAddressDto;
}

/**
 * Binary layout for a mosaic address restriction transaction
 **/
export class MosaicAddressRestrictionTransactionBodyBuilder implements Serializer {
    /** Identifier of the mosaic to which the restriction applies. **/
    public readonly mosaicId: UnresolvedMosaicIdDto;

    /** Restriction key. **/
    public readonly restrictionKey: bigint;

    /** Previous restriction value. **/
    public readonly previousRestrictionValue: bigint;

    /** New restriction value. **/
    public readonly newRestrictionValue: bigint;

    /** Address being restricted. **/
    public readonly targetAddress: UnresolvedAddressDto;

    /**
     * Constructor.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey Restriction key.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param targetAddress Address being restricted.
     */
    public constructor({
        mosaicId,
        restrictionKey,
        previousRestrictionValue,
        newRestrictionValue,
        targetAddress,
    }: MosaicAddressRestrictionTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(restrictionKey, 'restrictionKey is null or undefined');
        GeneratorUtils.notNull(previousRestrictionValue, 'previousRestrictionValue is null or undefined');
        GeneratorUtils.notNull(newRestrictionValue, 'newRestrictionValue is null or undefined');
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const restrictionKey: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        return new MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
        });
    }

    /**
     * Creates an instance of MosaicAddressRestrictionTransactionBodyBuilder.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey Restriction key.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param targetAddress Address being restricted.
     * @return Instance of MosaicAddressRestrictionTransactionBodyBuilder.
     */
    public static createMosaicAddressRestrictionTransactionBodyBuilder(
        mosaicId: UnresolvedMosaicIdDto,
        restrictionKey: bigint,
        previousRestrictionValue: bigint,
        newRestrictionValue: bigint,
        targetAddress: UnresolvedAddressDto,
    ): MosaicAddressRestrictionTransactionBodyBuilder {
        return new MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.mosaicId.size; // mosaicId
        size += 8; // restrictionKey
        size += 8; // previousRestrictionValue
        size += 8; // newRestrictionValue
        size += this.targetAddress.size; // targetAddress
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils.bigIntToBuffer(this.restrictionKey);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils.bigIntToBuffer(this.previousRestrictionValue);
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils.bigIntToBuffer(this.newRestrictionValue);
        newArray = GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}

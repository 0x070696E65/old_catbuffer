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
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of MosaicGlobalRestrictionTransactionBodyBuilder.
 */
export interface MosaicGlobalRestrictionTransactionBodyBuilderParams {
    /** Identifier of the mosaic being restricted. **/
    mosaicId: UnresolvedMosaicIdDto;
    /** Identifier of the mosaic providing the restriction key. **/
    referenceMosaicId: UnresolvedMosaicIdDto;
    /** Restriction key relative to the reference mosaic identifier. **/
    restrictionKey: bigint;
    /** Previous restriction value. **/
    previousRestrictionValue: bigint;
    /** New restriction value. **/
    newRestrictionValue: bigint;
    /** Previous restriction type. **/
    previousRestrictionType: MosaicRestrictionTypeDto;
    /** New restriction type. **/
    newRestrictionType: MosaicRestrictionTypeDto;
}

/**
 * Binary layout for a mosaic global restriction transaction
 **/
export class MosaicGlobalRestrictionTransactionBodyBuilder implements Serializer {
    /** Identifier of the mosaic being restricted. **/
    public readonly mosaicId: UnresolvedMosaicIdDto;

    /** Identifier of the mosaic providing the restriction key. **/
    public readonly referenceMosaicId: UnresolvedMosaicIdDto;

    /** Restriction key relative to the reference mosaic identifier. **/
    public readonly restrictionKey: bigint;

    /** Previous restriction value. **/
    public readonly previousRestrictionValue: bigint;

    /** New restriction value. **/
    public readonly newRestrictionValue: bigint;

    /** Previous restriction type. **/
    public readonly previousRestrictionType: MosaicRestrictionTypeDto;

    /** New restriction type. **/
    public readonly newRestrictionType: MosaicRestrictionTypeDto;

    /**
     * Constructor.
     *
     * @param mosaicId Identifier of the mosaic being restricted.
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionKey Restriction key relative to the reference mosaic identifier.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param previousRestrictionType Previous restriction type.
     * @param newRestrictionType New restriction type.
     */
    public constructor({
        mosaicId,
        referenceMosaicId,
        restrictionKey,
        previousRestrictionValue,
        newRestrictionValue,
        previousRestrictionType,
        newRestrictionType,
    }: MosaicGlobalRestrictionTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(referenceMosaicId, 'referenceMosaicId is null or undefined');
        GeneratorUtils.notNull(restrictionKey, 'restrictionKey is null or undefined');
        GeneratorUtils.notNull(previousRestrictionValue, 'previousRestrictionValue is null or undefined');
        GeneratorUtils.notNull(newRestrictionValue, 'newRestrictionValue is null or undefined');
        GeneratorUtils.notNull(previousRestrictionType, 'previousRestrictionType is null or undefined');
        GeneratorUtils.notNull(newRestrictionType, 'newRestrictionType is null or undefined');
        this.mosaicId = mosaicId;
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionType = newRestrictionType;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const referenceMosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.size);
        const restrictionKey: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionType: MosaicRestrictionTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const newRestrictionType: MosaicRestrictionTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicGlobalRestrictionTransactionBodyBuilder({
            mosaicId: mosaicId,
            referenceMosaicId: referenceMosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            previousRestrictionType: previousRestrictionType,
            newRestrictionType: newRestrictionType,
        });
    }

    /**
     * Creates an instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     *
     * @param mosaicId Identifier of the mosaic being restricted.
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionKey Restriction key relative to the reference mosaic identifier.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param previousRestrictionType Previous restriction type.
     * @param newRestrictionType New restriction type.
     * @return Instance of MosaicGlobalRestrictionTransactionBodyBuilder.
     */
    public static createMosaicGlobalRestrictionTransactionBodyBuilder(
        mosaicId: UnresolvedMosaicIdDto,
        referenceMosaicId: UnresolvedMosaicIdDto,
        restrictionKey: bigint,
        previousRestrictionValue: bigint,
        newRestrictionValue: bigint,
        previousRestrictionType: MosaicRestrictionTypeDto,
        newRestrictionType: MosaicRestrictionTypeDto,
    ): MosaicGlobalRestrictionTransactionBodyBuilder {
        return new MosaicGlobalRestrictionTransactionBodyBuilder({
            mosaicId: mosaicId,
            referenceMosaicId: referenceMosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            previousRestrictionType: previousRestrictionType,
            newRestrictionType: newRestrictionType,
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
        size += this.referenceMosaicId.size; // referenceMosaicId
        size += 8; // restrictionKey
        size += 8; // previousRestrictionValue
        size += 8; // newRestrictionValue
        size += 1; // previousRestrictionType
        size += 1; // newRestrictionType
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
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils.bigIntToBuffer(this.restrictionKey);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils.bigIntToBuffer(this.previousRestrictionValue);
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils.bigIntToBuffer(this.newRestrictionValue);
        newArray = GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const previousRestrictionTypeBytes = GeneratorUtils.uint8ToBuffer(this.previousRestrictionType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousRestrictionTypeBytes);
        const newRestrictionTypeBytes = GeneratorUtils.uint8ToBuffer(this.newRestrictionType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, newRestrictionTypeBytes);
        return newArray;
    }
}

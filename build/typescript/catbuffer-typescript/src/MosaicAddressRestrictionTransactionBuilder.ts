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
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { MosaicAddressRestrictionTransactionBodyBuilder } from './MosaicAddressRestrictionTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of MosaicAddressRestrictionTransactionBuilder.
 */
export interface MosaicAddressRestrictionTransactionBuilderParams extends TransactionBuilderParams {
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
 * Binary layout for a non-embedded mosaic address restriction transaction
 **/
export class MosaicAddressRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_ADDRESS_RESTRICTION_TRANSACTION;

    /** Mosaic address restriction transaction body. **/
    public readonly mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder;

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
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey Restriction key.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param targetAddress Address being restricted.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        mosaicId,
        restrictionKey,
        previousRestrictionValue,
        newRestrictionValue,
        targetAddress,
    }: MosaicAddressRestrictionTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        });
        if (version !== MosaicAddressRestrictionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    MosaicAddressRestrictionTransactionBuilder.VERSION,
            );
        if (type !== MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder =
            MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.size);
        return new MosaicAddressRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaicId: mosaicAddressRestrictionTransactionBody.mosaicId,
            restrictionKey: mosaicAddressRestrictionTransactionBody.restrictionKey,
            previousRestrictionValue: mosaicAddressRestrictionTransactionBody.previousRestrictionValue,
            newRestrictionValue: mosaicAddressRestrictionTransactionBody.newRestrictionValue,
            targetAddress: mosaicAddressRestrictionTransactionBody.targetAddress,
        });
    }

    /**
     * Creates an instance of MosaicAddressRestrictionTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey Restriction key.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param targetAddress Address being restricted.
     * @return Instance of MosaicAddressRestrictionTransactionBuilder.
     */
    public static createMosaicAddressRestrictionTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        mosaicId: UnresolvedMosaicIdDto,
        restrictionKey: bigint,
        previousRestrictionValue: bigint,
        newRestrictionValue: bigint,
        targetAddress: UnresolvedAddressDto,
    ): MosaicAddressRestrictionTransactionBuilder {
        const version = MosaicAddressRestrictionTransactionBuilder.VERSION;
        const type = MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new MosaicAddressRestrictionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
        });
    }

    /**
     * Gets identifier of the mosaic to which the restriction applies.
     *
     * @return Identifier of the mosaic to which the restriction applies.
     */
    public get mosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicAddressRestrictionTransactionBody.mosaicId;
    }

    /**
     * Gets restriction key.
     *
     * @return Restriction key.
     */
    public get restrictionKey(): bigint {
        return this.mosaicAddressRestrictionTransactionBody.restrictionKey;
    }

    /**
     * Gets previous restriction value.
     *
     * @return Previous restriction value.
     */
    public get previousRestrictionValue(): bigint {
        return this.mosaicAddressRestrictionTransactionBody.previousRestrictionValue;
    }

    /**
     * Gets new restriction value.
     *
     * @return New restriction value.
     */
    public get newRestrictionValue(): bigint {
        return this.mosaicAddressRestrictionTransactionBody.newRestrictionValue;
    }

    /**
     * Gets address being restricted.
     *
     * @return Address being restricted.
     */
    public get targetAddress(): UnresolvedAddressDto {
        return this.mosaicAddressRestrictionTransactionBody.targetAddress;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaicAddressRestrictionTransactionBody.size; // mosaicAddressRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MosaicAddressRestrictionTransactionBodyBuilder {
        return this.mosaicAddressRestrictionTransactionBody;
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
        const mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}

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
import { MosaicGlobalRestrictionTransactionBodyBuilder } from './MosaicGlobalRestrictionTransactionBodyBuilder';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of EmbeddedMosaicGlobalRestrictionTransactionBuilder.
 */
export interface EmbeddedMosaicGlobalRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
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
 * Binary layout for an embedded mosaic global restriction transaction
 **/
export class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_MOSAIC_GLOBAL_RESTRICTION_TRANSACTION;

    /** Mosaic global restriction transaction body. **/
    public readonly mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param mosaicId Identifier of the mosaic being restricted.
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionKey Restriction key relative to the reference mosaic identifier.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param previousRestrictionType Previous restriction type.
     * @param newRestrictionType New restriction type.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        mosaicId,
        referenceMosaicId,
        restrictionKey,
        previousRestrictionValue,
        newRestrictionValue,
        previousRestrictionType,
        newRestrictionType,
    }: EmbeddedMosaicGlobalRestrictionTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder({
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        });
        if (version !== EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicGlobalRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder =
            MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.size);
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            mosaicId: mosaicGlobalRestrictionTransactionBody.mosaicId,
            referenceMosaicId: mosaicGlobalRestrictionTransactionBody.referenceMosaicId,
            restrictionKey: mosaicGlobalRestrictionTransactionBody.restrictionKey,
            previousRestrictionValue: mosaicGlobalRestrictionTransactionBody.previousRestrictionValue,
            newRestrictionValue: mosaicGlobalRestrictionTransactionBody.newRestrictionValue,
            previousRestrictionType: mosaicGlobalRestrictionTransactionBody.previousRestrictionType,
            newRestrictionType: mosaicGlobalRestrictionTransactionBody.newRestrictionType,
        });
    }

    /**
     * Creates an instance of EmbeddedMosaicGlobalRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param mosaicId Identifier of the mosaic being restricted.
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionKey Restriction key relative to the reference mosaic identifier.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param previousRestrictionType Previous restriction type.
     * @param newRestrictionType New restriction type.
     * @return Instance of EmbeddedMosaicGlobalRestrictionTransactionBuilder.
     */
    public static createEmbeddedMosaicGlobalRestrictionTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        referenceMosaicId: UnresolvedMosaicIdDto,
        restrictionKey: bigint,
        previousRestrictionValue: bigint,
        newRestrictionValue: bigint,
        previousRestrictionType: MosaicRestrictionTypeDto,
        newRestrictionType: MosaicRestrictionTypeDto,
    ): EmbeddedMosaicGlobalRestrictionTransactionBuilder {
        const version = EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
     * Gets identifier of the mosaic being restricted.
     *
     * @return Identifier of the mosaic being restricted.
     */
    public get mosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicGlobalRestrictionTransactionBody.mosaicId;
    }

    /**
     * Gets identifier of the mosaic providing the restriction key.
     *
     * @return Identifier of the mosaic providing the restriction key.
     */
    public get referenceMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicGlobalRestrictionTransactionBody.referenceMosaicId;
    }

    /**
     * Gets restriction key relative to the reference mosaic identifier.
     *
     * @return Restriction key relative to the reference mosaic identifier.
     */
    public get restrictionKey(): bigint {
        return this.mosaicGlobalRestrictionTransactionBody.restrictionKey;
    }

    /**
     * Gets previous restriction value.
     *
     * @return Previous restriction value.
     */
    public get previousRestrictionValue(): bigint {
        return this.mosaicGlobalRestrictionTransactionBody.previousRestrictionValue;
    }

    /**
     * Gets new restriction value.
     *
     * @return New restriction value.
     */
    public get newRestrictionValue(): bigint {
        return this.mosaicGlobalRestrictionTransactionBody.newRestrictionValue;
    }

    /**
     * Gets previous restriction type.
     *
     * @return Previous restriction type.
     */
    public get previousRestrictionType(): MosaicRestrictionTypeDto {
        return this.mosaicGlobalRestrictionTransactionBody.previousRestrictionType;
    }

    /**
     * Gets new restriction type.
     *
     * @return New restriction type.
     */
    public get newRestrictionType(): MosaicRestrictionTypeDto {
        return this.mosaicGlobalRestrictionTransactionBody.newRestrictionType;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaicGlobalRestrictionTransactionBody.size; // mosaicGlobalRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MosaicGlobalRestrictionTransactionBodyBuilder {
        return this.mosaicGlobalRestrictionTransactionBody;
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
        const mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    }
}

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
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of EmbeddedMosaicSupplyChangeTransactionBuilder.
 */
export interface EmbeddedMosaicSupplyChangeTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Affected mosaic identifier. **/
    mosaicId: UnresolvedMosaicIdDto;
    /** Change amount. **/
    delta: AmountDto;
    /** Supply change action. **/
    action: MosaicSupplyChangeActionDto;
}

/**
 * Binary layout for an embedded mosaic supply change transaction
 **/
export class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_MOSAIC_SUPPLY_CHANGE_TRANSACTION;

    /** Mosaic supply change transaction body. **/
    public readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param mosaicId Affected mosaic identifier.
     * @param delta Change amount.
     * @param action Supply change action.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        mosaicId,
        delta,
        action,
    }: EmbeddedMosaicSupplyChangeTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder({ mosaicId, delta, action });
        if (version !== EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicSupplyChangeTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder =
            MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.size);
        return new EmbeddedMosaicSupplyChangeTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            mosaicId: mosaicSupplyChangeTransactionBody.mosaicId,
            delta: mosaicSupplyChangeTransactionBody.delta,
            action: mosaicSupplyChangeTransactionBody.action,
        });
    }

    /**
     * Creates an instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param mosaicId Affected mosaic identifier.
     * @param delta Change amount.
     * @param action Supply change action.
     * @return Instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
     */
    public static createEmbeddedMosaicSupplyChangeTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        delta: AmountDto,
        action: MosaicSupplyChangeActionDto,
    ): EmbeddedMosaicSupplyChangeTransactionBuilder {
        const version = EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION;
        const type = EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicSupplyChangeTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaicId: mosaicId,
            delta: delta,
            action: action,
        });
    }

    /**
     * Gets affected mosaic identifier.
     *
     * @return Affected mosaic identifier.
     */
    public get mosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicSupplyChangeTransactionBody.mosaicId;
    }

    /**
     * Gets change amount.
     *
     * @return Change amount.
     */
    public get delta(): AmountDto {
        return this.mosaicSupplyChangeTransactionBody.delta;
    }

    /**
     * Gets supply change action.
     *
     * @return Supply change action.
     */
    public get action(): MosaicSupplyChangeActionDto {
        return this.mosaicSupplyChangeTransactionBody.action;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaicSupplyChangeTransactionBody.size; // mosaicSupplyChangeTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MosaicSupplyChangeTransactionBodyBuilder {
        return this.mosaicSupplyChangeTransactionBody;
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
        const mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    }
}

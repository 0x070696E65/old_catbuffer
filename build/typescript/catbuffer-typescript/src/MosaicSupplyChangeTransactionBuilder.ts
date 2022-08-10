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
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of MosaicSupplyChangeTransactionBuilder.
 */
export interface MosaicSupplyChangeTransactionBuilderParams extends TransactionBuilderParams {
    /** Affected mosaic identifier. **/
    mosaicId: UnresolvedMosaicIdDto;
    /** Change amount. **/
    delta: AmountDto;
    /** Supply change action. **/
    action: MosaicSupplyChangeActionDto;
}

/**
 * Binary layout for a non-embedded mosaic supply change transaction
 **/
export class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_SUPPLY_CHANGE_TRANSACTION;

    /** Mosaic supply change transaction body. **/
    public readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;

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
     * @param mosaicId Affected mosaic identifier.
     * @param delta Change amount.
     * @param action Supply change action.
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
        delta,
        action,
    }: MosaicSupplyChangeTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder({ mosaicId, delta, action });
        if (version !== MosaicSupplyChangeTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + MosaicSupplyChangeTransactionBuilder.VERSION,
            );
        if (type !== MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicSupplyChangeTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder =
            MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.size);
        return new MosaicSupplyChangeTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaicId: mosaicSupplyChangeTransactionBody.mosaicId,
            delta: mosaicSupplyChangeTransactionBody.delta,
            action: mosaicSupplyChangeTransactionBody.action,
        });
    }

    /**
     * Creates an instance of MosaicSupplyChangeTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param mosaicId Affected mosaic identifier.
     * @param delta Change amount.
     * @param action Supply change action.
     * @return Instance of MosaicSupplyChangeTransactionBuilder.
     */
    public static createMosaicSupplyChangeTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        mosaicId: UnresolvedMosaicIdDto,
        delta: AmountDto,
        action: MosaicSupplyChangeActionDto,
    ): MosaicSupplyChangeTransactionBuilder {
        const version = MosaicSupplyChangeTransactionBuilder.VERSION;
        const type = MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE;
        return new MosaicSupplyChangeTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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

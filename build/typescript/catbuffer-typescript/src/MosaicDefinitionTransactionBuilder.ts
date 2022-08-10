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
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { MosaicDefinitionTransactionBodyBuilder } from './MosaicDefinitionTransactionBodyBuilder';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';

/**
 *  Interface to create instances of MosaicDefinitionTransactionBuilder.
 */
export interface MosaicDefinitionTransactionBuilderParams extends TransactionBuilderParams {
    /** Mosaic identifier. **/
    id: MosaicIdDto;
    /** Mosaic duration. **/
    duration: BlockDurationDto;
    /** Mosaic nonce. **/
    nonce: MosaicNonceDto;
    /** Mosaic flags. **/
    flags: MosaicFlagsDto[];
    /** Mosaic divisibility. **/
    divisibility: number;
}

/**
 * Binary layout for a non-embedded mosaic definition transaction
 **/
export class MosaicDefinitionTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION;

    /** Mosaic definition transaction body. **/
    public readonly mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder;

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
     * @param id Mosaic identifier.
     * @param duration Mosaic duration.
     * @param nonce Mosaic nonce.
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        id,
        duration,
        nonce,
        flags,
        divisibility,
    }: MosaicDefinitionTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder({ id, duration, nonce, flags, divisibility });
        if (version !== MosaicDefinitionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + MosaicDefinitionTransactionBuilder.VERSION,
            );
        if (type !== MosaicDefinitionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + MosaicDefinitionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicDefinitionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder =
            MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.size);
        return new MosaicDefinitionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            id: mosaicDefinitionTransactionBody.id,
            duration: mosaicDefinitionTransactionBody.duration,
            nonce: mosaicDefinitionTransactionBody.nonce,
            flags: mosaicDefinitionTransactionBody.flags,
            divisibility: mosaicDefinitionTransactionBody.divisibility,
        });
    }

    /**
     * Creates an instance of MosaicDefinitionTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param id Mosaic identifier.
     * @param duration Mosaic duration.
     * @param nonce Mosaic nonce.
     * @param flags Mosaic flags.
     * @param divisibility Mosaic divisibility.
     * @return Instance of MosaicDefinitionTransactionBuilder.
     */
    public static createMosaicDefinitionTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        id: MosaicIdDto,
        duration: BlockDurationDto,
        nonce: MosaicNonceDto,
        flags: MosaicFlagsDto[],
        divisibility: number,
    ): MosaicDefinitionTransactionBuilder {
        const version = MosaicDefinitionTransactionBuilder.VERSION;
        const type = MosaicDefinitionTransactionBuilder.ENTITY_TYPE;
        return new MosaicDefinitionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
        });
    }

    /**
     * Gets mosaic identifier.
     *
     * @return Mosaic identifier.
     */
    public get id(): MosaicIdDto {
        return this.mosaicDefinitionTransactionBody.id;
    }

    /**
     * Gets mosaic duration.
     *
     * @return Mosaic duration.
     */
    public get duration(): BlockDurationDto {
        return this.mosaicDefinitionTransactionBody.duration;
    }

    /**
     * Gets mosaic nonce.
     *
     * @return Mosaic nonce.
     */
    public get nonce(): MosaicNonceDto {
        return this.mosaicDefinitionTransactionBody.nonce;
    }

    /**
     * Gets mosaic flags.
     *
     * @return Mosaic flags.
     */
    public get flags(): MosaicFlagsDto[] {
        return this.mosaicDefinitionTransactionBody.flags;
    }

    /**
     * Gets mosaic divisibility.
     *
     * @return Mosaic divisibility.
     */
    public get divisibility(): number {
        return this.mosaicDefinitionTransactionBody.divisibility;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaicDefinitionTransactionBody.size; // mosaicDefinitionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MosaicDefinitionTransactionBodyBuilder {
        return this.mosaicDefinitionTransactionBody;
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
        const mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    }
}

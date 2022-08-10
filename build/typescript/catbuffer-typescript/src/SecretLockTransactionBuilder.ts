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
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretLockTransactionBodyBuilder } from './SecretLockTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 *  Interface to create instances of SecretLockTransactionBuilder.
 */
export interface SecretLockTransactionBuilderParams extends TransactionBuilderParams {
    /** Locked mosaic recipient address. **/
    recipientAddress: UnresolvedAddressDto;
    /** Secret. **/
    secret: Hash256Dto;
    /** Locked mosaic. **/
    mosaic: UnresolvedMosaicBuilder;
    /** Number of blocks for which a lock should be valid. **/
    duration: BlockDurationDto;
    /** Hash algorithm. **/
    hashAlgorithm: LockHashAlgorithmDto;
}

/**
 * Binary layout for a non-embedded secret lock transaction
 **/
export class SecretLockTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.SECRET_LOCK_TRANSACTION;

    /** Secret lock transaction body. **/
    public readonly secretLockTransactionBody: SecretLockTransactionBodyBuilder;

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
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param mosaic Locked mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hashAlgorithm Hash algorithm.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        recipientAddress,
        secret,
        mosaic,
        duration,
        hashAlgorithm,
    }: SecretLockTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder({
            recipientAddress,
            secret,
            mosaic,
            duration,
            hashAlgorithm,
        });
        if (version !== SecretLockTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + SecretLockTransactionBuilder.VERSION,
            );
        if (type !== SecretLockTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + SecretLockTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): SecretLockTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretLockTransactionBody: SecretLockTransactionBodyBuilder = SecretLockTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, secretLockTransactionBody.size);
        return new SecretLockTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            recipientAddress: secretLockTransactionBody.recipientAddress,
            secret: secretLockTransactionBody.secret,
            mosaic: secretLockTransactionBody.mosaic,
            duration: secretLockTransactionBody.duration,
            hashAlgorithm: secretLockTransactionBody.hashAlgorithm,
        });
    }

    /**
     * Creates an instance of SecretLockTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param mosaic Locked mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hashAlgorithm Hash algorithm.
     * @return Instance of SecretLockTransactionBuilder.
     */
    public static createSecretLockTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hashAlgorithm: LockHashAlgorithmDto,
    ): SecretLockTransactionBuilder {
        const version = SecretLockTransactionBuilder.VERSION;
        const type = SecretLockTransactionBuilder.ENTITY_TYPE;
        return new SecretLockTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            recipientAddress: recipientAddress,
            secret: secret,
            mosaic: mosaic,
            duration: duration,
            hashAlgorithm: hashAlgorithm,
        });
    }

    /**
     * Gets locked mosaic recipient address.
     *
     * @return Locked mosaic recipient address.
     */
    public get recipientAddress(): UnresolvedAddressDto {
        return this.secretLockTransactionBody.recipientAddress;
    }

    /**
     * Gets secret.
     *
     * @return Secret.
     */
    public get secret(): Hash256Dto {
        return this.secretLockTransactionBody.secret;
    }

    /**
     * Gets locked mosaic.
     *
     * @return Locked mosaic.
     */
    public get mosaic(): UnresolvedMosaicBuilder {
        return this.secretLockTransactionBody.mosaic;
    }

    /**
     * Gets number of blocks for which a lock should be valid.
     *
     * @return Number of blocks for which a lock should be valid.
     */
    public get duration(): BlockDurationDto {
        return this.secretLockTransactionBody.duration;
    }

    /**
     * Gets hash algorithm.
     *
     * @return Hash algorithm.
     */
    public get hashAlgorithm(): LockHashAlgorithmDto {
        return this.secretLockTransactionBody.hashAlgorithm;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.secretLockTransactionBody.size; // secretLockTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): SecretLockTransactionBodyBuilder {
        return this.secretLockTransactionBody;
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
        const secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    }
}

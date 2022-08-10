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

import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretLockTransactionBodyBuilder } from './SecretLockTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 *  Interface to create instances of EmbeddedSecretLockTransactionBuilder.
 */
export interface EmbeddedSecretLockTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
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
 * Binary layout for an embedded secret lock transaction
 **/
export class EmbeddedSecretLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_SECRET_LOCK_TRANSACTION;

    /** Secret lock transaction body. **/
    public readonly secretLockTransactionBody: SecretLockTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param mosaic Locked mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hashAlgorithm Hash algorithm.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        recipientAddress,
        secret,
        mosaic,
        duration,
        hashAlgorithm,
    }: EmbeddedSecretLockTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder({
            recipientAddress,
            secret,
            mosaic,
            duration,
            hashAlgorithm,
        });
        if (version !== EmbeddedSecretLockTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedSecretLockTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedSecretLockTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretLockTransactionBody: SecretLockTransactionBodyBuilder = SecretLockTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, secretLockTransactionBody.size);
        return new EmbeddedSecretLockTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            recipientAddress: secretLockTransactionBody.recipientAddress,
            secret: secretLockTransactionBody.secret,
            mosaic: secretLockTransactionBody.mosaic,
            duration: secretLockTransactionBody.duration,
            hashAlgorithm: secretLockTransactionBody.hashAlgorithm,
        });
    }

    /**
     * Creates an instance of EmbeddedSecretLockTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param mosaic Locked mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hashAlgorithm Hash algorithm.
     * @return Instance of EmbeddedSecretLockTransactionBuilder.
     */
    public static createEmbeddedSecretLockTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hashAlgorithm: LockHashAlgorithmDto,
    ): EmbeddedSecretLockTransactionBuilder {
        const version = EmbeddedSecretLockTransactionBuilder.VERSION;
        const type = EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedSecretLockTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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

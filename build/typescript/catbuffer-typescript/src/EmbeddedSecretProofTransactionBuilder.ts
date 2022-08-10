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
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretProofTransactionBodyBuilder } from './SecretProofTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of EmbeddedSecretProofTransactionBuilder.
 */
export interface EmbeddedSecretProofTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Locked mosaic recipient address. **/
    recipientAddress: UnresolvedAddressDto;
    /** Secret. **/
    secret: Hash256Dto;
    /** Hash algorithm. **/
    hashAlgorithm: LockHashAlgorithmDto;
    /** Proof data. **/
    proof: Uint8Array;
}

/**
 * Binary layout for an embedded secret proof transaction
 **/
export class EmbeddedSecretProofTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_SECRET_PROOF_TRANSACTION;

    /** Secret proof transaction body. **/
    public readonly secretProofTransactionBody: SecretProofTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param hashAlgorithm Hash algorithm.
     * @param proof Proof data.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        recipientAddress,
        secret,
        hashAlgorithm,
        proof,
    }: EmbeddedSecretProofTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder({ recipientAddress, secret, hashAlgorithm, proof });
        if (version !== EmbeddedSecretProofTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedSecretProofTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedSecretProofTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretProofTransactionBody: SecretProofTransactionBodyBuilder = SecretProofTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, secretProofTransactionBody.size);
        return new EmbeddedSecretProofTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            recipientAddress: secretProofTransactionBody.recipientAddress,
            secret: secretProofTransactionBody.secret,
            hashAlgorithm: secretProofTransactionBody.hashAlgorithm,
            proof: secretProofTransactionBody.proof,
        });
    }

    /**
     * Creates an instance of EmbeddedSecretProofTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param hashAlgorithm Hash algorithm.
     * @param proof Proof data.
     * @return Instance of EmbeddedSecretProofTransactionBuilder.
     */
    public static createEmbeddedSecretProofTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        hashAlgorithm: LockHashAlgorithmDto,
        proof: Uint8Array,
    ): EmbeddedSecretProofTransactionBuilder {
        const version = EmbeddedSecretProofTransactionBuilder.VERSION;
        const type = EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedSecretProofTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
        });
    }

    /**
     * Gets locked mosaic recipient address.
     *
     * @return Locked mosaic recipient address.
     */
    public get recipientAddress(): UnresolvedAddressDto {
        return this.secretProofTransactionBody.recipientAddress;
    }

    /**
     * Gets secret.
     *
     * @return Secret.
     */
    public get secret(): Hash256Dto {
        return this.secretProofTransactionBody.secret;
    }

    /**
     * Gets hash algorithm.
     *
     * @return Hash algorithm.
     */
    public get hashAlgorithm(): LockHashAlgorithmDto {
        return this.secretProofTransactionBody.hashAlgorithm;
    }

    /**
     * Gets proof data.
     *
     * @return Proof data.
     */
    public get proof(): Uint8Array {
        return this.secretProofTransactionBody.proof;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.secretProofTransactionBody.size; // secretProofTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): SecretProofTransactionBodyBuilder {
        return this.secretProofTransactionBody;
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
        const secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    }
}

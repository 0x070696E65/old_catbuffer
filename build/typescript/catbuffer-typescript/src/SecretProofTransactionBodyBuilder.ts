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
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of SecretProofTransactionBodyBuilder.
 */
export interface SecretProofTransactionBodyBuilderParams {
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
 * Binary layout for a secret proof transaction
 **/
export class SecretProofTransactionBodyBuilder implements Serializer {
    /** Locked mosaic recipient address. **/
    public readonly recipientAddress: UnresolvedAddressDto;

    /** Secret. **/
    public readonly secret: Hash256Dto;

    /** Hash algorithm. **/
    public readonly hashAlgorithm: LockHashAlgorithmDto;

    /** Proof data. **/
    public readonly proof: Uint8Array;

    /**
     * Constructor.
     *
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param hashAlgorithm Hash algorithm.
     * @param proof Proof data.
     */
    public constructor({ recipientAddress, secret, hashAlgorithm, proof }: SecretProofTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils.notNull(secret, 'secret is null or undefined');
        GeneratorUtils.notNull(hashAlgorithm, 'hashAlgorithm is null or undefined');
        GeneratorUtils.notNull(proof, 'proof is null or undefined');
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.proof = proof;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): SecretProofTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const recipientAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const secret: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.size);
        const proofSize: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const hashAlgorithm: LockHashAlgorithmDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const proof: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), proofSize);
        byteArray.splice(0, proofSize);
        return new SecretProofTransactionBodyBuilder({
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
        });
    }

    /**
     * Creates an instance of SecretProofTransactionBodyBuilder.
     *
     * @param recipientAddress Locked mosaic recipient address.
     * @param secret Secret.
     * @param hashAlgorithm Hash algorithm.
     * @param proof Proof data.
     * @return Instance of SecretProofTransactionBodyBuilder.
     */
    public static createSecretProofTransactionBodyBuilder(
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        hashAlgorithm: LockHashAlgorithmDto,
        proof: Uint8Array,
    ): SecretProofTransactionBodyBuilder {
        return new SecretProofTransactionBodyBuilder({
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.recipientAddress.size; // recipientAddress
        size += this.secret.size; // secret
        size += 2; // proofSize
        size += 1; // hashAlgorithm
        size += this.proof.length; // proof
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const proofSizeBytes = GeneratorUtils.uint16ToBuffer(this.proof.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, proofSizeBytes);
        const hashAlgorithmBytes = GeneratorUtils.uint8ToBuffer(this.hashAlgorithm);
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const proofBytes = this.proof;
        newArray = GeneratorUtils.concatTypedArrays(newArray, proofBytes);
        return newArray;
    }
}

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

import { CosignatureBuilder, CosignatureBuilderParams } from './CosignatureBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';

/**
 *  Interface to create instances of DetachedCosignatureBuilder.
 */
export interface DetachedCosignatureBuilderParams extends CosignatureBuilderParams {
    /** Hash of the aggregate transaction that is signed by this cosignature. **/
    parentHash: Hash256Dto;
}

/**
 * Cosignature detached from an aggregate transaction
 **/
export class DetachedCosignatureBuilder extends CosignatureBuilder implements Serializer {
    /** Hash of the aggregate transaction that is signed by this cosignature. **/
    public readonly parentHash: Hash256Dto;

    /**
     * Constructor.
     *
     * @param version Version.
     * @param signerPublicKey Cosigner public key.
     * @param signature Cosigner signature.
     * @param parentHash Hash of the aggregate transaction that is signed by this cosignature.
     */
    public constructor({ version, signerPublicKey, signature, parentHash }: DetachedCosignatureBuilderParams) {
        super({ version, signerPublicKey, signature });
        GeneratorUtils.notNull(parentHash, 'parentHash is null or undefined');
        this.parentHash = parentHash;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): DetachedCosignatureBuilder {
        const byteArray = Array.from(payload);
        const superObject = CosignatureBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const parentHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, parentHash.size);
        return new DetachedCosignatureBuilder({
            version: superObject.version,
            signerPublicKey: superObject.signerPublicKey,
            signature: superObject.signature,
            parentHash: parentHash,
        });
    }

    /**
     * Creates an instance of DetachedCosignatureBuilder.
     *
     * @param version Version.
     * @param signerPublicKey Cosigner public key.
     * @param signature Cosigner signature.
     * @param parentHash Hash of the aggregate transaction that is signed by this cosignature.
     * @return Instance of DetachedCosignatureBuilder.
     */
    public static createDetachedCosignatureBuilder(
        version: bigint,
        signerPublicKey: KeyDto,
        signature: SignatureDto,
        parentHash: Hash256Dto,
    ): DetachedCosignatureBuilder {
        return new DetachedCosignatureBuilder({
            version: version,
            signerPublicKey: signerPublicKey,
            signature: signature,
            parentHash: parentHash,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.parentHash.size; // parentHash
        return size;
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
        const parentHashBytes = this.parentHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, parentHashBytes);
        return newArray;
    }
}

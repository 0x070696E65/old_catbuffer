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
import { KeyDto } from './KeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';

/**
 *  Interface to create instances of CosignatureBuilder.
 */
export interface CosignatureBuilderParams {
    /** Version. **/
    version: bigint;
    /** Cosigner public key. **/
    signerPublicKey: KeyDto;
    /** Cosigner signature. **/
    signature: SignatureDto;
}

/**
 * Cosignature attached to an aggregate transaction
 **/
export class CosignatureBuilder implements Serializer {
    /** Version. **/
    public readonly version: bigint;

    /** Cosigner public key. **/
    public readonly signerPublicKey: KeyDto;

    /** Cosigner signature. **/
    public readonly signature: SignatureDto;

    /**
     * Constructor.
     *
     * @param version Version.
     * @param signerPublicKey Cosigner public key.
     * @param signature Cosigner signature.
     */
    public constructor({ version, signerPublicKey, signature }: CosignatureBuilderParams) {
        GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils.notNull(signature, 'signature is null or undefined');
        this.version = version;
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): CosignatureBuilder {
        const byteArray = Array.from(payload);
        const version: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const signerPublicKey: KeyDto = KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        const signature: SignatureDto = SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
        return new CosignatureBuilder({ version: version, signerPublicKey: signerPublicKey, signature: signature });
    }

    /**
     * Creates an instance of CosignatureBuilder.
     *
     * @param version Version.
     * @param signerPublicKey Cosigner public key.
     * @param signature Cosigner signature.
     * @return Instance of CosignatureBuilder.
     */
    public static createCosignatureBuilder(version: bigint, signerPublicKey: KeyDto, signature: SignatureDto): CosignatureBuilder {
        return new CosignatureBuilder({ version: version, signerPublicKey: signerPublicKey, signature: signature });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 8; // version
        size += this.signerPublicKey.size; // signerPublicKey
        size += this.signature.size; // signature
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const versionBytes = GeneratorUtils.bigIntToBuffer(this.version);
        newArray = GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        return newArray;
    }
}

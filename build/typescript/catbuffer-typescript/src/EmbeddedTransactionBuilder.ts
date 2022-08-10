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

import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of EmbeddedTransactionBuilder.
 */
export interface EmbeddedTransactionBuilderParams {
    /** Entity signer's public key. **/
    signerPublicKey: KeyDto;
    /** Entity version. **/
    version: number;
    /** Entity network. **/
    network: NetworkTypeDto;
    /** Entity type. **/
    type: EntityTypeDto;
}

/**
 * Binary layout for an embedded transaction
 **/
export class EmbeddedTransactionBuilder implements Serializer {
    /** Entity signer's public key. **/
    public readonly signerPublicKey: KeyDto;

    /** Entity version. **/
    public readonly version: number;

    /** Entity network. **/
    public readonly network: NetworkTypeDto;

    /** Entity type. **/
    public readonly type: EntityTypeDto;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     */
    public constructor({ signerPublicKey, version, network, type }: EmbeddedTransactionBuilderParams) {
        GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils.notNull(type, 'type is null or undefined');
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedTransactionBuilder {
        const byteArray = Array.from(payload);
        const size: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signerPublicKey: KeyDto = KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network: NetworkTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type: EntityTypeDto = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        return new EmbeddedTransactionBuilder({ signerPublicKey: signerPublicKey, version: version, network: network, type: type });
    }

    /**
     * Creates an instance of EmbeddedTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @return Instance of EmbeddedTransactionBuilder.
     */
    public static createEmbeddedTransactionBuilder(
        signerPublicKey: KeyDto,
        version: number,
        network: NetworkTypeDto,
        type: EntityTypeDto,
    ): EmbeddedTransactionBuilder {
        return new EmbeddedTransactionBuilder({ signerPublicKey: signerPublicKey, version: version, network: network, type: type });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 4; // size
        size += 4; // embeddedTransactionHeader_Reserved1
        size += this.signerPublicKey.size; // signerPublicKey
        size += 4; // entityBody_Reserved1
        size += 1; // version
        size += 1; // network
        size += 2; // type
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): undefined | Serializer {
        return undefined;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils.uint32ToBuffer(this.size);
        newArray = GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeader_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, embeddedTransactionHeader_Reserved1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBody_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        const versionBytes = GeneratorUtils.uint8ToBuffer(this.version);
        newArray = GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils.uint8ToBuffer(this.network);
        newArray = GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    }
}

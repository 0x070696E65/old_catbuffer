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
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';

/**
 *  Interface to create instances of TransactionBuilder.
 */
export interface TransactionBuilderParams {
    /** Entity signature. **/
    signature: SignatureDto;
    /** Entity signer's public key. **/
    signerPublicKey: KeyDto;
    /** Entity version. **/
    version: number;
    /** Entity network. **/
    network: NetworkTypeDto;
    /** Entity type. **/
    type: EntityTypeDto;
    /** Transaction fee. **/
    fee: AmountDto;
    /** Transaction deadline. **/
    deadline: TimestampDto;
}

/**
 * Binary layout for a transaction
 **/
export class TransactionBuilder implements Serializer {
    /** Entity signature. **/
    public readonly signature: SignatureDto;

    /** Entity signer's public key. **/
    public readonly signerPublicKey: KeyDto;

    /** Entity version. **/
    public readonly version: number;

    /** Entity network. **/
    public readonly network: NetworkTypeDto;

    /** Entity type. **/
    public readonly type: EntityTypeDto;

    /** Transaction fee. **/
    public readonly fee: AmountDto;

    /** Transaction deadline. **/
    public readonly deadline: TimestampDto;

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
     */
    public constructor({ signature, signerPublicKey, version, network, type, fee, deadline }: TransactionBuilderParams) {
        GeneratorUtils.notNull(signature, 'signature is null or undefined');
        GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils.notNull(type, 'type is null or undefined');
        GeneratorUtils.notNull(fee, 'fee is null or undefined');
        GeneratorUtils.notNull(deadline, 'deadline is null or undefined');
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): TransactionBuilder {
        const byteArray = Array.from(payload);
        const size: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signature: SignatureDto = SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
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
        const fee: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.size);
        const deadline: TimestampDto = TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.size);
        return new TransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
        });
    }

    /**
     * Creates an instance of TransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @return Instance of TransactionBuilder.
     */
    public static createTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        version: number,
        network: NetworkTypeDto,
        type: EntityTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
    ): TransactionBuilder {
        return new TransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 4; // size
        size += 4; // verifiableEntityHeader_Reserved1
        size += this.signature.size; // signature
        size += this.signerPublicKey.size; // signerPublicKey
        size += 4; // entityBody_Reserved1
        size += 1; // version
        size += 1; // network
        size += 2; // type
        size += this.fee.size; // fee
        size += this.deadline.size; // deadline
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
        const verifiableEntityHeader_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeader_Reserved1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
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
        const feeBytes = this.fee.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, feeBytes);
        const deadlineBytes = this.deadline.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, deadlineBytes);
        return newArray;
    }
}

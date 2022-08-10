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
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { TransferTransactionBodyBuilder } from './TransferTransactionBodyBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 *  Interface to create instances of TransferTransactionBuilder.
 */
export interface TransferTransactionBuilderParams extends TransactionBuilderParams {
    /** Recipient address. **/
    recipientAddress: UnresolvedAddressDto;
    /** Attached mosaics. **/
    mosaics: UnresolvedMosaicBuilder[];
    /** Attached message. **/
    message: Uint8Array;
}

/**
 * Binary layout for a non-embedded transfer transaction
 **/
export class TransferTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.TRANSFER_TRANSACTION;

    /** Transfer transaction body. **/
    public readonly transferTransactionBody: TransferTransactionBodyBuilder;

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
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
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
        mosaics,
        message,
    }: TransferTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.transferTransactionBody = new TransferTransactionBodyBuilder({ recipientAddress, mosaics, message });
        if (version !== TransferTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + TransferTransactionBuilder.VERSION,
            );
        if (type !== TransferTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + TransferTransactionBuilder.ENTITY_TYPE);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): TransferTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const transferTransactionBody: TransferTransactionBodyBuilder = TransferTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, transferTransactionBody.size);
        return new TransferTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            recipientAddress: transferTransactionBody.recipientAddress,
            mosaics: transferTransactionBody.mosaics,
            message: transferTransactionBody.message,
        });
    }

    /**
     * Creates an instance of TransferTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     * @return Instance of TransferTransactionBuilder.
     */
    public static createTransferTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        recipientAddress: UnresolvedAddressDto,
        mosaics: UnresolvedMosaicBuilder[],
        message: Uint8Array,
    ): TransferTransactionBuilder {
        const version = TransferTransactionBuilder.VERSION;
        const type = TransferTransactionBuilder.ENTITY_TYPE;
        return new TransferTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            recipientAddress: recipientAddress,
            mosaics: mosaics,
            message: message,
        });
    }

    /**
     * Gets recipient address.
     *
     * @return Recipient address.
     */
    public get recipientAddress(): UnresolvedAddressDto {
        return this.transferTransactionBody.recipientAddress;
    }

    /**
     * Gets attached mosaics.
     *
     * @return Attached mosaics.
     */
    public get mosaics(): UnresolvedMosaicBuilder[] {
        return this.transferTransactionBody.mosaics;
    }

    /**
     * Gets attached message.
     *
     * @return Attached message.
     */
    public get message(): Uint8Array {
        return this.transferTransactionBody.message;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.transferTransactionBody.size; // transferTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): TransferTransactionBodyBuilder {
        return this.transferTransactionBody;
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
        const transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    }
}

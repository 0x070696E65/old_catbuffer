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
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 *  Interface to create instances of TransferTransactionBodyBuilder.
 */
export interface TransferTransactionBodyBuilderParams {
    /** Recipient address. **/
    recipientAddress: UnresolvedAddressDto;
    /** Attached mosaics. **/
    mosaics: UnresolvedMosaicBuilder[];
    /** Attached message. **/
    message: Uint8Array;
}

/**
 * Binary layout for a transfer transaction
 **/
export class TransferTransactionBodyBuilder implements Serializer {
    /** Recipient address. **/
    public readonly recipientAddress: UnresolvedAddressDto;

    /** Attached mosaics. **/
    public readonly mosaics: UnresolvedMosaicBuilder[];

    /** Attached message. **/
    public readonly message: Uint8Array;

    /**
     * Constructor.
     *
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     */
    public constructor({ recipientAddress, mosaics, message }: TransferTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils.notNull(mosaics, 'mosaics is null or undefined');
        GeneratorUtils.notNull(message, 'message is null or undefined');
        this.recipientAddress = recipientAddress;
        this.mosaics = mosaics;
        this.message = message;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): TransferTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const recipientAddress: UnresolvedAddressDto = UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const messageSize: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaicsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const mosaics: UnresolvedMosaicBuilder[] = GeneratorUtils.loadFromBinary(
            UnresolvedMosaicBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            mosaicsCount,
        );
        byteArray.splice(
            0,
            mosaics.reduce((sum, c) => sum + c.size, 0),
        );
        const message: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), messageSize);
        byteArray.splice(0, messageSize);
        return new TransferTransactionBodyBuilder({ recipientAddress: recipientAddress, mosaics: mosaics, message: message });
    }

    /**
     * Creates an instance of TransferTransactionBodyBuilder.
     *
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     * @return Instance of TransferTransactionBodyBuilder.
     */
    public static createTransferTransactionBodyBuilder(
        recipientAddress: UnresolvedAddressDto,
        mosaics: UnresolvedMosaicBuilder[],
        message: Uint8Array,
    ): TransferTransactionBodyBuilder {
        return new TransferTransactionBodyBuilder({ recipientAddress: recipientAddress, mosaics: mosaics, message: message });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.recipientAddress.size; // recipientAddress
        size += 2; // messageSize
        size += 1; // mosaicsCount
        size += 4; // transferTransactionBody_Reserved1
        size += 1; // transferTransactionBody_Reserved2
        size += this.mosaics.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // mosaics
        size += this.message.length; // message
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
        const messageSizeBytes = GeneratorUtils.uint16ToBuffer(this.message.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, messageSizeBytes);
        const mosaicsCountBytes = GeneratorUtils.uint8ToBuffer(this.mosaics.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicsCountBytes);
        const transferTransactionBody_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, transferTransactionBody_Reserved1Bytes);
        const transferTransactionBody_Reserved2Bytes = GeneratorUtils.uint8ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, transferTransactionBody_Reserved2Bytes);
        const mosaicsBytes = GeneratorUtils.writeList(this.mosaics, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicsBytes);
        const messageBytes = this.message;
        newArray = GeneratorUtils.concatTypedArrays(newArray, messageBytes);
        return newArray;
    }
}

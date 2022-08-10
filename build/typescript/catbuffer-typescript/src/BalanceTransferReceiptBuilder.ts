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

import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of BalanceTransferReceiptBuilder.
 */
export interface BalanceTransferReceiptBuilderParams extends ReceiptBuilderParams {
    /** Mosaic. **/
    mosaic: MosaicBuilder;
    /** Mosaic sender address. **/
    senderAddress: AddressDto;
    /** Mosaic recipient address. **/
    recipientAddress: AddressDto;
}

/**
 * Binary layout for a balance transfer receipt
 **/
export class BalanceTransferReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Mosaic. **/
    public readonly mosaic: MosaicBuilder;

    /** Mosaic sender address. **/
    public readonly senderAddress: AddressDto;

    /** Mosaic recipient address. **/
    public readonly recipientAddress: AddressDto;

    /**
     * Constructor.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     * @param senderAddress Mosaic sender address.
     * @param recipientAddress Mosaic recipient address.
     */
    public constructor({ version, type, mosaic, senderAddress, recipientAddress }: BalanceTransferReceiptBuilderParams) {
        super({ version, type });
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(senderAddress, 'senderAddress is null or undefined');
        GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        this.mosaic = mosaic;
        this.senderAddress = senderAddress;
        this.recipientAddress = recipientAddress;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): BalanceTransferReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const senderAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderAddress.size);
        const recipientAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        return new BalanceTransferReceiptBuilder({
            version: superObject.version,
            type: superObject.type,
            mosaic: mosaic,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
        });
    }

    /**
     * Creates an instance of BalanceTransferReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     * @param senderAddress Mosaic sender address.
     * @param recipientAddress Mosaic recipient address.
     * @return Instance of BalanceTransferReceiptBuilder.
     */
    public static createBalanceTransferReceiptBuilder(
        version: number,
        type: ReceiptTypeDto,
        mosaic: MosaicBuilder,
        senderAddress: AddressDto,
        recipientAddress: AddressDto,
    ): BalanceTransferReceiptBuilder {
        return new BalanceTransferReceiptBuilder({
            version: version,
            type: type,
            mosaic: mosaic,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaic.size; // mosaic
        size += this.senderAddress.size; // senderAddress
        size += this.recipientAddress.size; // recipientAddress
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
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const senderAddressBytes = this.senderAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, senderAddressBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    }
}

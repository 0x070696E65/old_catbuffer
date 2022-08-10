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
 *  Interface to create instances of BalanceChangeReceiptBuilder.
 */
export interface BalanceChangeReceiptBuilderParams extends ReceiptBuilderParams {
    /** Mosaic. **/
    mosaic: MosaicBuilder;
    /** Account address. **/
    targetAddress: AddressDto;
}

/**
 * Binary layout for a balance change receipt
 **/
export class BalanceChangeReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Mosaic. **/
    public readonly mosaic: MosaicBuilder;

    /** Account address. **/
    public readonly targetAddress: AddressDto;

    /**
     * Constructor.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     * @param targetAddress Account address.
     */
    public constructor({ version, type, mosaic, targetAddress }: BalanceChangeReceiptBuilderParams) {
        super({ version, type });
        GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        this.mosaic = mosaic;
        this.targetAddress = targetAddress;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): BalanceChangeReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaic: MosaicBuilder = MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const targetAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        return new BalanceChangeReceiptBuilder({
            version: superObject.version,
            type: superObject.type,
            mosaic: mosaic,
            targetAddress: targetAddress,
        });
    }

    /**
     * Creates an instance of BalanceChangeReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param mosaic Mosaic.
     * @param targetAddress Account address.
     * @return Instance of BalanceChangeReceiptBuilder.
     */
    public static createBalanceChangeReceiptBuilder(
        version: number,
        type: ReceiptTypeDto,
        mosaic: MosaicBuilder,
        targetAddress: AddressDto,
    ): BalanceChangeReceiptBuilder {
        return new BalanceChangeReceiptBuilder({ version: version, type: type, mosaic: mosaic, targetAddress: targetAddress });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaic.size; // mosaic
        size += this.targetAddress.size; // targetAddress
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
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}

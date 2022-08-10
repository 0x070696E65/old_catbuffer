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
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of UnresolvedMosaicBuilder.
 */
export interface UnresolvedMosaicBuilderParams {
    /** Mosaic identifier. **/
    mosaicId: UnresolvedMosaicIdDto;
    /** Mosaic amount. **/
    amount: AmountDto;
}

/**
 * Binary layout for an unresolved mosaic
 **/
export class UnresolvedMosaicBuilder implements Serializer {
    /** Mosaic identifier. **/
    public readonly mosaicId: UnresolvedMosaicIdDto;

    /** Mosaic amount. **/
    public readonly amount: AmountDto;

    /**
     * Constructor.
     *
     * @param mosaicId Mosaic identifier.
     * @param amount Mosaic amount.
     */
    public constructor({ mosaicId, amount }: UnresolvedMosaicBuilderParams) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(amount, 'amount is null or undefined');
        this.mosaicId = mosaicId;
        this.amount = amount;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): UnresolvedMosaicBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: UnresolvedMosaicIdDto = UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const amount: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.size);
        return new UnresolvedMosaicBuilder({ mosaicId: mosaicId, amount: amount });
    }

    /**
     * Creates an instance of UnresolvedMosaicBuilder.
     *
     * @param mosaicId Mosaic identifier.
     * @param amount Mosaic amount.
     * @return Instance of UnresolvedMosaicBuilder.
     */
    public static createUnresolvedMosaicBuilder(mosaicId: UnresolvedMosaicIdDto, amount: AmountDto): UnresolvedMosaicBuilder {
        return new UnresolvedMosaicBuilder({ mosaicId: mosaicId, amount: amount });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.mosaicId.size; // mosaicId
        size += this.amount.size; // amount
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}

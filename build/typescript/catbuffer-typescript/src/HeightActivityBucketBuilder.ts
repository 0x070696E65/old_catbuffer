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
import { ImportanceHeightDto } from './ImportanceHeightDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of HeightActivityBucketBuilder.
 */
export interface HeightActivityBucketBuilderParams {
    /** Activity start height. **/
    startHeight: ImportanceHeightDto;
    /** Total fees paid by account. **/
    totalFeesPaid: AmountDto;
    /** Number of times account has been used as a beneficiary. **/
    beneficiaryCount: number;
    /** Raw importance score. **/
    rawScore: bigint;
}

/**
 * Account activity bucket
 **/
export class HeightActivityBucketBuilder implements Serializer {
    /** Activity start height. **/
    public readonly startHeight: ImportanceHeightDto;

    /** Total fees paid by account. **/
    public readonly totalFeesPaid: AmountDto;

    /** Number of times account has been used as a beneficiary. **/
    public readonly beneficiaryCount: number;

    /** Raw importance score. **/
    public readonly rawScore: bigint;

    /**
     * Constructor.
     *
     * @param startHeight Activity start height.
     * @param totalFeesPaid Total fees paid by account.
     * @param beneficiaryCount Number of times account has been used as a beneficiary.
     * @param rawScore Raw importance score.
     */
    public constructor({ startHeight, totalFeesPaid, beneficiaryCount, rawScore }: HeightActivityBucketBuilderParams) {
        GeneratorUtils.notNull(startHeight, 'startHeight is null or undefined');
        GeneratorUtils.notNull(totalFeesPaid, 'totalFeesPaid is null or undefined');
        GeneratorUtils.notNull(beneficiaryCount, 'beneficiaryCount is null or undefined');
        GeneratorUtils.notNull(rawScore, 'rawScore is null or undefined');
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): HeightActivityBucketBuilder {
        const byteArray = Array.from(payload);
        const startHeight: ImportanceHeightDto = ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const totalFeesPaid: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.size);
        const beneficiaryCount: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const rawScore: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new HeightActivityBucketBuilder({
            startHeight: startHeight,
            totalFeesPaid: totalFeesPaid,
            beneficiaryCount: beneficiaryCount,
            rawScore: rawScore,
        });
    }

    /**
     * Creates an instance of HeightActivityBucketBuilder.
     *
     * @param startHeight Activity start height.
     * @param totalFeesPaid Total fees paid by account.
     * @param beneficiaryCount Number of times account has been used as a beneficiary.
     * @param rawScore Raw importance score.
     * @return Instance of HeightActivityBucketBuilder.
     */
    public static createHeightActivityBucketBuilder(
        startHeight: ImportanceHeightDto,
        totalFeesPaid: AmountDto,
        beneficiaryCount: number,
        rawScore: bigint,
    ): HeightActivityBucketBuilder {
        return new HeightActivityBucketBuilder({
            startHeight: startHeight,
            totalFeesPaid: totalFeesPaid,
            beneficiaryCount: beneficiaryCount,
            rawScore: rawScore,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.startHeight.size; // startHeight
        size += this.totalFeesPaid.size; // totalFeesPaid
        size += 4; // beneficiaryCount
        size += 8; // rawScore
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, totalFeesPaidBytes);
        const beneficiaryCountBytes = GeneratorUtils.uint32ToBuffer(this.beneficiaryCount);
        newArray = GeneratorUtils.concatTypedArrays(newArray, beneficiaryCountBytes);
        const rawScoreBytes = GeneratorUtils.bigIntToBuffer(this.rawScore);
        newArray = GeneratorUtils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    }
}

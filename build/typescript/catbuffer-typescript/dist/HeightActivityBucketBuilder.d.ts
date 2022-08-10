import { AmountDto } from './AmountDto';
import { ImportanceHeightDto } from './ImportanceHeightDto';
import { Serializer } from './Serializer';
export interface HeightActivityBucketBuilderParams {
    startHeight: ImportanceHeightDto;
    totalFeesPaid: AmountDto;
    beneficiaryCount: number;
    rawScore: bigint;
}
export declare class HeightActivityBucketBuilder implements Serializer {
    readonly startHeight: ImportanceHeightDto;
    readonly totalFeesPaid: AmountDto;
    readonly beneficiaryCount: number;
    readonly rawScore: bigint;
    constructor({ startHeight, totalFeesPaid, beneficiaryCount, rawScore }: HeightActivityBucketBuilderParams);
    static loadFromBinary(payload: Uint8Array): HeightActivityBucketBuilder;
    static createHeightActivityBucketBuilder(startHeight: ImportanceHeightDto, totalFeesPaid: AmountDto, beneficiaryCount: number, rawScore: bigint): HeightActivityBucketBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

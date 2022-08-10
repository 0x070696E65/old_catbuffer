import { HeightActivityBucketBuilder } from './HeightActivityBucketBuilder';
import { Serializer } from './Serializer';
export interface HeightActivityBucketsBuilderParams {
    buckets: HeightActivityBucketBuilder[];
}
export declare class HeightActivityBucketsBuilder implements Serializer {
    readonly buckets: HeightActivityBucketBuilder[];
    constructor({ buckets }: HeightActivityBucketsBuilderParams);
    static loadFromBinary(payload: Uint8Array): HeightActivityBucketsBuilder;
    static createHeightActivityBucketsBuilder(buckets: HeightActivityBucketBuilder[]): HeightActivityBucketsBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

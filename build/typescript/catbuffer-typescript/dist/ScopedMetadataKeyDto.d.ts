import { Serializer } from './Serializer';
export declare class ScopedMetadataKeyDto implements Serializer {
    readonly scopedMetadataKey: bigint;
    constructor(scopedMetadataKey: bigint);
    static loadFromBinary(payload: Uint8Array): ScopedMetadataKeyDto;
    static createEmpty(): ScopedMetadataKeyDto;
    get size(): number;
    serialize(): Uint8Array;
}

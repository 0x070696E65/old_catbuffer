import { Serializer } from './Serializer';
export declare class ImportanceHeightDto implements Serializer {
    readonly importanceHeight: bigint;
    constructor(importanceHeight: bigint);
    static loadFromBinary(payload: Uint8Array): ImportanceHeightDto;
    static createEmpty(): ImportanceHeightDto;
    get size(): number;
    serialize(): Uint8Array;
}

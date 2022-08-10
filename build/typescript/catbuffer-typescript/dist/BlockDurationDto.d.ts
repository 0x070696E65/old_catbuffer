import { Serializer } from './Serializer';
export declare class BlockDurationDto implements Serializer {
    readonly blockDuration: bigint;
    constructor(blockDuration: bigint);
    static loadFromBinary(payload: Uint8Array): BlockDurationDto;
    static createEmpty(): BlockDurationDto;
    get size(): number;
    serialize(): Uint8Array;
}

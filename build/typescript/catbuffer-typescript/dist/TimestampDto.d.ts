import { Serializer } from './Serializer';
export declare class TimestampDto implements Serializer {
    readonly timestamp: bigint;
    constructor(timestamp: bigint);
    static loadFromBinary(payload: Uint8Array): TimestampDto;
    static createEmpty(): TimestampDto;
    get size(): number;
    serialize(): Uint8Array;
}

import { Serializer } from './Serializer';
export declare class HeightDto implements Serializer {
    readonly height: bigint;
    constructor(height: bigint);
    static loadFromBinary(payload: Uint8Array): HeightDto;
    static createEmpty(): HeightDto;
    get size(): number;
    serialize(): Uint8Array;
}

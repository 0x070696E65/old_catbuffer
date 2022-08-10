import { Serializer } from './Serializer';
export declare class AmountDto implements Serializer {
    readonly amount: bigint;
    constructor(amount: bigint);
    static loadFromBinary(payload: Uint8Array): AmountDto;
    static createEmpty(): AmountDto;
    get size(): number;
    serialize(): Uint8Array;
}

import { Serializer } from './Serializer';
export declare class BlockFeeMultiplierDto implements Serializer {
    readonly blockFeeMultiplier: number;
    constructor(blockFeeMultiplier: number);
    static loadFromBinary(payload: Uint8Array): BlockFeeMultiplierDto;
    static createEmpty(): BlockFeeMultiplierDto;
    get size(): number;
    serialize(): Uint8Array;
}

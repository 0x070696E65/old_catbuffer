import { Serializer } from './Serializer';
export declare class DifficultyDto implements Serializer {
    readonly difficulty: bigint;
    constructor(difficulty: bigint);
    static loadFromBinary(payload: Uint8Array): DifficultyDto;
    static createEmpty(): DifficultyDto;
    get size(): number;
    serialize(): Uint8Array;
}

import { Serializer } from './Serializer';
export declare class ImportanceDto implements Serializer {
    readonly importance: bigint;
    constructor(importance: bigint);
    static loadFromBinary(payload: Uint8Array): ImportanceDto;
    static createEmpty(): ImportanceDto;
    get size(): number;
    serialize(): Uint8Array;
}

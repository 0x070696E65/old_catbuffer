import { Serializer } from './Serializer';
export declare class Hash256Dto implements Serializer {
    readonly hash256: Uint8Array;
    constructor(hash256: Uint8Array);
    static loadFromBinary(payload: Uint8Array): Hash256Dto;
    static createEmpty(): Hash256Dto;
    get size(): number;
    serialize(): Uint8Array;
}

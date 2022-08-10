import { Serializer } from './Serializer';
export declare class Hash512Dto implements Serializer {
    readonly hash512: Uint8Array;
    constructor(hash512: Uint8Array);
    static loadFromBinary(payload: Uint8Array): Hash512Dto;
    static createEmpty(): Hash512Dto;
    get size(): number;
    serialize(): Uint8Array;
}

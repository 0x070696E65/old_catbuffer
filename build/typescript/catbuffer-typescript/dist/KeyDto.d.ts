import { Serializer } from './Serializer';
export declare class KeyDto implements Serializer {
    readonly key: Uint8Array;
    constructor(key: Uint8Array);
    static loadFromBinary(payload: Uint8Array): KeyDto;
    static createEmpty(): KeyDto;
    get size(): number;
    serialize(): Uint8Array;
}

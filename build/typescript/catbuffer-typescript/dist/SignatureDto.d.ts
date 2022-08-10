import { Serializer } from './Serializer';
export declare class SignatureDto implements Serializer {
    readonly signature: Uint8Array;
    constructor(signature: Uint8Array);
    static loadFromBinary(payload: Uint8Array): SignatureDto;
    static createEmpty(): SignatureDto;
    get size(): number;
    serialize(): Uint8Array;
}

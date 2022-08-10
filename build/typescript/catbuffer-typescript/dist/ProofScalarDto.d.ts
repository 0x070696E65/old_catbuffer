import { Serializer } from './Serializer';
export declare class ProofScalarDto implements Serializer {
    readonly proofScalar: Uint8Array;
    constructor(proofScalar: Uint8Array);
    static loadFromBinary(payload: Uint8Array): ProofScalarDto;
    static createEmpty(): ProofScalarDto;
    get size(): number;
    serialize(): Uint8Array;
}

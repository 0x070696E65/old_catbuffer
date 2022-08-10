import { Serializer } from './Serializer';
export declare class ProofVerificationHashDto implements Serializer {
    readonly proofVerificationHash: Uint8Array;
    constructor(proofVerificationHash: Uint8Array);
    static loadFromBinary(payload: Uint8Array): ProofVerificationHashDto;
    static createEmpty(): ProofVerificationHashDto;
    get size(): number;
    serialize(): Uint8Array;
}

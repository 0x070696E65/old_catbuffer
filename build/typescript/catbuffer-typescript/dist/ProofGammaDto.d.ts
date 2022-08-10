import { Serializer } from './Serializer';
export declare class ProofGammaDto implements Serializer {
    readonly proofGamma: Uint8Array;
    constructor(proofGamma: Uint8Array);
    static loadFromBinary(payload: Uint8Array): ProofGammaDto;
    static createEmpty(): ProofGammaDto;
    get size(): number;
    serialize(): Uint8Array;
}

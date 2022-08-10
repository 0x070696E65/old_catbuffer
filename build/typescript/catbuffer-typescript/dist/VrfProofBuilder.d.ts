import { ProofGammaDto } from './ProofGammaDto';
import { ProofScalarDto } from './ProofScalarDto';
import { ProofVerificationHashDto } from './ProofVerificationHashDto';
import { Serializer } from './Serializer';
export interface VrfProofBuilderParams {
    gamma: ProofGammaDto;
    verificationHash: ProofVerificationHashDto;
    scalar: ProofScalarDto;
}
export declare class VrfProofBuilder implements Serializer {
    readonly gamma: ProofGammaDto;
    readonly verificationHash: ProofVerificationHashDto;
    readonly scalar: ProofScalarDto;
    constructor({ gamma, verificationHash, scalar }: VrfProofBuilderParams);
    static loadFromBinary(payload: Uint8Array): VrfProofBuilder;
    static createVrfProofBuilder(gamma: ProofGammaDto, verificationHash: ProofVerificationHashDto, scalar: ProofScalarDto): VrfProofBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

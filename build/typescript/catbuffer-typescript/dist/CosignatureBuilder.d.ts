import { KeyDto } from './KeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
export interface CosignatureBuilderParams {
    version: bigint;
    signerPublicKey: KeyDto;
    signature: SignatureDto;
}
export declare class CosignatureBuilder implements Serializer {
    readonly version: bigint;
    readonly signerPublicKey: KeyDto;
    readonly signature: SignatureDto;
    constructor({ version, signerPublicKey, signature }: CosignatureBuilderParams);
    static loadFromBinary(payload: Uint8Array): CosignatureBuilder;
    static createCosignatureBuilder(version: bigint, signerPublicKey: KeyDto, signature: SignatureDto): CosignatureBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

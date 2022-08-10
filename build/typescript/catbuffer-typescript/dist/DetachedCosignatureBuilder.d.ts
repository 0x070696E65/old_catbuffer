import { CosignatureBuilder, CosignatureBuilderParams } from './CosignatureBuilder';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
export interface DetachedCosignatureBuilderParams extends CosignatureBuilderParams {
    parentHash: Hash256Dto;
}
export declare class DetachedCosignatureBuilder extends CosignatureBuilder implements Serializer {
    readonly parentHash: Hash256Dto;
    constructor({ version, signerPublicKey, signature, parentHash }: DetachedCosignatureBuilderParams);
    static loadFromBinary(payload: Uint8Array): DetachedCosignatureBuilder;
    static createDetachedCosignatureBuilder(version: bigint, signerPublicKey: KeyDto, signature: SignatureDto, parentHash: Hash256Dto): DetachedCosignatureBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

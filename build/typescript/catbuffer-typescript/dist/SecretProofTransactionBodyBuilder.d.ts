import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface SecretProofTransactionBodyBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    secret: Hash256Dto;
    hashAlgorithm: LockHashAlgorithmDto;
    proof: Uint8Array;
}
export declare class SecretProofTransactionBodyBuilder implements Serializer {
    readonly recipientAddress: UnresolvedAddressDto;
    readonly secret: Hash256Dto;
    readonly hashAlgorithm: LockHashAlgorithmDto;
    readonly proof: Uint8Array;
    constructor({ recipientAddress, secret, hashAlgorithm, proof }: SecretProofTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): SecretProofTransactionBodyBuilder;
    static createSecretProofTransactionBodyBuilder(recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array): SecretProofTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

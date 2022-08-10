import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretProofTransactionBodyBuilder } from './SecretProofTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface EmbeddedSecretProofTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    secret: Hash256Dto;
    hashAlgorithm: LockHashAlgorithmDto;
    proof: Uint8Array;
}
export declare class EmbeddedSecretProofTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.SECRET_PROOF_TRANSACTION;
    readonly secretProofTransactionBody: SecretProofTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, recipientAddress, secret, hashAlgorithm, proof, }: EmbeddedSecretProofTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedSecretProofTransactionBuilder;
    static createEmbeddedSecretProofTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array): EmbeddedSecretProofTransactionBuilder;
    get recipientAddress(): UnresolvedAddressDto;
    get secret(): Hash256Dto;
    get hashAlgorithm(): LockHashAlgorithmDto;
    get proof(): Uint8Array;
    get size(): number;
    get body(): SecretProofTransactionBodyBuilder;
    serialize(): Uint8Array;
}

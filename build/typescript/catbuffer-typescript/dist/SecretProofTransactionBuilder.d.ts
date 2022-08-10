import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretProofTransactionBodyBuilder } from './SecretProofTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface SecretProofTransactionBuilderParams extends TransactionBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    secret: Hash256Dto;
    hashAlgorithm: LockHashAlgorithmDto;
    proof: Uint8Array;
}
export declare class SecretProofTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.SECRET_PROOF_TRANSACTION;
    readonly secretProofTransactionBody: SecretProofTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof, }: SecretProofTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): SecretProofTransactionBuilder;
    static createSecretProofTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, hashAlgorithm: LockHashAlgorithmDto, proof: Uint8Array): SecretProofTransactionBuilder;
    get recipientAddress(): UnresolvedAddressDto;
    get secret(): Hash256Dto;
    get hashAlgorithm(): LockHashAlgorithmDto;
    get proof(): Uint8Array;
    get size(): number;
    get body(): SecretProofTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretLockTransactionBodyBuilder } from './SecretLockTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface SecretLockTransactionBuilderParams extends TransactionBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    secret: Hash256Dto;
    mosaic: UnresolvedMosaicBuilder;
    duration: BlockDurationDto;
    hashAlgorithm: LockHashAlgorithmDto;
}
export declare class SecretLockTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.SECRET_LOCK_TRANSACTION;
    readonly secretLockTransactionBody: SecretLockTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm, }: SecretLockTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): SecretLockTransactionBuilder;
    static createSecretLockTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto): SecretLockTransactionBuilder;
    get recipientAddress(): UnresolvedAddressDto;
    get secret(): Hash256Dto;
    get mosaic(): UnresolvedMosaicBuilder;
    get duration(): BlockDurationDto;
    get hashAlgorithm(): LockHashAlgorithmDto;
    get size(): number;
    get body(): SecretLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}

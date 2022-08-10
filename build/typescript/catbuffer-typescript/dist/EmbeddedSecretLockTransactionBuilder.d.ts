import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { SecretLockTransactionBodyBuilder } from './SecretLockTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface EmbeddedSecretLockTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    secret: Hash256Dto;
    mosaic: UnresolvedMosaicBuilder;
    duration: BlockDurationDto;
    hashAlgorithm: LockHashAlgorithmDto;
}
export declare class EmbeddedSecretLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.SECRET_LOCK_TRANSACTION;
    readonly secretLockTransactionBody: SecretLockTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, recipientAddress, secret, mosaic, duration, hashAlgorithm, }: EmbeddedSecretLockTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedSecretLockTransactionBuilder;
    static createEmbeddedSecretLockTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto): EmbeddedSecretLockTransactionBuilder;
    get recipientAddress(): UnresolvedAddressDto;
    get secret(): Hash256Dto;
    get mosaic(): UnresolvedMosaicBuilder;
    get duration(): BlockDurationDto;
    get hashAlgorithm(): LockHashAlgorithmDto;
    get size(): number;
    get body(): SecretLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}

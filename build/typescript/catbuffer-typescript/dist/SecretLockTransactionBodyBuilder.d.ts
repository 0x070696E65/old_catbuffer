import { BlockDurationDto } from './BlockDurationDto';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface SecretLockTransactionBodyBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    secret: Hash256Dto;
    mosaic: UnresolvedMosaicBuilder;
    duration: BlockDurationDto;
    hashAlgorithm: LockHashAlgorithmDto;
}
export declare class SecretLockTransactionBodyBuilder implements Serializer {
    readonly recipientAddress: UnresolvedAddressDto;
    readonly secret: Hash256Dto;
    readonly mosaic: UnresolvedMosaicBuilder;
    readonly duration: BlockDurationDto;
    readonly hashAlgorithm: LockHashAlgorithmDto;
    constructor({ recipientAddress, secret, mosaic, duration, hashAlgorithm }: SecretLockTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): SecretLockTransactionBodyBuilder;
    static createSecretLockTransactionBodyBuilder(recipientAddress: UnresolvedAddressDto, secret: Hash256Dto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hashAlgorithm: LockHashAlgorithmDto): SecretLockTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { HashLockTransactionBodyBuilder } from './HashLockTransactionBodyBuilder';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface HashLockTransactionBuilderParams extends TransactionBuilderParams {
    mosaic: UnresolvedMosaicBuilder;
    duration: BlockDurationDto;
    hash: Hash256Dto;
}
export declare class HashLockTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.HASH_LOCK_TRANSACTION;
    readonly hashLockTransactionBody: HashLockTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash, }: HashLockTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): HashLockTransactionBuilder;
    static createHashLockTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto): HashLockTransactionBuilder;
    get mosaic(): UnresolvedMosaicBuilder;
    get duration(): BlockDurationDto;
    get hash(): Hash256Dto;
    get size(): number;
    get body(): HashLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}

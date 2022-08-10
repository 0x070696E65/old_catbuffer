import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { HashLockTransactionBodyBuilder } from './HashLockTransactionBodyBuilder';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface EmbeddedHashLockTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    mosaic: UnresolvedMosaicBuilder;
    duration: BlockDurationDto;
    hash: Hash256Dto;
}
export declare class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.HASH_LOCK_TRANSACTION;
    readonly hashLockTransactionBody: HashLockTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, mosaic, duration, hash }: EmbeddedHashLockTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedHashLockTransactionBuilder;
    static createEmbeddedHashLockTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto): EmbeddedHashLockTransactionBuilder;
    get mosaic(): UnresolvedMosaicBuilder;
    get duration(): BlockDurationDto;
    get hash(): Hash256Dto;
    get size(): number;
    get body(): HashLockTransactionBodyBuilder;
    serialize(): Uint8Array;
}

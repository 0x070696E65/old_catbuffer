import { BlockDurationDto } from './BlockDurationDto';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface HashLockTransactionBodyBuilderParams {
    mosaic: UnresolvedMosaicBuilder;
    duration: BlockDurationDto;
    hash: Hash256Dto;
}
export declare class HashLockTransactionBodyBuilder implements Serializer {
    readonly mosaic: UnresolvedMosaicBuilder;
    readonly duration: BlockDurationDto;
    readonly hash: Hash256Dto;
    constructor({ mosaic, duration, hash }: HashLockTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): HashLockTransactionBodyBuilder;
    static createHashLockTransactionBodyBuilder(mosaic: UnresolvedMosaicBuilder, duration: BlockDurationDto, hash: Hash256Dto): HashLockTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

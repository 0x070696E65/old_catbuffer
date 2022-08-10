import { AddressDto } from './AddressDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { LockStatusDto } from './LockStatusDto';
import { MosaicBuilder } from './MosaicBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface HashLockInfoBuilderParams extends StateHeaderBuilderParams {
    ownerAddress: AddressDto;
    mosaic: MosaicBuilder;
    endHeight: HeightDto;
    status: LockStatusDto;
    hash: Hash256Dto;
}
export declare class HashLockInfoBuilder extends StateHeaderBuilder implements Serializer {
    readonly ownerAddress: AddressDto;
    readonly mosaic: MosaicBuilder;
    readonly endHeight: HeightDto;
    readonly status: LockStatusDto;
    readonly hash: Hash256Dto;
    constructor({ version, ownerAddress, mosaic, endHeight, status, hash }: HashLockInfoBuilderParams);
    static loadFromBinary(payload: Uint8Array): HashLockInfoBuilder;
    static createHashLockInfoBuilder(version: number, ownerAddress: AddressDto, mosaic: MosaicBuilder, endHeight: HeightDto, status: LockStatusDto, hash: Hash256Dto): HashLockInfoBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

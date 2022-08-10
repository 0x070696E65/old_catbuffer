import { AddressDto } from './AddressDto';
import { MetadataTypeDto } from './MetadataTypeDto';
import { MetadataValueBuilder } from './MetadataValueBuilder';
import { ScopedMetadataKeyDto } from './ScopedMetadataKeyDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface MetadataEntryBuilderParams extends StateHeaderBuilderParams {
    sourceAddress: AddressDto;
    targetAddress: AddressDto;
    scopedMetadataKey: ScopedMetadataKeyDto;
    targetId: bigint;
    metadataType: MetadataTypeDto;
    value: MetadataValueBuilder;
}
export declare class MetadataEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly sourceAddress: AddressDto;
    readonly targetAddress: AddressDto;
    readonly scopedMetadataKey: ScopedMetadataKeyDto;
    readonly targetId: bigint;
    readonly metadataType: MetadataTypeDto;
    readonly value: MetadataValueBuilder;
    constructor({ version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value, }: MetadataEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MetadataEntryBuilder;
    static createMetadataEntryBuilder(version: number, sourceAddress: AddressDto, targetAddress: AddressDto, scopedMetadataKey: ScopedMetadataKeyDto, targetId: bigint, metadataType: MetadataTypeDto, value: MetadataValueBuilder): MetadataEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicMetadataTransactionBodyBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    targetMosaicId: UnresolvedMosaicIdDto;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class MosaicMetadataTransactionBodyBuilder implements Serializer {
    readonly targetAddress: UnresolvedAddressDto;
    readonly scopedMetadataKey: bigint;
    readonly targetMosaicId: UnresolvedMosaicIdDto;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }: MosaicMetadataTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicMetadataTransactionBodyBuilder;
    static createMosaicMetadataTransactionBodyBuilder(targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array): MosaicMetadataTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

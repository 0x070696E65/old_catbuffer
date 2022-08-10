import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface NamespaceMetadataTransactionBodyBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    targetNamespaceId: NamespaceIdDto;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class NamespaceMetadataTransactionBodyBuilder implements Serializer {
    readonly targetAddress: UnresolvedAddressDto;
    readonly scopedMetadataKey: bigint;
    readonly targetNamespaceId: NamespaceIdDto;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }: NamespaceMetadataTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceMetadataTransactionBodyBuilder;
    static createNamespaceMetadataTransactionBodyBuilder(targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array): NamespaceMetadataTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

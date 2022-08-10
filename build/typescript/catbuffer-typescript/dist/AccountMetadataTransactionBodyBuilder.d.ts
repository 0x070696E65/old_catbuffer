import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface AccountMetadataTransactionBodyBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class AccountMetadataTransactionBodyBuilder implements Serializer {
    readonly targetAddress: UnresolvedAddressDto;
    readonly scopedMetadataKey: bigint;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ targetAddress, scopedMetadataKey, valueSizeDelta, value }: AccountMetadataTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountMetadataTransactionBodyBuilder;
    static createAccountMetadataTransactionBodyBuilder(targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, valueSizeDelta: number, value: Uint8Array): AccountMetadataTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

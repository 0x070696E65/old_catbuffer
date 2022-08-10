import { AccountMetadataTransactionBodyBuilder } from './AccountMetadataTransactionBodyBuilder';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface EmbeddedAccountMetadataTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class EmbeddedAccountMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_METADATA_TRANSACTION;
    readonly accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value, }: EmbeddedAccountMetadataTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountMetadataTransactionBuilder;
    static createEmbeddedAccountMetadataTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, valueSizeDelta: number, value: Uint8Array): EmbeddedAccountMetadataTransactionBuilder;
    get targetAddress(): UnresolvedAddressDto;
    get scopedMetadataKey(): bigint;
    get valueSizeDelta(): number;
    get value(): Uint8Array;
    get size(): number;
    get body(): AccountMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}

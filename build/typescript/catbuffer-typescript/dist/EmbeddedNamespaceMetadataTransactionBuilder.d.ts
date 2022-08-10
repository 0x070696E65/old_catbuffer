import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceMetadataTransactionBodyBuilder } from './NamespaceMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface EmbeddedNamespaceMetadataTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    targetNamespaceId: NamespaceIdDto;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class EmbeddedNamespaceMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NAMESPACE_METADATA_TRANSACTION;
    readonly namespaceMetadataTransactionBody: NamespaceMetadataTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }: EmbeddedNamespaceMetadataTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceMetadataTransactionBuilder;
    static createEmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array): EmbeddedNamespaceMetadataTransactionBuilder;
    get targetAddress(): UnresolvedAddressDto;
    get scopedMetadataKey(): bigint;
    get targetNamespaceId(): NamespaceIdDto;
    get valueSizeDelta(): number;
    get value(): Uint8Array;
    get size(): number;
    get body(): NamespaceMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}

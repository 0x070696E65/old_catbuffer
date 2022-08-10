import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceMetadataTransactionBodyBuilder } from './NamespaceMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface NamespaceMetadataTransactionBuilderParams extends TransactionBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    targetNamespaceId: NamespaceIdDto;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class NamespaceMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NAMESPACE_METADATA_TRANSACTION;
    readonly namespaceMetadataTransactionBody: NamespaceMetadataTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }: NamespaceMetadataTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceMetadataTransactionBuilder;
    static createNamespaceMetadataTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array): NamespaceMetadataTransactionBuilder;
    get targetAddress(): UnresolvedAddressDto;
    get scopedMetadataKey(): bigint;
    get targetNamespaceId(): NamespaceIdDto;
    get valueSizeDelta(): number;
    get value(): Uint8Array;
    get size(): number;
    get body(): NamespaceMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}

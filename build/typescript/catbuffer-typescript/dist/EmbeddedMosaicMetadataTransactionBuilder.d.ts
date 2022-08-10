import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicMetadataTransactionBodyBuilder } from './MosaicMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface EmbeddedMosaicMetadataTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    targetMosaicId: UnresolvedMosaicIdDto;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class EmbeddedMosaicMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_METADATA_TRANSACTION;
    readonly mosaicMetadataTransactionBody: MosaicMetadataTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }: EmbeddedMosaicMetadataTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicMetadataTransactionBuilder;
    static createEmbeddedMosaicMetadataTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array): EmbeddedMosaicMetadataTransactionBuilder;
    get targetAddress(): UnresolvedAddressDto;
    get scopedMetadataKey(): bigint;
    get targetMosaicId(): UnresolvedMosaicIdDto;
    get valueSizeDelta(): number;
    get value(): Uint8Array;
    get size(): number;
    get body(): MosaicMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}

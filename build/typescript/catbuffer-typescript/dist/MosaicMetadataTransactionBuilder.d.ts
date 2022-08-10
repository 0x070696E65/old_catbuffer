import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicMetadataTransactionBodyBuilder } from './MosaicMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicMetadataTransactionBuilderParams extends TransactionBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    targetMosaicId: UnresolvedMosaicIdDto;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class MosaicMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_METADATA_TRANSACTION;
    readonly mosaicMetadataTransactionBody: MosaicMetadataTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }: MosaicMetadataTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicMetadataTransactionBuilder;
    static createMosaicMetadataTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array): MosaicMetadataTransactionBuilder;
    get targetAddress(): UnresolvedAddressDto;
    get scopedMetadataKey(): bigint;
    get targetMosaicId(): UnresolvedMosaicIdDto;
    get valueSizeDelta(): number;
    get value(): Uint8Array;
    get size(): number;
    get body(): MosaicMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}

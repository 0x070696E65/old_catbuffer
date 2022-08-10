import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicAddressRestrictionTransactionBodyBuilder } from './MosaicAddressRestrictionTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface EmbeddedMosaicAddressRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    targetAddress: UnresolvedAddressDto;
}
export declare class EmbeddedMosaicAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_ADDRESS_RESTRICTION_TRANSACTION;
    readonly mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }: EmbeddedMosaicAddressRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicAddressRestrictionTransactionBuilder;
    static createEmbeddedMosaicAddressRestrictionTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, mosaicId: UnresolvedMosaicIdDto, restrictionKey: bigint, previousRestrictionValue: bigint, newRestrictionValue: bigint, targetAddress: UnresolvedAddressDto): EmbeddedMosaicAddressRestrictionTransactionBuilder;
    get mosaicId(): UnresolvedMosaicIdDto;
    get restrictionKey(): bigint;
    get previousRestrictionValue(): bigint;
    get newRestrictionValue(): bigint;
    get targetAddress(): UnresolvedAddressDto;
    get size(): number;
    get body(): MosaicAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

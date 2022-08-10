import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicGlobalRestrictionTransactionBodyBuilder } from './MosaicGlobalRestrictionTransactionBodyBuilder';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface EmbeddedMosaicGlobalRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    referenceMosaicId: UnresolvedMosaicIdDto;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    previousRestrictionType: MosaicRestrictionTypeDto;
    newRestrictionType: MosaicRestrictionTypeDto;
}
export declare class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_GLOBAL_RESTRICTION_TRANSACTION;
    readonly mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }: EmbeddedMosaicGlobalRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicGlobalRestrictionTransactionBuilder;
    static createEmbeddedMosaicGlobalRestrictionTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: bigint, previousRestrictionValue: bigint, newRestrictionValue: bigint, previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto): EmbeddedMosaicGlobalRestrictionTransactionBuilder;
    get mosaicId(): UnresolvedMosaicIdDto;
    get referenceMosaicId(): UnresolvedMosaicIdDto;
    get restrictionKey(): bigint;
    get previousRestrictionValue(): bigint;
    get newRestrictionValue(): bigint;
    get previousRestrictionType(): MosaicRestrictionTypeDto;
    get newRestrictionType(): MosaicRestrictionTypeDto;
    get size(): number;
    get body(): MosaicGlobalRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

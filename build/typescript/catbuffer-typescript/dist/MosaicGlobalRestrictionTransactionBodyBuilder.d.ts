import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicGlobalRestrictionTransactionBodyBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    referenceMosaicId: UnresolvedMosaicIdDto;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    previousRestrictionType: MosaicRestrictionTypeDto;
    newRestrictionType: MosaicRestrictionTypeDto;
}
export declare class MosaicGlobalRestrictionTransactionBodyBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly referenceMosaicId: UnresolvedMosaicIdDto;
    readonly restrictionKey: bigint;
    readonly previousRestrictionValue: bigint;
    readonly newRestrictionValue: bigint;
    readonly previousRestrictionType: MosaicRestrictionTypeDto;
    readonly newRestrictionType: MosaicRestrictionTypeDto;
    constructor({ mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }: MosaicGlobalRestrictionTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionTransactionBodyBuilder;
    static createMosaicGlobalRestrictionTransactionBodyBuilder(mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: bigint, previousRestrictionValue: bigint, newRestrictionValue: bigint, previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto): MosaicGlobalRestrictionTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

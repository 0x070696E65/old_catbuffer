import { MosaicIdDto } from './MosaicIdDto';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';
export interface RestrictionRuleBuilderParams {
    referenceMosaicId: MosaicIdDto;
    restrictionValue: bigint;
    restrictionType: MosaicRestrictionTypeDto;
}
export declare class RestrictionRuleBuilder implements Serializer {
    readonly referenceMosaicId: MosaicIdDto;
    readonly restrictionValue: bigint;
    readonly restrictionType: MosaicRestrictionTypeDto;
    constructor({ referenceMosaicId, restrictionValue, restrictionType }: RestrictionRuleBuilderParams);
    static loadFromBinary(payload: Uint8Array): RestrictionRuleBuilder;
    static createRestrictionRuleBuilder(referenceMosaicId: MosaicIdDto, restrictionValue: bigint, restrictionType: MosaicRestrictionTypeDto): RestrictionRuleBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

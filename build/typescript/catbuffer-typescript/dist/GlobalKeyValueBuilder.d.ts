import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { RestrictionRuleBuilder } from './RestrictionRuleBuilder';
import { Serializer } from './Serializer';
export interface GlobalKeyValueBuilderParams {
    key: MosaicRestrictionKeyDto;
    restrictionRule: RestrictionRuleBuilder;
}
export declare class GlobalKeyValueBuilder implements Serializer {
    readonly key: MosaicRestrictionKeyDto;
    readonly restrictionRule: RestrictionRuleBuilder;
    constructor({ key, restrictionRule }: GlobalKeyValueBuilderParams);
    static loadFromBinary(payload: Uint8Array): GlobalKeyValueBuilder;
    static createGlobalKeyValueBuilder(key: MosaicRestrictionKeyDto, restrictionRule: RestrictionRuleBuilder): GlobalKeyValueBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

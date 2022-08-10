import { GlobalKeyValueSetBuilder } from './GlobalKeyValueSetBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export interface MosaicGlobalRestrictionEntryBuilderParams {
    mosaicId: MosaicIdDto;
    keyPairs: GlobalKeyValueSetBuilder;
}
export declare class MosaicGlobalRestrictionEntryBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly keyPairs: GlobalKeyValueSetBuilder;
    constructor({ mosaicId, keyPairs }: MosaicGlobalRestrictionEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionEntryBuilder;
    static createMosaicGlobalRestrictionEntryBuilder(mosaicId: MosaicIdDto, keyPairs: GlobalKeyValueSetBuilder): MosaicGlobalRestrictionEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

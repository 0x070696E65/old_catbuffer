import { MosaicAddressRestrictionEntryBuilder } from './MosaicAddressRestrictionEntryBuilder';
import { MosaicGlobalRestrictionEntryBuilder } from './MosaicGlobalRestrictionEntryBuilder';
import { MosaicRestrictionEntryTypeDto } from './MosaicRestrictionEntryTypeDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface MosaicRestrictionEntryBuilderParams extends StateHeaderBuilderParams {
    entryType: MosaicRestrictionEntryTypeDto;
    addressEntry?: MosaicAddressRestrictionEntryBuilder;
    globalEntry?: MosaicGlobalRestrictionEntryBuilder;
}
export declare class MosaicRestrictionEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly entryType: MosaicRestrictionEntryTypeDto;
    readonly addressEntry?: MosaicAddressRestrictionEntryBuilder;
    readonly globalEntry?: MosaicGlobalRestrictionEntryBuilder;
    constructor({ version, entryType, addressEntry, globalEntry }: MosaicRestrictionEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicRestrictionEntryBuilder;
    static createMosaicRestrictionEntryBuilderGlobal(version: number, globalEntry: MosaicGlobalRestrictionEntryBuilder): MosaicRestrictionEntryBuilder;
    static createMosaicRestrictionEntryBuilderAddress(version: number, addressEntry: MosaicAddressRestrictionEntryBuilder): MosaicRestrictionEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

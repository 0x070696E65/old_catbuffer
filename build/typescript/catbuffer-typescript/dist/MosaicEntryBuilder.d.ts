import { AmountDto } from './AmountDto';
import { MosaicDefinitionBuilder } from './MosaicDefinitionBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface MosaicEntryBuilderParams extends StateHeaderBuilderParams {
    mosaicId: MosaicIdDto;
    supply: AmountDto;
    definition: MosaicDefinitionBuilder;
}
export declare class MosaicEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly supply: AmountDto;
    readonly definition: MosaicDefinitionBuilder;
    constructor({ version, mosaicId, supply, definition }: MosaicEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicEntryBuilder;
    static createMosaicEntryBuilder(version: number, mosaicId: MosaicIdDto, supply: AmountDto, definition: MosaicDefinitionBuilder): MosaicEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

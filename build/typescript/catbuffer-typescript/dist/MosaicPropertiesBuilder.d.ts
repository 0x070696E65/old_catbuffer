import { BlockDurationDto } from './BlockDurationDto';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { Serializer } from './Serializer';
export interface MosaicPropertiesBuilderParams {
    flags: MosaicFlagsDto[];
    divisibility: number;
    duration: BlockDurationDto;
}
export declare class MosaicPropertiesBuilder implements Serializer {
    readonly flags: MosaicFlagsDto[];
    readonly divisibility: number;
    readonly duration: BlockDurationDto;
    constructor({ flags, divisibility, duration }: MosaicPropertiesBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicPropertiesBuilder;
    static createMosaicPropertiesBuilder(flags: MosaicFlagsDto[], divisibility: number, duration: BlockDurationDto): MosaicPropertiesBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { MosaicIdDto } from './MosaicIdDto';
import { ReceiptSourceBuilder } from './ReceiptSourceBuilder';
import { Serializer } from './Serializer';
export interface MosaicResolutionEntryBuilderParams {
    source: ReceiptSourceBuilder;
    resolved: MosaicIdDto;
}
export declare class MosaicResolutionEntryBuilder implements Serializer {
    readonly source: ReceiptSourceBuilder;
    readonly resolved: MosaicIdDto;
    constructor({ source, resolved }: MosaicResolutionEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicResolutionEntryBuilder;
    static createMosaicResolutionEntryBuilder(source: ReceiptSourceBuilder, resolved: MosaicIdDto): MosaicResolutionEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export interface InflationReceiptBuilderParams extends ReceiptBuilderParams {
    mosaic: MosaicBuilder;
}
export declare class InflationReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly mosaic: MosaicBuilder;
    constructor({ version, type, mosaic }: InflationReceiptBuilderParams);
    static loadFromBinary(payload: Uint8Array): InflationReceiptBuilder;
    static createInflationReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder): InflationReceiptBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

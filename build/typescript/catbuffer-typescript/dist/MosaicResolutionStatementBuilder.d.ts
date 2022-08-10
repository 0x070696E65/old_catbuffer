import { MosaicResolutionEntryBuilder } from './MosaicResolutionEntryBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicResolutionStatementBuilderParams extends ReceiptBuilderParams {
    unresolved: UnresolvedMosaicIdDto;
    resolutionEntries: MosaicResolutionEntryBuilder[];
}
export declare class MosaicResolutionStatementBuilder extends ReceiptBuilder implements Serializer {
    readonly unresolved: UnresolvedMosaicIdDto;
    readonly resolutionEntries: MosaicResolutionEntryBuilder[];
    constructor({ version, type, unresolved, resolutionEntries }: MosaicResolutionStatementBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicResolutionStatementBuilder;
    static createMosaicResolutionStatementBuilder(version: number, type: ReceiptTypeDto, unresolved: UnresolvedMosaicIdDto, resolutionEntries: MosaicResolutionEntryBuilder[]): MosaicResolutionStatementBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { MosaicIdDto } from './MosaicIdDto';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export interface MosaicExpiryReceiptBuilderParams extends ReceiptBuilderParams {
    artifactId: MosaicIdDto;
}
export declare class MosaicExpiryReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly artifactId: MosaicIdDto;
    constructor({ version, type, artifactId }: MosaicExpiryReceiptBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicExpiryReceiptBuilder;
    static createMosaicExpiryReceiptBuilder(version: number, type: ReceiptTypeDto, artifactId: MosaicIdDto): MosaicExpiryReceiptBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

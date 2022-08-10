import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export interface ReceiptBuilderParams {
    version: number;
    type: ReceiptTypeDto;
}
export declare class ReceiptBuilder implements Serializer {
    readonly version: number;
    readonly type: ReceiptTypeDto;
    constructor({ version, type }: ReceiptBuilderParams);
    static loadFromBinary(payload: Uint8Array): ReceiptBuilder;
    static createReceiptBuilder(version: number, type: ReceiptTypeDto): ReceiptBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

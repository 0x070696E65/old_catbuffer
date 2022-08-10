import { Serializer } from './Serializer';
export interface ReceiptSourceBuilderParams {
    primaryId: number;
    secondaryId: number;
}
export declare class ReceiptSourceBuilder implements Serializer {
    readonly primaryId: number;
    readonly secondaryId: number;
    constructor({ primaryId, secondaryId }: ReceiptSourceBuilderParams);
    static loadFromBinary(payload: Uint8Array): ReceiptSourceBuilder;
    static createReceiptSourceBuilder(primaryId: number, secondaryId: number): ReceiptSourceBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

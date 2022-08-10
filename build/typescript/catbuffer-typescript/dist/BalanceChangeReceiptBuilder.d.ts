import { AddressDto } from './AddressDto';
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export interface BalanceChangeReceiptBuilderParams extends ReceiptBuilderParams {
    mosaic: MosaicBuilder;
    targetAddress: AddressDto;
}
export declare class BalanceChangeReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly mosaic: MosaicBuilder;
    readonly targetAddress: AddressDto;
    constructor({ version, type, mosaic, targetAddress }: BalanceChangeReceiptBuilderParams);
    static loadFromBinary(payload: Uint8Array): BalanceChangeReceiptBuilder;
    static createBalanceChangeReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, targetAddress: AddressDto): BalanceChangeReceiptBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

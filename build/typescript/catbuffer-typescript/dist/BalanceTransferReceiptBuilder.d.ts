import { AddressDto } from './AddressDto';
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export interface BalanceTransferReceiptBuilderParams extends ReceiptBuilderParams {
    mosaic: MosaicBuilder;
    senderAddress: AddressDto;
    recipientAddress: AddressDto;
}
export declare class BalanceTransferReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly mosaic: MosaicBuilder;
    readonly senderAddress: AddressDto;
    readonly recipientAddress: AddressDto;
    constructor({ version, type, mosaic, senderAddress, recipientAddress }: BalanceTransferReceiptBuilderParams);
    static loadFromBinary(payload: Uint8Array): BalanceTransferReceiptBuilder;
    static createBalanceTransferReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, senderAddress: AddressDto, recipientAddress: AddressDto): BalanceTransferReceiptBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

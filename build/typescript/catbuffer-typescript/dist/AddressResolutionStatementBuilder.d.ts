import { AddressResolutionEntryBuilder } from './AddressResolutionEntryBuilder';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface AddressResolutionStatementBuilderParams extends ReceiptBuilderParams {
    unresolved: UnresolvedAddressDto;
    resolutionEntries: AddressResolutionEntryBuilder[];
}
export declare class AddressResolutionStatementBuilder extends ReceiptBuilder implements Serializer {
    readonly unresolved: UnresolvedAddressDto;
    readonly resolutionEntries: AddressResolutionEntryBuilder[];
    constructor({ version, type, unresolved, resolutionEntries }: AddressResolutionStatementBuilderParams);
    static loadFromBinary(payload: Uint8Array): AddressResolutionStatementBuilder;
    static createAddressResolutionStatementBuilder(version: number, type: ReceiptTypeDto, unresolved: UnresolvedAddressDto, resolutionEntries: AddressResolutionEntryBuilder[]): AddressResolutionStatementBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

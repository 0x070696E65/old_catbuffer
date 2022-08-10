import { AddressDto } from './AddressDto';
import { ReceiptSourceBuilder } from './ReceiptSourceBuilder';
import { Serializer } from './Serializer';
export interface AddressResolutionEntryBuilderParams {
    source: ReceiptSourceBuilder;
    resolved: AddressDto;
}
export declare class AddressResolutionEntryBuilder implements Serializer {
    readonly source: ReceiptSourceBuilder;
    readonly resolved: AddressDto;
    constructor({ source, resolved }: AddressResolutionEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): AddressResolutionEntryBuilder;
    static createAddressResolutionEntryBuilder(source: ReceiptSourceBuilder, resolved: AddressDto): AddressResolutionEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

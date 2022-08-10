import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { Serializer } from './Serializer';
export interface AddressKeyValueBuilderParams {
    key: MosaicRestrictionKeyDto;
    value: bigint;
}
export declare class AddressKeyValueBuilder implements Serializer {
    readonly key: MosaicRestrictionKeyDto;
    readonly value: bigint;
    constructor({ key, value }: AddressKeyValueBuilderParams);
    static loadFromBinary(payload: Uint8Array): AddressKeyValueBuilder;
    static createAddressKeyValueBuilder(key: MosaicRestrictionKeyDto, value: bigint): AddressKeyValueBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { AddressDto } from './AddressDto';
import { AddressKeyValueSetBuilder } from './AddressKeyValueSetBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export interface MosaicAddressRestrictionEntryBuilderParams {
    mosaicId: MosaicIdDto;
    address: AddressDto;
    keyPairs: AddressKeyValueSetBuilder;
}
export declare class MosaicAddressRestrictionEntryBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly address: AddressDto;
    readonly keyPairs: AddressKeyValueSetBuilder;
    constructor({ mosaicId, address, keyPairs }: MosaicAddressRestrictionEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionEntryBuilder;
    static createMosaicAddressRestrictionEntryBuilder(mosaicId: MosaicIdDto, address: AddressDto, keyPairs: AddressKeyValueSetBuilder): MosaicAddressRestrictionEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

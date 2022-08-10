import { AddressKeyValueBuilder } from './AddressKeyValueBuilder';
import { Serializer } from './Serializer';
export interface AddressKeyValueSetBuilderParams {
    keys: AddressKeyValueBuilder[];
}
export declare class AddressKeyValueSetBuilder implements Serializer {
    readonly keys: AddressKeyValueBuilder[];
    constructor({ keys }: AddressKeyValueSetBuilderParams);
    static loadFromBinary(payload: Uint8Array): AddressKeyValueSetBuilder;
    static createAddressKeyValueSetBuilder(keys: AddressKeyValueBuilder[]): AddressKeyValueSetBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { AddressDto } from './AddressDto';
import { Serializer } from './Serializer';
export interface AccountRestrictionAddressValueBuilderParams {
    restrictionValues: AddressDto[];
}
export declare class AccountRestrictionAddressValueBuilder implements Serializer {
    readonly restrictionValues: AddressDto[];
    constructor({ restrictionValues }: AccountRestrictionAddressValueBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionAddressValueBuilder;
    static createAccountRestrictionAddressValueBuilder(restrictionValues: AddressDto[]): AccountRestrictionAddressValueBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

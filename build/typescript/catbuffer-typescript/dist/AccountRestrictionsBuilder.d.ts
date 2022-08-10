import { AccountRestrictionsInfoBuilder } from './AccountRestrictionsInfoBuilder';
import { AddressDto } from './AddressDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface AccountRestrictionsBuilderParams extends StateHeaderBuilderParams {
    address: AddressDto;
    restrictions: AccountRestrictionsInfoBuilder[];
}
export declare class AccountRestrictionsBuilder extends StateHeaderBuilder implements Serializer {
    readonly address: AddressDto;
    readonly restrictions: AccountRestrictionsInfoBuilder[];
    constructor({ version, address, restrictions }: AccountRestrictionsBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionsBuilder;
    static createAccountRestrictionsBuilder(version: number, address: AddressDto, restrictions: AccountRestrictionsInfoBuilder[]): AccountRestrictionsBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

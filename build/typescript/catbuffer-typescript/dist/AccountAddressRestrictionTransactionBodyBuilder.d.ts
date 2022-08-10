import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface AccountAddressRestrictionTransactionBodyBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: UnresolvedAddressDto[];
    restrictionDeletions: UnresolvedAddressDto[];
}
export declare class AccountAddressRestrictionTransactionBodyBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly restrictionAdditions: UnresolvedAddressDto[];
    readonly restrictionDeletions: UnresolvedAddressDto[];
    constructor({ restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountAddressRestrictionTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountAddressRestrictionTransactionBodyBuilder;
    static createAccountAddressRestrictionTransactionBodyBuilder(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]): AccountAddressRestrictionTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

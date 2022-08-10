import { AccountRestrictionAddressValueBuilder } from './AccountRestrictionAddressValueBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AccountRestrictionMosaicValueBuilder } from './AccountRestrictionMosaicValueBuilder';
import { AccountRestrictionTransactionTypeValueBuilder } from './AccountRestrictionTransactionTypeValueBuilder';
import { Serializer } from './Serializer';
export interface AccountRestrictionsInfoBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    addressRestrictions?: AccountRestrictionAddressValueBuilder;
    mosaicIdRestrictions?: AccountRestrictionMosaicValueBuilder;
    transactionTypeRestrictions?: AccountRestrictionTransactionTypeValueBuilder;
}
export declare class AccountRestrictionsInfoBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly addressRestrictions?: AccountRestrictionAddressValueBuilder;
    readonly mosaicIdRestrictions?: AccountRestrictionMosaicValueBuilder;
    readonly transactionTypeRestrictions?: AccountRestrictionTransactionTypeValueBuilder;
    constructor({ restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions, }: AccountRestrictionsInfoBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionsInfoBuilder;
    static createAccountRestrictionsInfoBuilder(restrictionFlags: AccountRestrictionFlagsDto[], addressRestrictions: AccountRestrictionAddressValueBuilder, mosaicIdRestrictions: AccountRestrictionMosaicValueBuilder, transactionTypeRestrictions: AccountRestrictionTransactionTypeValueBuilder): AccountRestrictionsInfoBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

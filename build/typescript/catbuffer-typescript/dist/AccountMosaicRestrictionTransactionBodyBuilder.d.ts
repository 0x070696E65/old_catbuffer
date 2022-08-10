import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface AccountMosaicRestrictionTransactionBodyBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: UnresolvedMosaicIdDto[];
    restrictionDeletions: UnresolvedMosaicIdDto[];
}
export declare class AccountMosaicRestrictionTransactionBodyBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly restrictionAdditions: UnresolvedMosaicIdDto[];
    readonly restrictionDeletions: UnresolvedMosaicIdDto[];
    constructor({ restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountMosaicRestrictionTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountMosaicRestrictionTransactionBodyBuilder;
    static createAccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]): AccountMosaicRestrictionTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

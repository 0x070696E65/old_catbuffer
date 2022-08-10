import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EntityTypeDto } from './EntityTypeDto';
import { Serializer } from './Serializer';
export interface AccountOperationRestrictionTransactionBodyBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: EntityTypeDto[];
    restrictionDeletions: EntityTypeDto[];
}
export declare class AccountOperationRestrictionTransactionBodyBuilder implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlagsDto[];
    readonly restrictionAdditions: EntityTypeDto[];
    readonly restrictionDeletions: EntityTypeDto[];
    constructor({ restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountOperationRestrictionTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountOperationRestrictionTransactionBodyBuilder;
    static createAccountOperationRestrictionTransactionBodyBuilder(restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: EntityTypeDto[], restrictionDeletions: EntityTypeDto[]): AccountOperationRestrictionTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

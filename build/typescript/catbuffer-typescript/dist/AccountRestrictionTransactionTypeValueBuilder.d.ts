import { EntityTypeDto } from './EntityTypeDto';
import { Serializer } from './Serializer';
export interface AccountRestrictionTransactionTypeValueBuilderParams {
    restrictionValues: EntityTypeDto[];
}
export declare class AccountRestrictionTransactionTypeValueBuilder implements Serializer {
    readonly restrictionValues: EntityTypeDto[];
    constructor({ restrictionValues }: AccountRestrictionTransactionTypeValueBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionTransactionTypeValueBuilder;
    static createAccountRestrictionTransactionTypeValueBuilder(restrictionValues: EntityTypeDto[]): AccountRestrictionTransactionTypeValueBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

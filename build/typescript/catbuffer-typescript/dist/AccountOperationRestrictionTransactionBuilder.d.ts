import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface AccountOperationRestrictionTransactionBuilderParams extends TransactionBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: EntityTypeDto[];
    restrictionDeletions: EntityTypeDto[];
}
export declare class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_OPERATION_RESTRICTION_TRANSACTION;
    readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountOperationRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountOperationRestrictionTransactionBuilder;
    static createAccountOperationRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: EntityTypeDto[], restrictionDeletions: EntityTypeDto[]): AccountOperationRestrictionTransactionBuilder;
    get restrictionFlags(): AccountRestrictionFlagsDto[];
    get restrictionAdditions(): EntityTypeDto[];
    get restrictionDeletions(): EntityTypeDto[];
    get size(): number;
    get body(): AccountOperationRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

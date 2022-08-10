import { AccountAddressRestrictionTransactionBodyBuilder } from './AccountAddressRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface AccountAddressRestrictionTransactionBuilderParams extends TransactionBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: UnresolvedAddressDto[];
    restrictionDeletions: UnresolvedAddressDto[];
}
export declare class AccountAddressRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION;
    readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountAddressRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountAddressRestrictionTransactionBuilder;
    static createAccountAddressRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]): AccountAddressRestrictionTransactionBuilder;
    get restrictionFlags(): AccountRestrictionFlagsDto[];
    get restrictionAdditions(): UnresolvedAddressDto[];
    get restrictionDeletions(): UnresolvedAddressDto[];
    get size(): number;
    get body(): AccountAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

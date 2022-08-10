import { AccountMosaicRestrictionTransactionBodyBuilder } from './AccountMosaicRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface AccountMosaicRestrictionTransactionBuilderParams extends TransactionBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: UnresolvedMosaicIdDto[];
    restrictionDeletions: UnresolvedMosaicIdDto[];
}
export declare class AccountMosaicRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION;
    readonly accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountMosaicRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountMosaicRestrictionTransactionBuilder;
    static createAccountMosaicRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]): AccountMosaicRestrictionTransactionBuilder;
    get restrictionFlags(): AccountRestrictionFlagsDto[];
    get restrictionAdditions(): UnresolvedMosaicIdDto[];
    get restrictionDeletions(): UnresolvedMosaicIdDto[];
    get size(): number;
    get body(): AccountMosaicRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

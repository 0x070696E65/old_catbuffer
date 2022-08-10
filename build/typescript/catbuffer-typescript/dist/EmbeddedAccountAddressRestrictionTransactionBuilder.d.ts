import { AccountAddressRestrictionTransactionBodyBuilder } from './AccountAddressRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface EmbeddedAccountAddressRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: UnresolvedAddressDto[];
    restrictionDeletions: UnresolvedAddressDto[];
}
export declare class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION;
    readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }: EmbeddedAccountAddressRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountAddressRestrictionTransactionBuilder;
    static createEmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]): EmbeddedAccountAddressRestrictionTransactionBuilder;
    get restrictionFlags(): AccountRestrictionFlagsDto[];
    get restrictionAdditions(): UnresolvedAddressDto[];
    get restrictionDeletions(): UnresolvedAddressDto[];
    get size(): number;
    get body(): AccountAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { AccountMosaicRestrictionTransactionBodyBuilder } from './AccountMosaicRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface EmbeddedAccountMosaicRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: UnresolvedMosaicIdDto[];
    restrictionDeletions: UnresolvedMosaicIdDto[];
}
export declare class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION;
    readonly accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }: EmbeddedAccountMosaicRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountMosaicRestrictionTransactionBuilder;
    static createEmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedMosaicIdDto[], restrictionDeletions: UnresolvedMosaicIdDto[]): EmbeddedAccountMosaicRestrictionTransactionBuilder;
    get restrictionFlags(): AccountRestrictionFlagsDto[];
    get restrictionAdditions(): UnresolvedMosaicIdDto[];
    get restrictionDeletions(): UnresolvedMosaicIdDto[];
    get size(): number;
    get body(): AccountMosaicRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

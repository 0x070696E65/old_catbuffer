import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedAccountOperationRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    restrictionFlags: AccountRestrictionFlagsDto[];
    restrictionAdditions: EntityTypeDto[];
    restrictionDeletions: EntityTypeDto[];
}
export declare class EmbeddedAccountOperationRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_OPERATION_RESTRICTION_TRANSACTION;
    readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }: EmbeddedAccountOperationRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountOperationRestrictionTransactionBuilder;
    static createEmbeddedAccountOperationRestrictionTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: EntityTypeDto[], restrictionDeletions: EntityTypeDto[]): EmbeddedAccountOperationRestrictionTransactionBuilder;
    get restrictionFlags(): AccountRestrictionFlagsDto[];
    get restrictionAdditions(): EntityTypeDto[];
    get restrictionDeletions(): EntityTypeDto[];
    get size(): number;
    get body(): AccountOperationRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

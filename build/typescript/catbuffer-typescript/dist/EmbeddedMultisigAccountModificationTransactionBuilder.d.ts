import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MultisigAccountModificationTransactionBodyBuilder } from './MultisigAccountModificationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface EmbeddedMultisigAccountModificationTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    minRemovalDelta: number;
    minApprovalDelta: number;
    addressAdditions: UnresolvedAddressDto[];
    addressDeletions: UnresolvedAddressDto[];
}
export declare class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION;
    readonly multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }: EmbeddedMultisigAccountModificationTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMultisigAccountModificationTransactionBuilder;
    static createEmbeddedMultisigAccountModificationTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]): EmbeddedMultisigAccountModificationTransactionBuilder;
    get minRemovalDelta(): number;
    get minApprovalDelta(): number;
    get addressAdditions(): UnresolvedAddressDto[];
    get addressDeletions(): UnresolvedAddressDto[];
    get size(): number;
    get body(): MultisigAccountModificationTransactionBodyBuilder;
    serialize(): Uint8Array;
}

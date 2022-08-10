import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MultisigAccountModificationTransactionBodyBuilder } from './MultisigAccountModificationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface MultisigAccountModificationTransactionBuilderParams extends TransactionBuilderParams {
    minRemovalDelta: number;
    minApprovalDelta: number;
    addressAdditions: UnresolvedAddressDto[];
    addressDeletions: UnresolvedAddressDto[];
}
export declare class MultisigAccountModificationTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION;
    readonly multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }: MultisigAccountModificationTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MultisigAccountModificationTransactionBuilder;
    static createMultisigAccountModificationTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]): MultisigAccountModificationTransactionBuilder;
    get minRemovalDelta(): number;
    get minApprovalDelta(): number;
    get addressAdditions(): UnresolvedAddressDto[];
    get addressDeletions(): UnresolvedAddressDto[];
    get size(): number;
    get body(): MultisigAccountModificationTransactionBodyBuilder;
    serialize(): Uint8Array;
}

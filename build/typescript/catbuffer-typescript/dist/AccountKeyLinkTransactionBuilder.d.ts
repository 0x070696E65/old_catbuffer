import { AccountKeyLinkTransactionBodyBuilder } from './AccountKeyLinkTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface AccountKeyLinkTransactionBuilderParams extends TransactionBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class AccountKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_KEY_LINK_TRANSACTION;
    readonly accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }: AccountKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountKeyLinkTransactionBuilder;
    static createAccountKeyLinkTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: KeyDto, linkAction: LinkActionDto): AccountKeyLinkTransactionBuilder;
    get linkedPublicKey(): KeyDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): AccountKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

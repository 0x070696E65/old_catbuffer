import { AccountKeyLinkTransactionBodyBuilder } from './AccountKeyLinkTransactionBodyBuilder';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedAccountKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_KEY_LINK_TRANSACTION;
    readonly accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction, }: EmbeddedAccountKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountKeyLinkTransactionBuilder;
    static createEmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, linkedPublicKey: KeyDto, linkAction: LinkActionDto): EmbeddedAccountKeyLinkTransactionBuilder;
    get linkedPublicKey(): KeyDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): AccountKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { NodeKeyLinkTransactionBodyBuilder } from './NodeKeyLinkTransactionBodyBuilder';
import { Serializer } from './Serializer';
export interface EmbeddedNodeKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class EmbeddedNodeKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NODE_KEY_LINK_TRANSACTION;
    readonly nodeKeyLinkTransactionBody: NodeKeyLinkTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction, }: EmbeddedNodeKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedNodeKeyLinkTransactionBuilder;
    static createEmbeddedNodeKeyLinkTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, linkedPublicKey: KeyDto, linkAction: LinkActionDto): EmbeddedNodeKeyLinkTransactionBuilder;
    get linkedPublicKey(): KeyDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): NodeKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

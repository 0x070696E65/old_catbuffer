import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { NodeKeyLinkTransactionBodyBuilder } from './NodeKeyLinkTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface NodeKeyLinkTransactionBuilderParams extends TransactionBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class NodeKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NODE_KEY_LINK_TRANSACTION;
    readonly nodeKeyLinkTransactionBody: NodeKeyLinkTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }: NodeKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): NodeKeyLinkTransactionBuilder;
    static createNodeKeyLinkTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: KeyDto, linkAction: LinkActionDto): NodeKeyLinkTransactionBuilder;
    get linkedPublicKey(): KeyDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): NodeKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

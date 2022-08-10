import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
export interface NodeKeyLinkTransactionBodyBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class NodeKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: KeyDto;
    readonly linkAction: LinkActionDto;
    constructor({ linkedPublicKey, linkAction }: NodeKeyLinkTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): NodeKeyLinkTransactionBodyBuilder;
    static createNodeKeyLinkTransactionBodyBuilder(linkedPublicKey: KeyDto, linkAction: LinkActionDto): NodeKeyLinkTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

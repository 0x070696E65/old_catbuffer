import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
export interface AccountKeyLinkTransactionBodyBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class AccountKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: KeyDto;
    readonly linkAction: LinkActionDto;
    constructor({ linkedPublicKey, linkAction }: AccountKeyLinkTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountKeyLinkTransactionBodyBuilder;
    static createAccountKeyLinkTransactionBodyBuilder(linkedPublicKey: KeyDto, linkAction: LinkActionDto): AccountKeyLinkTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
export interface VrfKeyLinkTransactionBodyBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class VrfKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: KeyDto;
    readonly linkAction: LinkActionDto;
    constructor({ linkedPublicKey, linkAction }: VrfKeyLinkTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): VrfKeyLinkTransactionBodyBuilder;
    static createVrfKeyLinkTransactionBodyBuilder(linkedPublicKey: KeyDto, linkAction: LinkActionDto): VrfKeyLinkTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

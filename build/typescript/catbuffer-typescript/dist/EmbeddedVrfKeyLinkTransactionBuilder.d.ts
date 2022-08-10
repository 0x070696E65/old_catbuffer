import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { VrfKeyLinkTransactionBodyBuilder } from './VrfKeyLinkTransactionBodyBuilder';
export interface EmbeddedVrfKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.VRF_KEY_LINK_TRANSACTION;
    readonly vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction, }: EmbeddedVrfKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedVrfKeyLinkTransactionBuilder;
    static createEmbeddedVrfKeyLinkTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, linkedPublicKey: KeyDto, linkAction: LinkActionDto): EmbeddedVrfKeyLinkTransactionBuilder;
    get linkedPublicKey(): KeyDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): VrfKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

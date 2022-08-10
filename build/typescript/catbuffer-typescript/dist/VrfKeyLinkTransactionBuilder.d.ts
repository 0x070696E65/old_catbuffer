import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { VrfKeyLinkTransactionBodyBuilder } from './VrfKeyLinkTransactionBodyBuilder';
export interface VrfKeyLinkTransactionBuilderParams extends TransactionBuilderParams {
    linkedPublicKey: KeyDto;
    linkAction: LinkActionDto;
}
export declare class VrfKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.VRF_KEY_LINK_TRANSACTION;
    readonly vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }: VrfKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): VrfKeyLinkTransactionBuilder;
    static createVrfKeyLinkTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: KeyDto, linkAction: LinkActionDto): VrfKeyLinkTransactionBuilder;
    get linkedPublicKey(): KeyDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): VrfKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

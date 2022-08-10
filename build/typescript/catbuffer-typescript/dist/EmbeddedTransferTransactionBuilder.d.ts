import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { TransferTransactionBodyBuilder } from './TransferTransactionBodyBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface EmbeddedTransferTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    mosaics: UnresolvedMosaicBuilder[];
    message: Uint8Array;
}
export declare class EmbeddedTransferTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.TRANSFER_TRANSACTION;
    readonly transferTransactionBody: TransferTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, recipientAddress, mosaics, message, }: EmbeddedTransferTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedTransferTransactionBuilder;
    static createEmbeddedTransferTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array): EmbeddedTransferTransactionBuilder;
    get recipientAddress(): UnresolvedAddressDto;
    get mosaics(): UnresolvedMosaicBuilder[];
    get message(): Uint8Array;
    get size(): number;
    get body(): TransferTransactionBodyBuilder;
    serialize(): Uint8Array;
}

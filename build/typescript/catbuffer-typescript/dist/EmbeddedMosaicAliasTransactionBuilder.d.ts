import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicAliasTransactionBodyBuilder } from './MosaicAliasTransactionBodyBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedMosaicAliasTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    namespaceId: NamespaceIdDto;
    mosaicId: MosaicIdDto;
    aliasAction: AliasActionDto;
}
export declare class EmbeddedMosaicAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_ALIAS_TRANSACTION;
    readonly mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, namespaceId, mosaicId, aliasAction, }: EmbeddedMosaicAliasTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicAliasTransactionBuilder;
    static createEmbeddedMosaicAliasTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto): EmbeddedMosaicAliasTransactionBuilder;
    get namespaceId(): NamespaceIdDto;
    get mosaicId(): MosaicIdDto;
    get aliasAction(): AliasActionDto;
    get size(): number;
    get body(): MosaicAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}

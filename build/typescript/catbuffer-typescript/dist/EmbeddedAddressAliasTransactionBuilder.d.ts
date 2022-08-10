import { AddressAliasTransactionBodyBuilder } from './AddressAliasTransactionBodyBuilder';
import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedAddressAliasTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    namespaceId: NamespaceIdDto;
    address: AddressDto;
    aliasAction: AliasActionDto;
}
export declare class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ADDRESS_ALIAS_TRANSACTION;
    readonly addressAliasTransactionBody: AddressAliasTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, namespaceId, address, aliasAction, }: EmbeddedAddressAliasTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedAddressAliasTransactionBuilder;
    static createEmbeddedAddressAliasTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto): EmbeddedAddressAliasTransactionBuilder;
    get namespaceId(): NamespaceIdDto;
    get address(): AddressDto;
    get aliasAction(): AliasActionDto;
    get size(): number;
    get body(): AddressAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { AddressAliasTransactionBodyBuilder } from './AddressAliasTransactionBodyBuilder';
import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface AddressAliasTransactionBuilderParams extends TransactionBuilderParams {
    namespaceId: NamespaceIdDto;
    address: AddressDto;
    aliasAction: AliasActionDto;
}
export declare class AddressAliasTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ADDRESS_ALIAS_TRANSACTION;
    readonly addressAliasTransactionBody: AddressAliasTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction, }: AddressAliasTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AddressAliasTransactionBuilder;
    static createAddressAliasTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto): AddressAliasTransactionBuilder;
    get namespaceId(): NamespaceIdDto;
    get address(): AddressDto;
    get aliasAction(): AliasActionDto;
    get size(): number;
    get body(): AddressAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}

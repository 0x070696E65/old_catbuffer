import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
export interface AddressAliasTransactionBodyBuilderParams {
    namespaceId: NamespaceIdDto;
    address: AddressDto;
    aliasAction: AliasActionDto;
}
export declare class AddressAliasTransactionBodyBuilder implements Serializer {
    readonly namespaceId: NamespaceIdDto;
    readonly address: AddressDto;
    readonly aliasAction: AliasActionDto;
    constructor({ namespaceId, address, aliasAction }: AddressAliasTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AddressAliasTransactionBodyBuilder;
    static createAddressAliasTransactionBodyBuilder(namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto): AddressAliasTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

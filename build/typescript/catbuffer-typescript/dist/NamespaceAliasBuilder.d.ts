import { AddressDto } from './AddressDto';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceAliasTypeDto } from './NamespaceAliasTypeDto';
import { Serializer } from './Serializer';
export interface NamespaceAliasBuilderParams {
    namespaceAliasType: NamespaceAliasTypeDto;
    mosaicAlias?: MosaicIdDto;
    addressAlias?: AddressDto;
}
export declare class NamespaceAliasBuilder implements Serializer {
    readonly namespaceAliasType: NamespaceAliasTypeDto;
    readonly mosaicAlias?: MosaicIdDto;
    readonly addressAlias?: AddressDto;
    constructor({ namespaceAliasType, mosaicAlias, addressAlias }: NamespaceAliasBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceAliasBuilder;
    static createNamespaceAliasBuilderNone(): NamespaceAliasBuilder;
    static createNamespaceAliasBuilderAddress(addressAlias: AddressDto): NamespaceAliasBuilder;
    static createNamespaceAliasBuilderMosaicId(mosaicAlias: MosaicIdDto): NamespaceAliasBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

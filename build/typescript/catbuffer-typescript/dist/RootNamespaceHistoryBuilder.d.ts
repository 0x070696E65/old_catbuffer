import { AddressDto } from './AddressDto';
import { NamespaceAliasBuilder } from './NamespaceAliasBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceLifetimeBuilder } from './NamespaceLifetimeBuilder';
import { NamespacePathBuilder } from './NamespacePathBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface RootNamespaceHistoryBuilderParams extends StateHeaderBuilderParams {
    id: NamespaceIdDto;
    ownerAddress: AddressDto;
    lifetime: NamespaceLifetimeBuilder;
    rootAlias: NamespaceAliasBuilder;
    paths: NamespacePathBuilder[];
}
export declare class RootNamespaceHistoryBuilder extends StateHeaderBuilder implements Serializer {
    readonly id: NamespaceIdDto;
    readonly ownerAddress: AddressDto;
    readonly lifetime: NamespaceLifetimeBuilder;
    readonly rootAlias: NamespaceAliasBuilder;
    readonly paths: NamespacePathBuilder[];
    constructor({ version, id, ownerAddress, lifetime, rootAlias, paths }: RootNamespaceHistoryBuilderParams);
    static loadFromBinary(payload: Uint8Array): RootNamespaceHistoryBuilder;
    static createRootNamespaceHistoryBuilder(version: number, id: NamespaceIdDto, ownerAddress: AddressDto, lifetime: NamespaceLifetimeBuilder, rootAlias: NamespaceAliasBuilder, paths: NamespacePathBuilder[]): RootNamespaceHistoryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

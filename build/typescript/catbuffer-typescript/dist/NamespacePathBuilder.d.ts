import { NamespaceAliasBuilder } from './NamespaceAliasBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
export interface NamespacePathBuilderParams {
    path: NamespaceIdDto[];
    alias: NamespaceAliasBuilder;
}
export declare class NamespacePathBuilder implements Serializer {
    readonly path: NamespaceIdDto[];
    readonly alias: NamespaceAliasBuilder;
    constructor({ path, alias }: NamespacePathBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespacePathBuilder;
    static createNamespacePathBuilder(path: NamespaceIdDto[], alias: NamespaceAliasBuilder): NamespacePathBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

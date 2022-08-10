import { AliasActionDto } from './AliasActionDto';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';
export interface MosaicAliasTransactionBodyBuilderParams {
    namespaceId: NamespaceIdDto;
    mosaicId: MosaicIdDto;
    aliasAction: AliasActionDto;
}
export declare class MosaicAliasTransactionBodyBuilder implements Serializer {
    readonly namespaceId: NamespaceIdDto;
    readonly mosaicId: MosaicIdDto;
    readonly aliasAction: AliasActionDto;
    constructor({ namespaceId, mosaicId, aliasAction }: MosaicAliasTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicAliasTransactionBodyBuilder;
    static createMosaicAliasTransactionBodyBuilder(namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto): MosaicAliasTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

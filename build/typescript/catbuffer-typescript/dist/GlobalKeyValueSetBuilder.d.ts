import { GlobalKeyValueBuilder } from './GlobalKeyValueBuilder';
import { Serializer } from './Serializer';
export interface GlobalKeyValueSetBuilderParams {
    keys: GlobalKeyValueBuilder[];
}
export declare class GlobalKeyValueSetBuilder implements Serializer {
    readonly keys: GlobalKeyValueBuilder[];
    constructor({ keys }: GlobalKeyValueSetBuilderParams);
    static loadFromBinary(payload: Uint8Array): GlobalKeyValueSetBuilder;
    static createGlobalKeyValueSetBuilder(keys: GlobalKeyValueBuilder[]): GlobalKeyValueSetBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

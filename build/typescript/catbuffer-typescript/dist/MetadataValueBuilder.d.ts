import { Serializer } from './Serializer';
export interface MetadataValueBuilderParams {
    data: Uint8Array;
}
export declare class MetadataValueBuilder implements Serializer {
    readonly data: Uint8Array;
    constructor({ data }: MetadataValueBuilderParams);
    static loadFromBinary(payload: Uint8Array): MetadataValueBuilder;
    static createMetadataValueBuilder(data: Uint8Array): MetadataValueBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

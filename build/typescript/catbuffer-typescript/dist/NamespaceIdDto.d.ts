import { Serializer } from './Serializer';
export declare class NamespaceIdDto implements Serializer {
    readonly namespaceId: bigint;
    constructor(namespaceId: bigint);
    static loadFromBinary(payload: Uint8Array): NamespaceIdDto;
    static createEmpty(): NamespaceIdDto;
    get size(): number;
    serialize(): Uint8Array;
}

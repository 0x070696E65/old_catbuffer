import { Serializer } from './Serializer';
export declare class UnresolvedMosaicIdDto implements Serializer {
    readonly unresolvedMosaicId: bigint;
    constructor(unresolvedMosaicId: bigint);
    static loadFromBinary(payload: Uint8Array): UnresolvedMosaicIdDto;
    static createEmpty(): UnresolvedMosaicIdDto;
    get size(): number;
    serialize(): Uint8Array;
}

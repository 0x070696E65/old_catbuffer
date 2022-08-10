import { Serializer } from './Serializer';
export declare class MosaicIdDto implements Serializer {
    readonly mosaicId: bigint;
    constructor(mosaicId: bigint);
    static loadFromBinary(payload: Uint8Array): MosaicIdDto;
    static createEmpty(): MosaicIdDto;
    get size(): number;
    serialize(): Uint8Array;
}

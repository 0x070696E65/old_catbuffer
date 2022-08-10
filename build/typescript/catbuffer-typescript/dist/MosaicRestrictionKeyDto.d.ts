import { Serializer } from './Serializer';
export declare class MosaicRestrictionKeyDto implements Serializer {
    readonly mosaicRestrictionKey: bigint;
    constructor(mosaicRestrictionKey: bigint);
    static loadFromBinary(payload: Uint8Array): MosaicRestrictionKeyDto;
    static createEmpty(): MosaicRestrictionKeyDto;
    get size(): number;
    serialize(): Uint8Array;
}

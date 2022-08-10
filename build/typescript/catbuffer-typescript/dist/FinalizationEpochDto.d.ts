import { Serializer } from './Serializer';
export declare class FinalizationEpochDto implements Serializer {
    readonly finalizationEpoch: number;
    constructor(finalizationEpoch: number);
    static loadFromBinary(payload: Uint8Array): FinalizationEpochDto;
    static createEmpty(): FinalizationEpochDto;
    get size(): number;
    serialize(): Uint8Array;
}

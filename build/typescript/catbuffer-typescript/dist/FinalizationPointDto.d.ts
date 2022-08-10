import { Serializer } from './Serializer';
export declare class FinalizationPointDto implements Serializer {
    readonly finalizationPoint: number;
    constructor(finalizationPoint: number);
    static loadFromBinary(payload: Uint8Array): FinalizationPointDto;
    static createEmpty(): FinalizationPointDto;
    get size(): number;
    serialize(): Uint8Array;
}

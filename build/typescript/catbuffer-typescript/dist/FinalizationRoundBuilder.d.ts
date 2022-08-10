import { FinalizationEpochDto } from './FinalizationEpochDto';
import { FinalizationPointDto } from './FinalizationPointDto';
import { Serializer } from './Serializer';
export interface FinalizationRoundBuilderParams {
    epoch: FinalizationEpochDto;
    point: FinalizationPointDto;
}
export declare class FinalizationRoundBuilder implements Serializer {
    readonly epoch: FinalizationEpochDto;
    readonly point: FinalizationPointDto;
    constructor({ epoch, point }: FinalizationRoundBuilderParams);
    static loadFromBinary(payload: Uint8Array): FinalizationRoundBuilder;
    static createFinalizationRoundBuilder(epoch: FinalizationEpochDto, point: FinalizationPointDto): FinalizationRoundBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

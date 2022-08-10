import { FinalizationRoundBuilder } from './FinalizationRoundBuilder';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { Serializer } from './Serializer';
export interface FinalizedBlockHeaderBuilderParams {
    round: FinalizationRoundBuilder;
    height: HeightDto;
    hash: Hash256Dto;
}
export declare class FinalizedBlockHeaderBuilder implements Serializer {
    readonly round: FinalizationRoundBuilder;
    readonly height: HeightDto;
    readonly hash: Hash256Dto;
    constructor({ round, height, hash }: FinalizedBlockHeaderBuilderParams);
    static loadFromBinary(payload: Uint8Array): FinalizedBlockHeaderBuilder;
    static createFinalizedBlockHeaderBuilder(round: FinalizationRoundBuilder, height: HeightDto, hash: Hash256Dto): FinalizedBlockHeaderBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

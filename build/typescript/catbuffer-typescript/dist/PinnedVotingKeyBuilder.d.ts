import { FinalizationEpochDto } from './FinalizationEpochDto';
import { Serializer } from './Serializer';
import { VotingKeyDto } from './VotingKeyDto';
export interface PinnedVotingKeyBuilderParams {
    votingKey: VotingKeyDto;
    startEpoch: FinalizationEpochDto;
    endEpoch: FinalizationEpochDto;
}
export declare class PinnedVotingKeyBuilder implements Serializer {
    readonly votingKey: VotingKeyDto;
    readonly startEpoch: FinalizationEpochDto;
    readonly endEpoch: FinalizationEpochDto;
    constructor({ votingKey, startEpoch, endEpoch }: PinnedVotingKeyBuilderParams);
    static loadFromBinary(payload: Uint8Array): PinnedVotingKeyBuilder;
    static createPinnedVotingKeyBuilder(votingKey: VotingKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto): PinnedVotingKeyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

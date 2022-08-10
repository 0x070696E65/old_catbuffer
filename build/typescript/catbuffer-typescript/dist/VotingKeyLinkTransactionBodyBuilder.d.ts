import { FinalizationEpochDto } from './FinalizationEpochDto';
import { LinkActionDto } from './LinkActionDto';
import { Serializer } from './Serializer';
import { VotingKeyDto } from './VotingKeyDto';
export interface VotingKeyLinkTransactionBodyBuilderParams {
    linkedPublicKey: VotingKeyDto;
    startEpoch: FinalizationEpochDto;
    endEpoch: FinalizationEpochDto;
    linkAction: LinkActionDto;
}
export declare class VotingKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: VotingKeyDto;
    readonly startEpoch: FinalizationEpochDto;
    readonly endEpoch: FinalizationEpochDto;
    readonly linkAction: LinkActionDto;
    constructor({ linkedPublicKey, startEpoch, endEpoch, linkAction }: VotingKeyLinkTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBodyBuilder;
    static createVotingKeyLinkTransactionBodyBuilder(linkedPublicKey: VotingKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto): VotingKeyLinkTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

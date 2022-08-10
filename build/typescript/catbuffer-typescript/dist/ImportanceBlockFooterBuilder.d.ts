import { AmountDto } from './AmountDto';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
export interface ImportanceBlockFooterBuilderParams {
    votingEligibleAccountsCount: number;
    harvestingEligibleAccountsCount: bigint;
    totalVotingBalance: AmountDto;
    previousImportanceBlockHash: Hash256Dto;
}
export declare class ImportanceBlockFooterBuilder implements Serializer {
    readonly votingEligibleAccountsCount: number;
    readonly harvestingEligibleAccountsCount: bigint;
    readonly totalVotingBalance: AmountDto;
    readonly previousImportanceBlockHash: Hash256Dto;
    constructor({ votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash, }: ImportanceBlockFooterBuilderParams);
    static loadFromBinary(payload: Uint8Array): ImportanceBlockFooterBuilder;
    static createImportanceBlockFooterBuilder(votingEligibleAccountsCount: number, harvestingEligibleAccountsCount: bigint, totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto): ImportanceBlockFooterBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { AddressDto } from './AddressDto';
import { AmountDto } from './AmountDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder, BlockHeaderBuilderParams } from './BlockHeaderBuilder';
import { DifficultyDto } from './DifficultyDto';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { ImportanceBlockFooterBuilder } from './ImportanceBlockFooterBuilder';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';
export interface ImportanceBlockHeaderBuilderParams extends BlockHeaderBuilderParams {
    votingEligibleAccountsCount: number;
    harvestingEligibleAccountsCount: bigint;
    totalVotingBalance: AmountDto;
    previousImportanceBlockHash: Hash256Dto;
}
export declare class ImportanceBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.IMPORTANCE_BLOCK_HEADER;
    readonly importanceBlockFooter: ImportanceBlockFooterBuilder;
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash, }: ImportanceBlockHeaderBuilderParams);
    static loadFromBinary(payload: Uint8Array): ImportanceBlockHeaderBuilder;
    static createImportanceBlockHeaderBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto, votingEligibleAccountsCount: number, harvestingEligibleAccountsCount: bigint, totalVotingBalance: AmountDto, previousImportanceBlockHash: Hash256Dto): ImportanceBlockHeaderBuilder;
    get votingEligibleAccountsCount(): number;
    get harvestingEligibleAccountsCount(): bigint;
    get totalVotingBalance(): AmountDto;
    get previousImportanceBlockHash(): Hash256Dto;
    get size(): number;
    serialize(): Uint8Array;
}

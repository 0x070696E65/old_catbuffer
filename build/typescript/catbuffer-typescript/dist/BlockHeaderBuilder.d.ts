import { AddressDto } from './AddressDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { DifficultyDto } from './DifficultyDto';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';
export interface BlockHeaderBuilderParams {
    signature: SignatureDto;
    signerPublicKey: KeyDto;
    version: number;
    network: NetworkTypeDto;
    type: EntityTypeDto;
    height: HeightDto;
    timestamp: TimestampDto;
    difficulty: DifficultyDto;
    generationHashProof: VrfProofBuilder;
    previousBlockHash: Hash256Dto;
    transactionsHash: Hash256Dto;
    receiptsHash: Hash256Dto;
    stateHash: Hash256Dto;
    beneficiaryAddress: AddressDto;
    feeMultiplier: BlockFeeMultiplierDto;
}
export declare class BlockHeaderBuilder implements Serializer {
    readonly signature: SignatureDto;
    readonly signerPublicKey: KeyDto;
    readonly version: number;
    readonly network: NetworkTypeDto;
    readonly type: EntityTypeDto;
    readonly height: HeightDto;
    readonly timestamp: TimestampDto;
    readonly difficulty: DifficultyDto;
    readonly generationHashProof: VrfProofBuilder;
    readonly previousBlockHash: Hash256Dto;
    readonly transactionsHash: Hash256Dto;
    readonly receiptsHash: Hash256Dto;
    readonly stateHash: Hash256Dto;
    readonly beneficiaryAddress: AddressDto;
    readonly feeMultiplier: BlockFeeMultiplierDto;
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, }: BlockHeaderBuilderParams);
    static loadFromBinary(payload: Uint8Array): BlockHeaderBuilder;
    static createBlockHeaderBuilder(signature: SignatureDto, signerPublicKey: KeyDto, version: number, network: NetworkTypeDto, type: EntityTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto): BlockHeaderBuilder;
    get size(): number;
    serialize(): Uint8Array;
}
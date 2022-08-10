import { AddressDto } from './AddressDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder, BlockHeaderBuilderParams } from './BlockHeaderBuilder';
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
export declare type NormalBlockHeaderBuilderParams = BlockHeaderBuilderParams;
export declare class NormalBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NORMAL_BLOCK_HEADER;
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, }: NormalBlockHeaderBuilderParams);
    static loadFromBinary(payload: Uint8Array): NormalBlockHeaderBuilder;
    static createNormalBlockHeaderBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, height: HeightDto, timestamp: TimestampDto, difficulty: DifficultyDto, generationHashProof: VrfProofBuilder, previousBlockHash: Hash256Dto, transactionsHash: Hash256Dto, receiptsHash: Hash256Dto, stateHash: Hash256Dto, beneficiaryAddress: AddressDto, feeMultiplier: BlockFeeMultiplierDto): NormalBlockHeaderBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

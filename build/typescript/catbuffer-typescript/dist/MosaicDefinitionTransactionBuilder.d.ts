import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicDefinitionTransactionBodyBuilder } from './MosaicDefinitionTransactionBodyBuilder';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface MosaicDefinitionTransactionBuilderParams extends TransactionBuilderParams {
    id: MosaicIdDto;
    duration: BlockDurationDto;
    nonce: MosaicNonceDto;
    flags: MosaicFlagsDto[];
    divisibility: number;
}
export declare class MosaicDefinitionTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION;
    readonly mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility, }: MosaicDefinitionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicDefinitionTransactionBuilder;
    static createMosaicDefinitionTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number): MosaicDefinitionTransactionBuilder;
    get id(): MosaicIdDto;
    get duration(): BlockDurationDto;
    get nonce(): MosaicNonceDto;
    get flags(): MosaicFlagsDto[];
    get divisibility(): number;
    get size(): number;
    get body(): MosaicDefinitionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { AggregateTransactionBodyBuilder } from './AggregateTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface AggregateCompleteTransactionBuilderParams extends TransactionBuilderParams {
    transactionsHash: Hash256Dto;
    transactions: EmbeddedTransactionBuilder[];
    cosignatures: CosignatureBuilder[];
}
export declare class AggregateCompleteTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.AGGREGATE_COMPLETE_TRANSACTION;
    readonly aggregateTransactionBody: AggregateTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures, }: AggregateCompleteTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AggregateCompleteTransactionBuilder;
    static createAggregateCompleteTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]): AggregateCompleteTransactionBuilder;
    get transactionsHash(): Hash256Dto;
    get transactions(): EmbeddedTransactionBuilder[];
    get cosignatures(): CosignatureBuilder[];
    get size(): number;
    get body(): AggregateTransactionBodyBuilder;
    serialize(): Uint8Array;
}

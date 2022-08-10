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
export interface AggregateBondedTransactionBuilderParams extends TransactionBuilderParams {
    transactionsHash: Hash256Dto;
    transactions: EmbeddedTransactionBuilder[];
    cosignatures: CosignatureBuilder[];
}
export declare class AggregateBondedTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.AGGREGATE_BONDED_TRANSACTION;
    readonly aggregateTransactionBody: AggregateTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures, }: AggregateBondedTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AggregateBondedTransactionBuilder;
    static createAggregateBondedTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]): AggregateBondedTransactionBuilder;
    get transactionsHash(): Hash256Dto;
    get transactions(): EmbeddedTransactionBuilder[];
    get cosignatures(): CosignatureBuilder[];
    get size(): number;
    get body(): AggregateTransactionBodyBuilder;
    serialize(): Uint8Array;
}

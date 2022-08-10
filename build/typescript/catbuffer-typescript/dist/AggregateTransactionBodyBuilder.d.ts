import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';
export interface AggregateTransactionBodyBuilderParams {
    transactionsHash: Hash256Dto;
    transactions: EmbeddedTransactionBuilder[];
    cosignatures: CosignatureBuilder[];
}
export declare class AggregateTransactionBodyBuilder implements Serializer {
    readonly transactionsHash: Hash256Dto;
    readonly transactions: EmbeddedTransactionBuilder[];
    readonly cosignatures: CosignatureBuilder[];
    constructor({ transactionsHash, transactions, cosignatures }: AggregateTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): AggregateTransactionBodyBuilder;
    static createAggregateTransactionBodyBuilder(transactionsHash: Hash256Dto, transactions: EmbeddedTransactionBuilder[], cosignatures: CosignatureBuilder[]): AggregateTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

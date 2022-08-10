import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
export interface TransactionBuilderParams {
    signature: SignatureDto;
    signerPublicKey: KeyDto;
    version: number;
    network: NetworkTypeDto;
    type: EntityTypeDto;
    fee: AmountDto;
    deadline: TimestampDto;
}
export declare class TransactionBuilder implements Serializer {
    readonly signature: SignatureDto;
    readonly signerPublicKey: KeyDto;
    readonly version: number;
    readonly network: NetworkTypeDto;
    readonly type: EntityTypeDto;
    readonly fee: AmountDto;
    readonly deadline: TimestampDto;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline }: TransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): TransactionBuilder;
    static createTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, version: number, network: NetworkTypeDto, type: EntityTypeDto, fee: AmountDto, deadline: TimestampDto): TransactionBuilder;
    get size(): number;
    get body(): undefined | Serializer;
    serialize(): Uint8Array;
}

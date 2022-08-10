import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedTransactionBuilderParams {
    signerPublicKey: KeyDto;
    version: number;
    network: NetworkTypeDto;
    type: EntityTypeDto;
}
export declare class EmbeddedTransactionBuilder implements Serializer {
    readonly signerPublicKey: KeyDto;
    readonly version: number;
    readonly network: NetworkTypeDto;
    readonly type: EntityTypeDto;
    constructor({ signerPublicKey, version, network, type }: EmbeddedTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedTransactionBuilder;
    static createEmbeddedTransactionBuilder(signerPublicKey: KeyDto, version: number, network: NetworkTypeDto, type: EntityTypeDto): EmbeddedTransactionBuilder;
    get size(): number;
    get body(): undefined | Serializer;
    serialize(): Uint8Array;
}

import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicDefinitionTransactionBodyBuilder } from './MosaicDefinitionTransactionBodyBuilder';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedMosaicDefinitionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    id: MosaicIdDto;
    duration: BlockDurationDto;
    nonce: MosaicNonceDto;
    flags: MosaicFlagsDto[];
    divisibility: number;
}
export declare class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION;
    readonly mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility, }: EmbeddedMosaicDefinitionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicDefinitionTransactionBuilder;
    static createEmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number): EmbeddedMosaicDefinitionTransactionBuilder;
    get id(): MosaicIdDto;
    get duration(): BlockDurationDto;
    get nonce(): MosaicNonceDto;
    get flags(): MosaicFlagsDto[];
    get divisibility(): number;
    get size(): number;
    get body(): MosaicDefinitionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

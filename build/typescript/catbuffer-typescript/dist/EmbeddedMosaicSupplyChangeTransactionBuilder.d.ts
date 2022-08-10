import { AmountDto } from './AmountDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface EmbeddedMosaicSupplyChangeTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    delta: AmountDto;
    action: MosaicSupplyChangeActionDto;
}
export declare class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_SUPPLY_CHANGE_TRANSACTION;
    readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, mosaicId, delta, action, }: EmbeddedMosaicSupplyChangeTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicSupplyChangeTransactionBuilder;
    static createEmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto): EmbeddedMosaicSupplyChangeTransactionBuilder;
    get mosaicId(): UnresolvedMosaicIdDto;
    get delta(): AmountDto;
    get action(): MosaicSupplyChangeActionDto;
    get size(): number;
    get body(): MosaicSupplyChangeTransactionBodyBuilder;
    serialize(): Uint8Array;
}

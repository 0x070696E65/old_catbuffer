import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicSupplyChangeTransactionBuilderParams extends TransactionBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    delta: AmountDto;
    action: MosaicSupplyChangeActionDto;
}
export declare class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_SUPPLY_CHANGE_TRANSACTION;
    readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action, }: MosaicSupplyChangeTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicSupplyChangeTransactionBuilder;
    static createMosaicSupplyChangeTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto): MosaicSupplyChangeTransactionBuilder;
    get mosaicId(): UnresolvedMosaicIdDto;
    get delta(): AmountDto;
    get action(): MosaicSupplyChangeActionDto;
    get size(): number;
    get body(): MosaicSupplyChangeTransactionBodyBuilder;
    serialize(): Uint8Array;
}

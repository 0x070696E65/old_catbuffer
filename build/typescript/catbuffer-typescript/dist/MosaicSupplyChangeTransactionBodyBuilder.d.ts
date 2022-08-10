import { AmountDto } from './AmountDto';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicSupplyChangeTransactionBodyBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    delta: AmountDto;
    action: MosaicSupplyChangeActionDto;
}
export declare class MosaicSupplyChangeTransactionBodyBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly delta: AmountDto;
    readonly action: MosaicSupplyChangeActionDto;
    constructor({ mosaicId, delta, action }: MosaicSupplyChangeTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicSupplyChangeTransactionBodyBuilder;
    static createMosaicSupplyChangeTransactionBodyBuilder(mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto): MosaicSupplyChangeTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

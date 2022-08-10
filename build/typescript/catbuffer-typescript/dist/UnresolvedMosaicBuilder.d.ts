import { AmountDto } from './AmountDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface UnresolvedMosaicBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    amount: AmountDto;
}
export declare class UnresolvedMosaicBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly amount: AmountDto;
    constructor({ mosaicId, amount }: UnresolvedMosaicBuilderParams);
    static loadFromBinary(payload: Uint8Array): UnresolvedMosaicBuilder;
    static createUnresolvedMosaicBuilder(mosaicId: UnresolvedMosaicIdDto, amount: AmountDto): UnresolvedMosaicBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

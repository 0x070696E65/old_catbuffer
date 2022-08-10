import { AmountDto } from './AmountDto';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export interface MosaicBuilderParams {
    mosaicId: MosaicIdDto;
    amount: AmountDto;
}
export declare class MosaicBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly amount: AmountDto;
    constructor({ mosaicId, amount }: MosaicBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicBuilder;
    static createMosaicBuilder(mosaicId: MosaicIdDto, amount: AmountDto): MosaicBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

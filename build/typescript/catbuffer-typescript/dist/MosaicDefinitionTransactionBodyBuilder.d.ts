import { BlockDurationDto } from './BlockDurationDto';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { Serializer } from './Serializer';
export interface MosaicDefinitionTransactionBodyBuilderParams {
    id: MosaicIdDto;
    duration: BlockDurationDto;
    nonce: MosaicNonceDto;
    flags: MosaicFlagsDto[];
    divisibility: number;
}
export declare class MosaicDefinitionTransactionBodyBuilder implements Serializer {
    readonly id: MosaicIdDto;
    readonly duration: BlockDurationDto;
    readonly nonce: MosaicNonceDto;
    readonly flags: MosaicFlagsDto[];
    readonly divisibility: number;
    constructor({ id, duration, nonce, flags, divisibility }: MosaicDefinitionTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicDefinitionTransactionBodyBuilder;
    static createMosaicDefinitionTransactionBodyBuilder(id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number): MosaicDefinitionTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

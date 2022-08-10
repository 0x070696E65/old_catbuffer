import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicAddressRestrictionTransactionBodyBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    targetAddress: UnresolvedAddressDto;
}
export declare class MosaicAddressRestrictionTransactionBodyBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly restrictionKey: bigint;
    readonly previousRestrictionValue: bigint;
    readonly newRestrictionValue: bigint;
    readonly targetAddress: UnresolvedAddressDto;
    constructor({ mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }: MosaicAddressRestrictionTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBodyBuilder;
    static createMosaicAddressRestrictionTransactionBodyBuilder(mosaicId: UnresolvedMosaicIdDto, restrictionKey: bigint, previousRestrictionValue: bigint, newRestrictionValue: bigint, targetAddress: UnresolvedAddressDto): MosaicAddressRestrictionTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

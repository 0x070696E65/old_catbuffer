import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export interface AccountRestrictionMosaicValueBuilderParams {
    restrictionValues: MosaicIdDto[];
}
export declare class AccountRestrictionMosaicValueBuilder implements Serializer {
    readonly restrictionValues: MosaicIdDto[];
    constructor({ restrictionValues }: AccountRestrictionMosaicValueBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionMosaicValueBuilder;
    static createAccountRestrictionMosaicValueBuilder(restrictionValues: MosaicIdDto[]): AccountRestrictionMosaicValueBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

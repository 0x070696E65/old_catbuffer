import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicAddressRestrictionTransactionBodyBuilder } from './MosaicAddressRestrictionTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicAddressRestrictionTransactionBuilderParams extends TransactionBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    targetAddress: UnresolvedAddressDto;
}
export declare class MosaicAddressRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_ADDRESS_RESTRICTION_TRANSACTION;
    readonly mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }: MosaicAddressRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBuilder;
    static createMosaicAddressRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, restrictionKey: bigint, previousRestrictionValue: bigint, newRestrictionValue: bigint, targetAddress: UnresolvedAddressDto): MosaicAddressRestrictionTransactionBuilder;
    get mosaicId(): UnresolvedMosaicIdDto;
    get restrictionKey(): bigint;
    get previousRestrictionValue(): bigint;
    get newRestrictionValue(): bigint;
    get targetAddress(): UnresolvedAddressDto;
    get size(): number;
    get body(): MosaicAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

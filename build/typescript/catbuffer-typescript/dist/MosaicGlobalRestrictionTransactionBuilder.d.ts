import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicGlobalRestrictionTransactionBodyBuilder } from './MosaicGlobalRestrictionTransactionBodyBuilder';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export interface MosaicGlobalRestrictionTransactionBuilderParams extends TransactionBuilderParams {
    mosaicId: UnresolvedMosaicIdDto;
    referenceMosaicId: UnresolvedMosaicIdDto;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    previousRestrictionType: MosaicRestrictionTypeDto;
    newRestrictionType: MosaicRestrictionTypeDto;
}
export declare class MosaicGlobalRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_GLOBAL_RESTRICTION_TRANSACTION;
    readonly mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }: MosaicGlobalRestrictionTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionTransactionBuilder;
    static createMosaicGlobalRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: bigint, previousRestrictionValue: bigint, newRestrictionValue: bigint, previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto): MosaicGlobalRestrictionTransactionBuilder;
    get mosaicId(): UnresolvedMosaicIdDto;
    get referenceMosaicId(): UnresolvedMosaicIdDto;
    get restrictionKey(): bigint;
    get previousRestrictionValue(): bigint;
    get newRestrictionValue(): bigint;
    get previousRestrictionType(): MosaicRestrictionTypeDto;
    get newRestrictionType(): MosaicRestrictionTypeDto;
    get size(): number;
    get body(): MosaicGlobalRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}

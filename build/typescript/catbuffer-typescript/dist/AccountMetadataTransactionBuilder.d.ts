import { AccountMetadataTransactionBodyBuilder } from './AccountMetadataTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface AccountMetadataTransactionBuilderParams extends TransactionBuilderParams {
    targetAddress: UnresolvedAddressDto;
    scopedMetadataKey: bigint;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class AccountMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_METADATA_TRANSACTION;
    readonly accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value, }: AccountMetadataTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): AccountMetadataTransactionBuilder;
    static createAccountMetadataTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: bigint, valueSizeDelta: number, value: Uint8Array): AccountMetadataTransactionBuilder;
    get targetAddress(): UnresolvedAddressDto;
    get scopedMetadataKey(): bigint;
    get valueSizeDelta(): number;
    get value(): Uint8Array;
    get size(): number;
    get body(): AccountMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}

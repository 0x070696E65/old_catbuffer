import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { TransferTransactionBodyBuilder } from './TransferTransactionBodyBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface TransferTransactionBuilderParams extends TransactionBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    mosaics: UnresolvedMosaicBuilder[];
    message: Uint8Array;
}
export declare class TransferTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.TRANSFER_TRANSACTION;
    readonly transferTransactionBody: TransferTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message, }: TransferTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): TransferTransactionBuilder;
    static createTransferTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array): TransferTransactionBuilder;
    get recipientAddress(): UnresolvedAddressDto;
    get mosaics(): UnresolvedMosaicBuilder[];
    get message(): Uint8Array;
    get size(): number;
    get body(): TransferTransactionBodyBuilder;
    serialize(): Uint8Array;
}

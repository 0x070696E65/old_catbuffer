import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export interface TransferTransactionBodyBuilderParams {
    recipientAddress: UnresolvedAddressDto;
    mosaics: UnresolvedMosaicBuilder[];
    message: Uint8Array;
}
export declare class TransferTransactionBodyBuilder implements Serializer {
    readonly recipientAddress: UnresolvedAddressDto;
    readonly mosaics: UnresolvedMosaicBuilder[];
    readonly message: Uint8Array;
    constructor({ recipientAddress, mosaics, message }: TransferTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): TransferTransactionBodyBuilder;
    static createTransferTransactionBodyBuilder(recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array): TransferTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { AliasActionDto } from './AliasActionDto';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { MosaicAliasTransactionBodyBuilder } from './MosaicAliasTransactionBodyBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface MosaicAliasTransactionBuilderParams extends TransactionBuilderParams {
    namespaceId: NamespaceIdDto;
    mosaicId: MosaicIdDto;
    aliasAction: AliasActionDto;
}
export declare class MosaicAliasTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_ALIAS_TRANSACTION;
    readonly mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction, }: MosaicAliasTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicAliasTransactionBuilder;
    static createMosaicAliasTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto): MosaicAliasTransactionBuilder;
    get namespaceId(): NamespaceIdDto;
    get mosaicId(): MosaicIdDto;
    get aliasAction(): AliasActionDto;
    get size(): number;
    get body(): MosaicAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}

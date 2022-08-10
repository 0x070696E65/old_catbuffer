import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
export interface NamespaceRegistrationTransactionBuilderParams extends TransactionBuilderParams {
    duration?: BlockDurationDto;
    parentId?: NamespaceIdDto;
    id: NamespaceIdDto;
    registrationType: NamespaceRegistrationTypeDto;
    name: Uint8Array;
}
export declare class NamespaceRegistrationTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NAMESPACE_REGISTRATION_TRANSACTION;
    readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, duration, parentId, id, registrationType, name, }: NamespaceRegistrationTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBuilder;
    static createNamespaceRegistrationTransactionBuilderRoot(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, duration: BlockDurationDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBuilder;
    static createNamespaceRegistrationTransactionBuilderChild(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, parentId: NamespaceIdDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBuilder;
    get duration(): BlockDurationDto | undefined;
    get parentId(): NamespaceIdDto | undefined;
    get id(): NamespaceIdDto;
    get registrationType(): NamespaceRegistrationTypeDto;
    get name(): Uint8Array;
    get size(): number;
    get body(): NamespaceRegistrationTransactionBodyBuilder;
    serialize(): Uint8Array;
}

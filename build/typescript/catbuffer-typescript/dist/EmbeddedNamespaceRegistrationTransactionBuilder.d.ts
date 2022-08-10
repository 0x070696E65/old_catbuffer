import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
export interface EmbeddedNamespaceRegistrationTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    duration?: BlockDurationDto;
    parentId?: NamespaceIdDto;
    id: NamespaceIdDto;
    registrationType: NamespaceRegistrationTypeDto;
    name: Uint8Array;
}
export declare class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.NAMESPACE_REGISTRATION_TRANSACTION;
    readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, duration, parentId, id, registrationType, name, }: EmbeddedNamespaceRegistrationTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder;
    static createEmbeddedNamespaceRegistrationTransactionBuilderRoot(signerPublicKey: KeyDto, network: NetworkTypeDto, duration: BlockDurationDto, id: NamespaceIdDto, name: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder;
    static createEmbeddedNamespaceRegistrationTransactionBuilderChild(signerPublicKey: KeyDto, network: NetworkTypeDto, parentId: NamespaceIdDto, id: NamespaceIdDto, name: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder;
    get duration(): BlockDurationDto | undefined;
    get parentId(): NamespaceIdDto | undefined;
    get id(): NamespaceIdDto;
    get registrationType(): NamespaceRegistrationTypeDto;
    get name(): Uint8Array;
    get size(): number;
    get body(): NamespaceRegistrationTransactionBodyBuilder;
    serialize(): Uint8Array;
}

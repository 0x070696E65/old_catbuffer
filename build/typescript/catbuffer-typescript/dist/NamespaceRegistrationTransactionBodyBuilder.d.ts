import { BlockDurationDto } from './BlockDurationDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { Serializer } from './Serializer';
export interface NamespaceRegistrationTransactionBodyBuilderParams {
    duration?: BlockDurationDto;
    parentId?: NamespaceIdDto;
    id: NamespaceIdDto;
    registrationType: NamespaceRegistrationTypeDto;
    name: Uint8Array;
}
export declare class NamespaceRegistrationTransactionBodyBuilder implements Serializer {
    readonly duration?: BlockDurationDto;
    readonly parentId?: NamespaceIdDto;
    readonly id: NamespaceIdDto;
    readonly registrationType: NamespaceRegistrationTypeDto;
    readonly name: Uint8Array;
    constructor({ duration, parentId, id, registrationType, name }: NamespaceRegistrationTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBodyBuilder;
    static createNamespaceRegistrationTransactionBodyBuilderRoot(duration: BlockDurationDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBodyBuilder;
    static createNamespaceRegistrationTransactionBodyBuilderChild(parentId: NamespaceIdDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

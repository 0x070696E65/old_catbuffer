import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export interface MultisigAccountModificationTransactionBodyBuilderParams {
    minRemovalDelta: number;
    minApprovalDelta: number;
    addressAdditions: UnresolvedAddressDto[];
    addressDeletions: UnresolvedAddressDto[];
}
export declare class MultisigAccountModificationTransactionBodyBuilder implements Serializer {
    readonly minRemovalDelta: number;
    readonly minApprovalDelta: number;
    readonly addressAdditions: UnresolvedAddressDto[];
    readonly addressDeletions: UnresolvedAddressDto[];
    constructor({ minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }: MultisigAccountModificationTransactionBodyBuilderParams);
    static loadFromBinary(payload: Uint8Array): MultisigAccountModificationTransactionBodyBuilder;
    static createMultisigAccountModificationTransactionBodyBuilder(minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]): MultisigAccountModificationTransactionBodyBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

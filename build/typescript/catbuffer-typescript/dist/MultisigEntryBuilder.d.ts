import { AddressDto } from './AddressDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';
export interface MultisigEntryBuilderParams extends StateHeaderBuilderParams {
    minApproval: number;
    minRemoval: number;
    accountAddress: AddressDto;
    cosignatoryAddresses: AddressDto[];
    multisigAddresses: AddressDto[];
}
export declare class MultisigEntryBuilder extends StateHeaderBuilder implements Serializer {
    readonly minApproval: number;
    readonly minRemoval: number;
    readonly accountAddress: AddressDto;
    readonly cosignatoryAddresses: AddressDto[];
    readonly multisigAddresses: AddressDto[];
    constructor({ version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses, }: MultisigEntryBuilderParams);
    static loadFromBinary(payload: Uint8Array): MultisigEntryBuilder;
    static createMultisigEntryBuilder(version: number, minApproval: number, minRemoval: number, accountAddress: AddressDto, cosignatoryAddresses: AddressDto[], multisigAddresses: AddressDto[]): MultisigEntryBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

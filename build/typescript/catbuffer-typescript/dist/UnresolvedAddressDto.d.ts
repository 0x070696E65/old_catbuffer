import { Serializer } from './Serializer';
export declare class UnresolvedAddressDto implements Serializer {
    readonly unresolvedAddress: Uint8Array;
    constructor(unresolvedAddress: Uint8Array);
    static loadFromBinary(payload: Uint8Array): UnresolvedAddressDto;
    static createEmpty(): UnresolvedAddressDto;
    get size(): number;
    serialize(): Uint8Array;
}

import { HeightDto } from './HeightDto';
import { Serializer } from './Serializer';
export interface NamespaceLifetimeBuilderParams {
    lifetimeStart: HeightDto;
    lifetimeEnd: HeightDto;
}
export declare class NamespaceLifetimeBuilder implements Serializer {
    readonly lifetimeStart: HeightDto;
    readonly lifetimeEnd: HeightDto;
    constructor({ lifetimeStart, lifetimeEnd }: NamespaceLifetimeBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceLifetimeBuilder;
    static createNamespaceLifetimeBuilder(lifetimeStart: HeightDto, lifetimeEnd: HeightDto): NamespaceLifetimeBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

import { Serializer } from './Serializer';
export interface StateHeaderBuilderParams {
    version: number;
}
export declare class StateHeaderBuilder implements Serializer {
    readonly version: number;
    constructor({ version }: StateHeaderBuilderParams);
    static loadFromBinary(payload: Uint8Array): StateHeaderBuilder;
    static createStateHeaderBuilder(version: number): StateHeaderBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

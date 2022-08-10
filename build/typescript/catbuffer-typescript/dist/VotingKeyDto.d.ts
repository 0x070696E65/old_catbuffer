import { Serializer } from './Serializer';
export declare class VotingKeyDto implements Serializer {
    readonly votingKey: Uint8Array;
    constructor(votingKey: Uint8Array);
    static loadFromBinary(payload: Uint8Array): VotingKeyDto;
    static createEmpty(): VotingKeyDto;
    get size(): number;
    serialize(): Uint8Array;
}

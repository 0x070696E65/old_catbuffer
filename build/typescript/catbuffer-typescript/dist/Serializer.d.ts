export interface Serializer {
    serialize(): Uint8Array;
    readonly size: number;
}

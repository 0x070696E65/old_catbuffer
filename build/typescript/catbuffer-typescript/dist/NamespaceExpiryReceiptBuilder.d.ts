import { NamespaceIdDto } from './NamespaceIdDto';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export interface NamespaceExpiryReceiptBuilderParams extends ReceiptBuilderParams {
    artifactId: NamespaceIdDto;
}
export declare class NamespaceExpiryReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly artifactId: NamespaceIdDto;
    constructor({ version, type, artifactId }: NamespaceExpiryReceiptBuilderParams);
    static loadFromBinary(payload: Uint8Array): NamespaceExpiryReceiptBuilder;
    static createNamespaceExpiryReceiptBuilder(version: number, type: ReceiptTypeDto, artifactId: NamespaceIdDto): NamespaceExpiryReceiptBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

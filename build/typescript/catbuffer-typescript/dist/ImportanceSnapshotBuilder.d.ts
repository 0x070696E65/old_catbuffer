import { ImportanceDto } from './ImportanceDto';
import { ImportanceHeightDto } from './ImportanceHeightDto';
import { Serializer } from './Serializer';
export interface ImportanceSnapshotBuilderParams {
    importance: ImportanceDto;
    height: ImportanceHeightDto;
}
export declare class ImportanceSnapshotBuilder implements Serializer {
    readonly importance: ImportanceDto;
    readonly height: ImportanceHeightDto;
    constructor({ importance, height }: ImportanceSnapshotBuilderParams);
    static loadFromBinary(payload: Uint8Array): ImportanceSnapshotBuilder;
    static createImportanceSnapshotBuilder(importance: ImportanceDto, height: ImportanceHeightDto): ImportanceSnapshotBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

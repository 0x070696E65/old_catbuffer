"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceSnapshotBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceDto_1 = require("./ImportanceDto");
const ImportanceHeightDto_1 = require("./ImportanceHeightDto");
class ImportanceSnapshotBuilder {
    constructor({ importance, height }) {
        GeneratorUtils_1.GeneratorUtils.notNull(importance, 'importance is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(height, 'height is null or undefined');
        this.importance = importance;
        this.height = height;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const importance = ImportanceDto_1.ImportanceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importance.size);
        const height = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        return new ImportanceSnapshotBuilder({ importance: importance, height: height });
    }
    static createImportanceSnapshotBuilder(importance, height) {
        return new ImportanceSnapshotBuilder({ importance: importance, height: height });
    }
    get size() {
        let size = 0;
        size += this.importance.size;
        size += this.height.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const importanceBytes = this.importance.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    }
}
exports.ImportanceSnapshotBuilder = ImportanceSnapshotBuilder;
//# sourceMappingURL=ImportanceSnapshotBuilder.js.map
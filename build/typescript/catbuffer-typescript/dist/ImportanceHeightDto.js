"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceHeightDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ImportanceHeightDto {
    constructor(importanceHeight) {
        this.importanceHeight = importanceHeight;
    }
    static loadFromBinary(payload) {
        const importanceHeight = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new ImportanceHeightDto(importanceHeight);
    }
    static createEmpty() {
        return new ImportanceHeightDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.importanceHeight);
    }
}
exports.ImportanceHeightDto = ImportanceHeightDto;
//# sourceMappingURL=ImportanceHeightDto.js.map
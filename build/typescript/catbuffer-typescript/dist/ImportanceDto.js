"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ImportanceDto {
    constructor(importance) {
        this.importance = importance;
    }
    static loadFromBinary(payload) {
        const importance = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new ImportanceDto(importance);
    }
    static createEmpty() {
        return new ImportanceDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.importance);
    }
}
exports.ImportanceDto = ImportanceDto;
//# sourceMappingURL=ImportanceDto.js.map
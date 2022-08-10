"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifficultyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class DifficultyDto {
    constructor(difficulty) {
        this.difficulty = difficulty;
    }
    static loadFromBinary(payload) {
        const difficulty = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new DifficultyDto(difficulty);
    }
    static createEmpty() {
        return new DifficultyDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.difficulty);
    }
}
exports.DifficultyDto = DifficultyDto;
//# sourceMappingURL=DifficultyDto.js.map
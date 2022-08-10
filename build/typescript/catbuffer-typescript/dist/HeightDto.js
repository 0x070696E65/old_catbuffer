"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class HeightDto {
    constructor(height) {
        this.height = height;
    }
    static loadFromBinary(payload) {
        const height = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new HeightDto(height);
    }
    static createEmpty() {
        return new HeightDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.height);
    }
}
exports.HeightDto = HeightDto;
//# sourceMappingURL=HeightDto.js.map
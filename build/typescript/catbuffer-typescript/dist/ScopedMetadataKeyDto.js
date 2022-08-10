"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedMetadataKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ScopedMetadataKeyDto {
    constructor(scopedMetadataKey) {
        this.scopedMetadataKey = scopedMetadataKey;
    }
    static loadFromBinary(payload) {
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new ScopedMetadataKeyDto(scopedMetadataKey);
    }
    static createEmpty() {
        return new ScopedMetadataKeyDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.scopedMetadataKey);
    }
}
exports.ScopedMetadataKeyDto = ScopedMetadataKeyDto;
//# sourceMappingURL=ScopedMetadataKeyDto.js.map
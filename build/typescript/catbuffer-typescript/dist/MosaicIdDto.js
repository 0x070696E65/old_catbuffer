"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicIdDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicIdDto {
    constructor(mosaicId) {
        this.mosaicId = mosaicId;
    }
    static loadFromBinary(payload) {
        const mosaicId = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new MosaicIdDto(mosaicId);
    }
    static createEmpty() {
        return new MosaicIdDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.mosaicId);
    }
}
exports.MosaicIdDto = MosaicIdDto;
//# sourceMappingURL=MosaicIdDto.js.map
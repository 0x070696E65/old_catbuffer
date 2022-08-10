"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicNonceDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicNonceDto {
    constructor(mosaicNonce) {
        this.mosaicNonce = mosaicNonce;
    }
    static loadFromBinary(payload) {
        const mosaicNonce = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new MosaicNonceDto(mosaicNonce);
    }
    static createEmpty() {
        return new MosaicNonceDto(0);
    }
    get size() {
        return 4;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.mosaicNonce);
    }
}
exports.MosaicNonceDto = MosaicNonceDto;
//# sourceMappingURL=MosaicNonceDto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedMosaicIdDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class UnresolvedMosaicIdDto {
    constructor(unresolvedMosaicId) {
        this.unresolvedMosaicId = unresolvedMosaicId;
    }
    static loadFromBinary(payload) {
        const unresolvedMosaicId = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new UnresolvedMosaicIdDto(unresolvedMosaicId);
    }
    static createEmpty() {
        return new UnresolvedMosaicIdDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.unresolvedMosaicId);
    }
}
exports.UnresolvedMosaicIdDto = UnresolvedMosaicIdDto;
//# sourceMappingURL=UnresolvedMosaicIdDto.js.map
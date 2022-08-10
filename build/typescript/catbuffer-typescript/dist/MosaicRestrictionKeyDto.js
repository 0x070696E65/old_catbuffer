"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicRestrictionKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicRestrictionKeyDto {
    constructor(mosaicRestrictionKey) {
        this.mosaicRestrictionKey = mosaicRestrictionKey;
    }
    static loadFromBinary(payload) {
        const mosaicRestrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new MosaicRestrictionKeyDto(mosaicRestrictionKey);
    }
    static createEmpty() {
        return new MosaicRestrictionKeyDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.mosaicRestrictionKey);
    }
}
exports.MosaicRestrictionKeyDto = MosaicRestrictionKeyDto;
//# sourceMappingURL=MosaicRestrictionKeyDto.js.map
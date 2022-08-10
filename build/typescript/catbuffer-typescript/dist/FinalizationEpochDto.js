"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizationEpochDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class FinalizationEpochDto {
    constructor(finalizationEpoch) {
        this.finalizationEpoch = finalizationEpoch;
    }
    static loadFromBinary(payload) {
        const finalizationEpoch = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new FinalizationEpochDto(finalizationEpoch);
    }
    static createEmpty() {
        return new FinalizationEpochDto(0);
    }
    get size() {
        return 4;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.finalizationEpoch);
    }
}
exports.FinalizationEpochDto = FinalizationEpochDto;
//# sourceMappingURL=FinalizationEpochDto.js.map
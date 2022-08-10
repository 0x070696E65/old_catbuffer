"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class TimestampDto {
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
    static loadFromBinary(payload) {
        const timestamp = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new TimestampDto(timestamp);
    }
    static createEmpty() {
        return new TimestampDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.timestamp);
    }
}
exports.TimestampDto = TimestampDto;
//# sourceMappingURL=TimestampDto.js.map
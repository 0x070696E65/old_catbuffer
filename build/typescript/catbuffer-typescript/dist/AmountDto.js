"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class AmountDto {
    constructor(amount) {
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const amount = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new AmountDto(amount);
    }
    static createEmpty() {
        return new AmountDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.amount);
    }
}
exports.AmountDto = AmountDto;
//# sourceMappingURL=AmountDto.js.map
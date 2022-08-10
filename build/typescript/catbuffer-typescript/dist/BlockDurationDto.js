"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDurationDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class BlockDurationDto {
    constructor(blockDuration) {
        this.blockDuration = blockDuration;
    }
    static loadFromBinary(payload) {
        const blockDuration = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockDurationDto(blockDuration);
    }
    static createEmpty() {
        return new BlockDurationDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.blockDuration);
    }
}
exports.BlockDurationDto = BlockDurationDto;
//# sourceMappingURL=BlockDurationDto.js.map
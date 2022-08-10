"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockFeeMultiplierDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class BlockFeeMultiplierDto {
    constructor(blockFeeMultiplier) {
        this.blockFeeMultiplier = blockFeeMultiplier;
    }
    static loadFromBinary(payload) {
        const blockFeeMultiplier = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new BlockFeeMultiplierDto(blockFeeMultiplier);
    }
    static createEmpty() {
        return new BlockFeeMultiplierDto(0);
    }
    get size() {
        return 4;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.blockFeeMultiplier);
    }
}
exports.BlockFeeMultiplierDto = BlockFeeMultiplierDto;
//# sourceMappingURL=BlockFeeMultiplierDto.js.map
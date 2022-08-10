"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicPropertiesBuilder = void 0;
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicFlagsDto_1 = require("./MosaicFlagsDto");
class MosaicPropertiesBuilder {
    constructor({ flags, divisibility, duration }) {
        GeneratorUtils_1.GeneratorUtils.notNull(flags, 'flags is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(divisibility, 'divisibility is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(duration, 'duration is null or undefined');
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const flags = GeneratorUtils_1.GeneratorUtils.toFlags(MosaicFlagsDto_1.MosaicFlagsDto, GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        return new MosaicPropertiesBuilder({ flags: flags, divisibility: divisibility, duration: duration });
    }
    static createMosaicPropertiesBuilder(flags, divisibility, duration) {
        return new MosaicPropertiesBuilder({ flags: flags, divisibility: divisibility, duration: duration });
    }
    get size() {
        let size = 0;
        size += 1;
        size += 1;
        size += this.duration.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const flagsBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(GeneratorUtils_1.GeneratorUtils.fromFlags(MosaicFlagsDto_1.MosaicFlagsDto, this.flags));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.divisibility);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        return newArray;
    }
}
exports.MosaicPropertiesBuilder = MosaicPropertiesBuilder;
//# sourceMappingURL=MosaicPropertiesBuilder.js.map
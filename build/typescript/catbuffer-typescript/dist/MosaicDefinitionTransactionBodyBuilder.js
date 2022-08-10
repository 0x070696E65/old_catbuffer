"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicDefinitionTransactionBodyBuilder = void 0;
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicFlagsDto_1 = require("./MosaicFlagsDto");
const MosaicIdDto_1 = require("./MosaicIdDto");
const MosaicNonceDto_1 = require("./MosaicNonceDto");
class MosaicDefinitionTransactionBodyBuilder {
    constructor({ id, duration, nonce, flags, divisibility }) {
        GeneratorUtils_1.GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(nonce, 'nonce is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(flags, 'flags is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(divisibility, 'divisibility is null or undefined');
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const id = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const nonce = MosaicNonceDto_1.MosaicNonceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.size);
        const flags = GeneratorUtils_1.GeneratorUtils.toFlags(MosaicFlagsDto_1.MosaicFlagsDto, GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicDefinitionTransactionBodyBuilder({
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
        });
    }
    static createMosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility) {
        return new MosaicDefinitionTransactionBodyBuilder({
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
        });
    }
    get size() {
        let size = 0;
        size += this.id.size;
        size += this.duration.size;
        size += this.nonce.size;
        size += 1;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const nonceBytes = this.nonce.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nonceBytes);
        const flagsBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(GeneratorUtils_1.GeneratorUtils.fromFlags(MosaicFlagsDto_1.MosaicFlagsDto, this.flags));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.divisibility);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    }
}
exports.MosaicDefinitionTransactionBodyBuilder = MosaicDefinitionTransactionBodyBuilder;
//# sourceMappingURL=MosaicDefinitionTransactionBodyBuilder.js.map
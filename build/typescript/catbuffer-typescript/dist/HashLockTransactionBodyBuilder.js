"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLockTransactionBodyBuilder = void 0;
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class HashLockTransactionBodyBuilder {
    constructor({ mosaic, duration, hash }) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = hash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new HashLockTransactionBodyBuilder({ mosaic: mosaic, duration: duration, hash: hash });
    }
    static createHashLockTransactionBodyBuilder(mosaic, duration, hash) {
        return new HashLockTransactionBodyBuilder({ mosaic: mosaic, duration: duration, hash: hash });
    }
    get size() {
        let size = 0;
        size += this.mosaic.size;
        size += this.duration.size;
        size += this.hash.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.HashLockTransactionBodyBuilder = HashLockTransactionBodyBuilder;
//# sourceMappingURL=HashLockTransactionBodyBuilder.js.map
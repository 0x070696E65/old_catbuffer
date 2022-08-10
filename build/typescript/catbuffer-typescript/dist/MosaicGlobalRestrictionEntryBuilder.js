"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicGlobalRestrictionEntryBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const GlobalKeyValueSetBuilder_1 = require("./GlobalKeyValueSetBuilder");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicGlobalRestrictionEntryBuilder {
    constructor({ mosaicId, keyPairs }) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(keyPairs, 'keyPairs is null or undefined');
        this.mosaicId = mosaicId;
        this.keyPairs = keyPairs;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const keyPairs = GlobalKeyValueSetBuilder_1.GlobalKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.size);
        return new MosaicGlobalRestrictionEntryBuilder({ mosaicId: mosaicId, keyPairs: keyPairs });
    }
    static createMosaicGlobalRestrictionEntryBuilder(mosaicId, keyPairs) {
        return new MosaicGlobalRestrictionEntryBuilder({ mosaicId: mosaicId, keyPairs: keyPairs });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += this.keyPairs.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
exports.MosaicGlobalRestrictionEntryBuilder = MosaicGlobalRestrictionEntryBuilder;
//# sourceMappingURL=MosaicGlobalRestrictionEntryBuilder.js.map
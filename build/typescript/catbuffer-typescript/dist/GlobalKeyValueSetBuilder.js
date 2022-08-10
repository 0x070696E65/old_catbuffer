"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKeyValueSetBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const GlobalKeyValueBuilder_1 = require("./GlobalKeyValueBuilder");
class GlobalKeyValueSetBuilder {
    constructor({ keys }) {
        GeneratorUtils_1.GeneratorUtils.notNull(keys, 'keys is null or undefined');
        this.keys = keys;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const keyValueCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const keys = GeneratorUtils_1.GeneratorUtils.loadFromBinary(GlobalKeyValueBuilder_1.GlobalKeyValueBuilder.loadFromBinary, Uint8Array.from(byteArray), keyValueCount);
        byteArray.splice(0, keys.reduce((sum, c) => sum + c.size, 0));
        return new GlobalKeyValueSetBuilder({ keys: keys });
    }
    static createGlobalKeyValueSetBuilder(keys) {
        return new GlobalKeyValueSetBuilder({ keys: keys });
    }
    get size() {
        let size = 0;
        size += 1;
        size += this.keys.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyValueCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.keys.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyValueCountBytes);
        const keysBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.keys, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keysBytes);
        return newArray;
    }
}
exports.GlobalKeyValueSetBuilder = GlobalKeyValueSetBuilder;
//# sourceMappingURL=GlobalKeyValueSetBuilder.js.map
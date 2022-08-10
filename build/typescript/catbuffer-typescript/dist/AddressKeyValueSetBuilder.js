"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressKeyValueSetBuilder = void 0;
const AddressKeyValueBuilder_1 = require("./AddressKeyValueBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AddressKeyValueSetBuilder {
    constructor({ keys }) {
        GeneratorUtils_1.GeneratorUtils.notNull(keys, 'keys is null or undefined');
        this.keys = keys;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const keyValueCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const keys = GeneratorUtils_1.GeneratorUtils.loadFromBinary(AddressKeyValueBuilder_1.AddressKeyValueBuilder.loadFromBinary, Uint8Array.from(byteArray), keyValueCount);
        byteArray.splice(0, keys.reduce((sum, c) => sum + c.size, 0));
        return new AddressKeyValueSetBuilder({ keys: keys });
    }
    static createAddressKeyValueSetBuilder(keys) {
        return new AddressKeyValueSetBuilder({ keys: keys });
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
exports.AddressKeyValueSetBuilder = AddressKeyValueSetBuilder;
//# sourceMappingURL=AddressKeyValueSetBuilder.js.map
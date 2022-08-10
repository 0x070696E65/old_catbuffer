"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressKeyValueBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicRestrictionKeyDto_1 = require("./MosaicRestrictionKeyDto");
class AddressKeyValueBuilder {
    constructor({ key, value }) {
        GeneratorUtils_1.GeneratorUtils.notNull(key, 'key is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(value, 'value is null or undefined');
        this.key = key;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKeyDto_1.MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const value = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new AddressKeyValueBuilder({ key: key, value: value });
    }
    static createAddressKeyValueBuilder(key, value) {
        return new AddressKeyValueBuilder({ key: key, value: value });
    }
    get size() {
        let size = 0;
        size += this.key.size;
        size += 8;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const valueBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.value);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.AddressKeyValueBuilder = AddressKeyValueBuilder;
//# sourceMappingURL=AddressKeyValueBuilder.js.map
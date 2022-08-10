"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ReceiptBuilder {
    constructor({ version, type }) {
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(type, 'type is null or undefined');
        this.version = version;
        this.type = type;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        return new ReceiptBuilder({ version: version, type: type });
    }
    static createReceiptBuilder(version, type) {
        return new ReceiptBuilder({ version: version, type: type });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 2;
        size += 2;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.version);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    }
}
exports.ReceiptBuilder = ReceiptBuilder;
//# sourceMappingURL=ReceiptBuilder.js.map
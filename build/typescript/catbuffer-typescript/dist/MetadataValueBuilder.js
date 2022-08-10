"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataValueBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class MetadataValueBuilder {
    constructor({ data }) {
        GeneratorUtils_1.GeneratorUtils.notNull(data, 'data is null or undefined');
        this.data = data;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const data = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), size);
        byteArray.splice(0, size);
        return new MetadataValueBuilder({ data: data });
    }
    static createMetadataValueBuilder(data) {
        return new MetadataValueBuilder({ data: data });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.data.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.data.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const dataBytes = this.data;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, dataBytes);
        return newArray;
    }
}
exports.MetadataValueBuilder = MetadataValueBuilder;
//# sourceMappingURL=MetadataValueBuilder.js.map
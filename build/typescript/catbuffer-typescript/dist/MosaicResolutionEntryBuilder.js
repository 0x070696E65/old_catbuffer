"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicResolutionEntryBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const ReceiptSourceBuilder_1 = require("./ReceiptSourceBuilder");
class MosaicResolutionEntryBuilder {
    constructor({ source, resolved }) {
        GeneratorUtils_1.GeneratorUtils.notNull(source, 'source is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(resolved, 'resolved is null or undefined');
        this.source = source;
        this.resolved = resolved;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const source = ReceiptSourceBuilder_1.ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.size);
        const resolved = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.size);
        return new MosaicResolutionEntryBuilder({ source: source, resolved: resolved });
    }
    static createMosaicResolutionEntryBuilder(source, resolved) {
        return new MosaicResolutionEntryBuilder({ source: source, resolved: resolved });
    }
    get size() {
        let size = 0;
        size += this.source.size;
        size += this.resolved.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sourceBytes = this.source.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        const resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    }
}
exports.MosaicResolutionEntryBuilder = MosaicResolutionEntryBuilder;
//# sourceMappingURL=MosaicResolutionEntryBuilder.js.map
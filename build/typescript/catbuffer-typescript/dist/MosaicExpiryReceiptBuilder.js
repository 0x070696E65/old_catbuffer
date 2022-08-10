"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicExpiryReceiptBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class MosaicExpiryReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor({ version, type, artifactId }) {
        super({ version, type });
        GeneratorUtils_1.GeneratorUtils.notNull(artifactId, 'artifactId is null or undefined');
        this.artifactId = artifactId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const artifactId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.size);
        return new MosaicExpiryReceiptBuilder({ version: superObject.version, type: superObject.type, artifactId: artifactId });
    }
    static createMosaicExpiryReceiptBuilder(version, type, artifactId) {
        return new MosaicExpiryReceiptBuilder({ version: version, type: type, artifactId: artifactId });
    }
    get size() {
        let size = super.size;
        size += this.artifactId.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}
exports.MosaicExpiryReceiptBuilder = MosaicExpiryReceiptBuilder;
//# sourceMappingURL=MosaicExpiryReceiptBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetachedCosignatureBuilder = void 0;
const CosignatureBuilder_1 = require("./CosignatureBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
class DetachedCosignatureBuilder extends CosignatureBuilder_1.CosignatureBuilder {
    constructor({ version, signerPublicKey, signature, parentHash }) {
        super({ version, signerPublicKey, signature });
        GeneratorUtils_1.GeneratorUtils.notNull(parentHash, 'parentHash is null or undefined');
        this.parentHash = parentHash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = CosignatureBuilder_1.CosignatureBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const parentHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, parentHash.size);
        return new DetachedCosignatureBuilder({
            version: superObject.version,
            signerPublicKey: superObject.signerPublicKey,
            signature: superObject.signature,
            parentHash: parentHash,
        });
    }
    static createDetachedCosignatureBuilder(version, signerPublicKey, signature, parentHash) {
        return new DetachedCosignatureBuilder({
            version: version,
            signerPublicKey: signerPublicKey,
            signature: signature,
            parentHash: parentHash,
        });
    }
    get size() {
        let size = super.size;
        size += this.parentHash.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const parentHashBytes = this.parentHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, parentHashBytes);
        return newArray;
    }
}
exports.DetachedCosignatureBuilder = DetachedCosignatureBuilder;
//# sourceMappingURL=DetachedCosignatureBuilder.js.map
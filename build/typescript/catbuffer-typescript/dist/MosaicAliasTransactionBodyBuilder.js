"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAliasTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
class MosaicAliasTransactionBodyBuilder {
    constructor({ namespaceId, mosaicId, aliasAction }) {
        GeneratorUtils_1.GeneratorUtils.notNull(namespaceId, 'namespaceId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(aliasAction, 'aliasAction is null or undefined');
        this.namespaceId = namespaceId;
        this.mosaicId = mosaicId;
        this.aliasAction = aliasAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.size);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const aliasAction = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicAliasTransactionBodyBuilder({ namespaceId: namespaceId, mosaicId: mosaicId, aliasAction: aliasAction });
    }
    static createMosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction) {
        return new MosaicAliasTransactionBodyBuilder({ namespaceId: namespaceId, mosaicId: mosaicId, aliasAction: aliasAction });
    }
    get size() {
        let size = 0;
        size += this.namespaceId.size;
        size += this.mosaicId.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const aliasActionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.aliasAction);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
exports.MosaicAliasTransactionBodyBuilder = MosaicAliasTransactionBodyBuilder;
//# sourceMappingURL=MosaicAliasTransactionBodyBuilder.js.map
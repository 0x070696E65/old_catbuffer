"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicSupplyChangeTransactionBodyBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicSupplyChangeTransactionBodyBuilder {
    constructor({ mosaicId, delta, action }) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(delta, 'delta is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(action, 'action is null or undefined');
        this.mosaicId = mosaicId;
        this.delta = delta;
        this.action = action;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const delta = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, delta.size);
        const action = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicSupplyChangeTransactionBodyBuilder({ mosaicId: mosaicId, delta: delta, action: action });
    }
    static createMosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action) {
        return new MosaicSupplyChangeTransactionBodyBuilder({ mosaicId: mosaicId, delta: delta, action: action });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += this.delta.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const deltaBytes = this.delta.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, deltaBytes);
        const actionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.action);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, actionBytes);
        return newArray;
    }
}
exports.MosaicSupplyChangeTransactionBodyBuilder = MosaicSupplyChangeTransactionBodyBuilder;
//# sourceMappingURL=MosaicSupplyChangeTransactionBodyBuilder.js.map
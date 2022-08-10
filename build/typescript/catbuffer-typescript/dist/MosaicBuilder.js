"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicBuilder {
    constructor({ mosaicId, amount }) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(amount, 'amount is null or undefined');
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const amount = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.size);
        return new MosaicBuilder({ mosaicId: mosaicId, amount: amount });
    }
    static createMosaicBuilder(mosaicId, amount) {
        return new MosaicBuilder({ mosaicId: mosaicId, amount: amount });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += this.amount.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}
exports.MosaicBuilder = MosaicBuilder;
//# sourceMappingURL=MosaicBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAddressRestrictionTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicAddressRestrictionTransactionBodyBuilder {
    constructor({ mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionKey, 'restrictionKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(previousRestrictionValue, 'previousRestrictionValue is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(newRestrictionValue, 'newRestrictionValue is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const restrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        return new MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
        });
    }
    static createMosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        return new MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
        });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += 8;
        size += 8;
        size += 8;
        size += this.targetAddress.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.restrictionKey);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.previousRestrictionValue);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.newRestrictionValue);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionTransactionBodyBuilder = MosaicAddressRestrictionTransactionBodyBuilder;
//# sourceMappingURL=MosaicAddressRestrictionTransactionBodyBuilder.js.map
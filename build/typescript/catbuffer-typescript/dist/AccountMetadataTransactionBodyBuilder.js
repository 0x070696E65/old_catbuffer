"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMetadataTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class AccountMetadataTransactionBodyBuilder {
    constructor({ targetAddress, scopedMetadataKey, valueSizeDelta, value }) {
        GeneratorUtils_1.GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(valueSizeDelta, 'valueSizeDelta is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(value, 'value is null or undefined');
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const targetAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new AccountMetadataTransactionBodyBuilder({
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }
    static createAccountMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        return new AccountMetadataTransactionBodyBuilder({
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }
    get size() {
        let size = 0;
        size += this.targetAddress.size;
        size += 8;
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.scopedMetadataKey);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.valueSizeDelta);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.value.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.AccountMetadataTransactionBodyBuilder = AccountMetadataTransactionBodyBuilder;
//# sourceMappingURL=AccountMetadataTransactionBodyBuilder.js.map
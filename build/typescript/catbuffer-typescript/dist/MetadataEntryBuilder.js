"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataEntryBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MetadataValueBuilder_1 = require("./MetadataValueBuilder");
const ScopedMetadataKeyDto_1 = require("./ScopedMetadataKeyDto");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class MetadataEntryBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor({ version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value, }) {
        super({ version });
        GeneratorUtils_1.GeneratorUtils.notNull(sourceAddress, 'sourceAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(targetId, 'targetId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(metadataType, 'metadataType is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(value, 'value is null or undefined');
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const sourceAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.size);
        const targetAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey = ScopedMetadataKeyDto_1.ScopedMetadataKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.size);
        const targetId = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const metadataType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const value = MetadataValueBuilder_1.MetadataValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, value.size);
        return new MetadataEntryBuilder({
            version: superObject.version,
            sourceAddress: sourceAddress,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetId: targetId,
            metadataType: metadataType,
            value: value,
        });
    }
    static createMetadataEntryBuilder(version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value) {
        return new MetadataEntryBuilder({
            version: version,
            sourceAddress: sourceAddress,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetId: targetId,
            metadataType: metadataType,
            value: value,
        });
    }
    get size() {
        let size = super.size;
        size += this.sourceAddress.size;
        size += this.targetAddress.size;
        size += this.scopedMetadataKey.size;
        size += 8;
        size += 1;
        size += this.value.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceAddressBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetIdBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.targetId);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetIdBytes);
        const metadataTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.metadataType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, metadataTypeBytes);
        const valueBytes = this.value.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.MetadataEntryBuilder = MetadataEntryBuilder;
//# sourceMappingURL=MetadataEntryBuilder.js.map
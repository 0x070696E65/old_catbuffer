"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceTransferReceiptBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicBuilder_1 = require("./MosaicBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class BalanceTransferReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor({ version, type, mosaic, senderAddress, recipientAddress }) {
        super({ version, type });
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(senderAddress, 'senderAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        this.mosaic = mosaic;
        this.senderAddress = senderAddress;
        this.recipientAddress = recipientAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const senderAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderAddress.size);
        const recipientAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        return new BalanceTransferReceiptBuilder({
            version: superObject.version,
            type: superObject.type,
            mosaic: mosaic,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
        });
    }
    static createBalanceTransferReceiptBuilder(version, type, mosaic, senderAddress, recipientAddress) {
        return new BalanceTransferReceiptBuilder({
            version: version,
            type: type,
            mosaic: mosaic,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
        });
    }
    get size() {
        let size = super.size;
        size += this.mosaic.size;
        size += this.senderAddress.size;
        size += this.recipientAddress.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const senderAddressBytes = this.senderAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderAddressBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    }
}
exports.BalanceTransferReceiptBuilder = BalanceTransferReceiptBuilder;
//# sourceMappingURL=BalanceTransferReceiptBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class TransferTransactionBodyBuilder {
    constructor({ recipientAddress, mosaics, message }) {
        GeneratorUtils_1.GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaics, 'mosaics is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(message, 'message is null or undefined');
        this.recipientAddress = recipientAddress;
        this.mosaics = mosaics;
        this.message = message;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const messageSize = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaicsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const mosaics = GeneratorUtils_1.GeneratorUtils.loadFromBinary(UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary, Uint8Array.from(byteArray), mosaicsCount);
        byteArray.splice(0, mosaics.reduce((sum, c) => sum + c.size, 0));
        const message = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), messageSize);
        byteArray.splice(0, messageSize);
        return new TransferTransactionBodyBuilder({ recipientAddress: recipientAddress, mosaics: mosaics, message: message });
    }
    static createTransferTransactionBodyBuilder(recipientAddress, mosaics, message) {
        return new TransferTransactionBodyBuilder({ recipientAddress: recipientAddress, mosaics: mosaics, message: message });
    }
    get size() {
        let size = 0;
        size += this.recipientAddress.size;
        size += 2;
        size += 1;
        size += 4;
        size += 1;
        size += this.mosaics.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        size += this.message.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        const messageSizeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.message.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, messageSizeBytes);
        const mosaicsCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.mosaics.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicsCountBytes);
        const transferTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBody_Reserved1Bytes);
        const transferTransactionBody_Reserved2Bytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBody_Reserved2Bytes);
        const mosaicsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.mosaics, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicsBytes);
        const messageBytes = this.message;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, messageBytes);
        return newArray;
    }
}
exports.TransferTransactionBodyBuilder = TransferTransactionBodyBuilder;
//# sourceMappingURL=TransferTransactionBodyBuilder.js.map
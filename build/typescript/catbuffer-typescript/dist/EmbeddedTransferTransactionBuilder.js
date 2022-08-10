"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransferTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
class EmbeddedTransferTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, recipientAddress, mosaics, message, }) {
        super({ signerPublicKey, version, network, type });
        this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder({ recipientAddress, mosaics, message });
        if (version !== EmbeddedTransferTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedTransferTransactionBuilder.VERSION);
        if (type !== EmbeddedTransferTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedTransferTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.size);
        return new EmbeddedTransferTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            recipientAddress: transferTransactionBody.recipientAddress,
            mosaics: transferTransactionBody.mosaics,
            message: transferTransactionBody.message,
        });
    }
    static createEmbeddedTransferTransactionBuilder(signerPublicKey, network, recipientAddress, mosaics, message) {
        const version = EmbeddedTransferTransactionBuilder.VERSION;
        const type = EmbeddedTransferTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedTransferTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            recipientAddress: recipientAddress,
            mosaics: mosaics,
            message: message,
        });
    }
    get recipientAddress() {
        return this.transferTransactionBody.recipientAddress;
    }
    get mosaics() {
        return this.transferTransactionBody.mosaics;
    }
    get message() {
        return this.transferTransactionBody.message;
    }
    get size() {
        let size = super.size;
        size += this.transferTransactionBody.size;
        return size;
    }
    get body() {
        return this.transferTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedTransferTransactionBuilder = EmbeddedTransferTransactionBuilder;
EmbeddedTransferTransactionBuilder.VERSION = 1;
EmbeddedTransferTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_TRANSFER_TRANSACTION;
//# sourceMappingURL=EmbeddedTransferTransactionBuilder.js.map
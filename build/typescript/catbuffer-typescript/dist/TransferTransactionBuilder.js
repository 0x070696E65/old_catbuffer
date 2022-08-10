"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
class TransferTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder({ recipientAddress, mosaics, message });
        if (version !== TransferTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + TransferTransactionBuilder.VERSION);
        if (type !== TransferTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + TransferTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.size);
        return new TransferTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            recipientAddress: transferTransactionBody.recipientAddress,
            mosaics: transferTransactionBody.mosaics,
            message: transferTransactionBody.message,
        });
    }
    static createTransferTransactionBuilder(signature, signerPublicKey, network, fee, deadline, recipientAddress, mosaics, message) {
        const version = TransferTransactionBuilder.VERSION;
        const type = TransferTransactionBuilder.ENTITY_TYPE;
        return new TransferTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.TransferTransactionBuilder = TransferTransactionBuilder;
TransferTransactionBuilder.VERSION = 1;
TransferTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.TRANSFER_TRANSACTION;
//# sourceMappingURL=TransferTransactionBuilder.js.map
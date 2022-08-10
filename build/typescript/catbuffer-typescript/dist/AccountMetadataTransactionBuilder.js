"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMetadataTransactionBuilder = void 0;
const AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            valueSizeDelta,
            value,
        });
        if (version !== AccountMetadataTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + AccountMetadataTransactionBuilder.VERSION);
        if (type !== AccountMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + AccountMetadataTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.size);
        return new AccountMetadataTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            targetAddress: accountMetadataTransactionBody.targetAddress,
            scopedMetadataKey: accountMetadataTransactionBody.scopedMetadataKey,
            valueSizeDelta: accountMetadataTransactionBody.valueSizeDelta,
            value: accountMetadataTransactionBody.value,
        });
    }
    static createAccountMetadataTransactionBuilder(signature, signerPublicKey, network, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        const version = AccountMetadataTransactionBuilder.VERSION;
        const type = AccountMetadataTransactionBuilder.ENTITY_TYPE;
        return new AccountMetadataTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }
    get targetAddress() {
        return this.accountMetadataTransactionBody.targetAddress;
    }
    get scopedMetadataKey() {
        return this.accountMetadataTransactionBody.scopedMetadataKey;
    }
    get valueSizeDelta() {
        return this.accountMetadataTransactionBody.valueSizeDelta;
    }
    get value() {
        return this.accountMetadataTransactionBody.value;
    }
    get size() {
        let size = super.size;
        size += this.accountMetadataTransactionBody.size;
        return size;
    }
    get body() {
        return this.accountMetadataTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountMetadataTransactionBuilder = AccountMetadataTransactionBuilder;
AccountMetadataTransactionBuilder.VERSION = 1;
AccountMetadataTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.ACCOUNT_METADATA_TRANSACTION;
//# sourceMappingURL=AccountMetadataTransactionBuilder.js.map
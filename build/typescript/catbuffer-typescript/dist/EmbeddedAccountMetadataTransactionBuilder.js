"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountMetadataTransactionBuilder = void 0;
const AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value, }) {
        super({ signerPublicKey, version, network, type });
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            valueSizeDelta,
            value,
        });
        if (version !== EmbeddedAccountMetadataTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedAccountMetadataTransactionBuilder.VERSION);
        if (type !== EmbeddedAccountMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedAccountMetadataTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.size);
        return new EmbeddedAccountMetadataTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            targetAddress: accountMetadataTransactionBody.targetAddress,
            scopedMetadataKey: accountMetadataTransactionBody.scopedMetadataKey,
            valueSizeDelta: accountMetadataTransactionBody.valueSizeDelta,
            value: accountMetadataTransactionBody.value,
        });
    }
    static createEmbeddedAccountMetadataTransactionBuilder(signerPublicKey, network, targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        const version = EmbeddedAccountMetadataTransactionBuilder.VERSION;
        const type = EmbeddedAccountMetadataTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountMetadataTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedAccountMetadataTransactionBuilder = EmbeddedAccountMetadataTransactionBuilder;
EmbeddedAccountMetadataTransactionBuilder.VERSION = 1;
EmbeddedAccountMetadataTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_ACCOUNT_METADATA_TRANSACTION;
//# sourceMappingURL=EmbeddedAccountMetadataTransactionBuilder.js.map
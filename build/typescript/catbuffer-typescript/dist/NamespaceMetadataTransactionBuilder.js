"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceMetadataTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NamespaceMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            targetNamespaceId,
            valueSizeDelta,
            value,
        });
        if (version !== NamespaceMetadataTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + NamespaceMetadataTransactionBuilder.VERSION);
        if (type !== NamespaceMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + NamespaceMetadataTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.size);
        return new NamespaceMetadataTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            targetAddress: namespaceMetadataTransactionBody.targetAddress,
            scopedMetadataKey: namespaceMetadataTransactionBody.scopedMetadataKey,
            targetNamespaceId: namespaceMetadataTransactionBody.targetNamespaceId,
            valueSizeDelta: namespaceMetadataTransactionBody.valueSizeDelta,
            value: namespaceMetadataTransactionBody.value,
        });
    }
    static createNamespaceMetadataTransactionBuilder(signature, signerPublicKey, network, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        const version = NamespaceMetadataTransactionBuilder.VERSION;
        const type = NamespaceMetadataTransactionBuilder.ENTITY_TYPE;
        return new NamespaceMetadataTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetNamespaceId: targetNamespaceId,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }
    get targetAddress() {
        return this.namespaceMetadataTransactionBody.targetAddress;
    }
    get scopedMetadataKey() {
        return this.namespaceMetadataTransactionBody.scopedMetadataKey;
    }
    get targetNamespaceId() {
        return this.namespaceMetadataTransactionBody.targetNamespaceId;
    }
    get valueSizeDelta() {
        return this.namespaceMetadataTransactionBody.valueSizeDelta;
    }
    get value() {
        return this.namespaceMetadataTransactionBody.value;
    }
    get size() {
        let size = super.size;
        size += this.namespaceMetadataTransactionBody.size;
        return size;
    }
    get body() {
        return this.namespaceMetadataTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.NamespaceMetadataTransactionBuilder = NamespaceMetadataTransactionBuilder;
NamespaceMetadataTransactionBuilder.VERSION = 1;
NamespaceMetadataTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.NAMESPACE_METADATA_TRANSACTION;
//# sourceMappingURL=NamespaceMetadataTransactionBuilder.js.map
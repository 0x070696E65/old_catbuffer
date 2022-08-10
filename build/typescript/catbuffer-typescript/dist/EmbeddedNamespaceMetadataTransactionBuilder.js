"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNamespaceMetadataTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
class EmbeddedNamespaceMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }) {
        super({ signerPublicKey, version, network, type });
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            targetNamespaceId,
            valueSizeDelta,
            value,
        });
        if (version !== EmbeddedNamespaceMetadataTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedNamespaceMetadataTransactionBuilder.VERSION);
        if (type !== EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.size);
        return new EmbeddedNamespaceMetadataTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            targetAddress: namespaceMetadataTransactionBody.targetAddress,
            scopedMetadataKey: namespaceMetadataTransactionBody.scopedMetadataKey,
            targetNamespaceId: namespaceMetadataTransactionBody.targetNamespaceId,
            valueSizeDelta: namespaceMetadataTransactionBody.valueSizeDelta,
            value: namespaceMetadataTransactionBody.value,
        });
    }
    static createEmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey, network, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        const version = EmbeddedNamespaceMetadataTransactionBuilder.VERSION;
        const type = EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedNamespaceMetadataTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedNamespaceMetadataTransactionBuilder = EmbeddedNamespaceMetadataTransactionBuilder;
EmbeddedNamespaceMetadataTransactionBuilder.VERSION = 1;
EmbeddedNamespaceMetadataTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_NAMESPACE_METADATA_TRANSACTION;
//# sourceMappingURL=EmbeddedNamespaceMetadataTransactionBuilder.js.map
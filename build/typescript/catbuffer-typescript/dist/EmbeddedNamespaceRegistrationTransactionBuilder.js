"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNamespaceRegistrationTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
const NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, duration, parentId, id, registrationType, name, }) {
        super({ signerPublicKey, version, network, type });
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder({
            duration,
            parentId,
            id,
            registrationType,
            name,
        });
        if (version !== EmbeddedNamespaceRegistrationTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedNamespaceRegistrationTransactionBuilder.VERSION);
        if (type !== EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.size);
        return new EmbeddedNamespaceRegistrationTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            duration: namespaceRegistrationTransactionBody.duration,
            parentId: namespaceRegistrationTransactionBody.parentId,
            id: namespaceRegistrationTransactionBody.id,
            registrationType: namespaceRegistrationTransactionBody.registrationType,
            name: namespaceRegistrationTransactionBody.name,
        });
    }
    static createEmbeddedNamespaceRegistrationTransactionBuilderRoot(signerPublicKey, network, duration, id, name) {
        const version = EmbeddedNamespaceRegistrationTransactionBuilder.VERSION;
        const type = EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT;
        return new EmbeddedNamespaceRegistrationTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            duration: duration,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }
    static createEmbeddedNamespaceRegistrationTransactionBuilderChild(signerPublicKey, network, parentId, id, name) {
        const version = EmbeddedNamespaceRegistrationTransactionBuilder.VERSION;
        const type = EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD;
        return new EmbeddedNamespaceRegistrationTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }
    get duration() {
        return this.namespaceRegistrationTransactionBody.duration;
    }
    get parentId() {
        return this.namespaceRegistrationTransactionBody.parentId;
    }
    get id() {
        return this.namespaceRegistrationTransactionBody.id;
    }
    get registrationType() {
        return this.namespaceRegistrationTransactionBody.registrationType;
    }
    get name() {
        return this.namespaceRegistrationTransactionBody.name;
    }
    get size() {
        let size = super.size;
        size += this.namespaceRegistrationTransactionBody.size;
        return size;
    }
    get body() {
        return this.namespaceRegistrationTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNamespaceRegistrationTransactionBuilder = EmbeddedNamespaceRegistrationTransactionBuilder;
EmbeddedNamespaceRegistrationTransactionBuilder.VERSION = 1;
EmbeddedNamespaceRegistrationTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_NAMESPACE_REGISTRATION_TRANSACTION;
//# sourceMappingURL=EmbeddedNamespaceRegistrationTransactionBuilder.js.map
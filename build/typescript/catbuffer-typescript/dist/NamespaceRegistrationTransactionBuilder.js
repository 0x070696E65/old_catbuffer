"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceRegistrationTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
const NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NamespaceRegistrationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, duration, parentId, id, registrationType, name, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder({
            duration,
            parentId,
            id,
            registrationType,
            name,
        });
        if (version !== NamespaceRegistrationTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                NamespaceRegistrationTransactionBuilder.VERSION);
        if (type !== NamespaceRegistrationTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + NamespaceRegistrationTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.size);
        return new NamespaceRegistrationTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            duration: namespaceRegistrationTransactionBody.duration,
            parentId: namespaceRegistrationTransactionBody.parentId,
            id: namespaceRegistrationTransactionBody.id,
            registrationType: namespaceRegistrationTransactionBody.registrationType,
            name: namespaceRegistrationTransactionBody.name,
        });
    }
    static createNamespaceRegistrationTransactionBuilderRoot(signature, signerPublicKey, network, fee, deadline, duration, id, name) {
        const version = NamespaceRegistrationTransactionBuilder.VERSION;
        const type = NamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            duration: duration,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }
    static createNamespaceRegistrationTransactionBuilderChild(signature, signerPublicKey, network, fee, deadline, parentId, id, name) {
        const version = NamespaceRegistrationTransactionBuilder.VERSION;
        const type = NamespaceRegistrationTransactionBuilder.ENTITY_TYPE;
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.NamespaceRegistrationTransactionBuilder = NamespaceRegistrationTransactionBuilder;
NamespaceRegistrationTransactionBuilder.VERSION = 1;
NamespaceRegistrationTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.NAMESPACE_REGISTRATION_TRANSACTION;
//# sourceMappingURL=NamespaceRegistrationTransactionBuilder.js.map
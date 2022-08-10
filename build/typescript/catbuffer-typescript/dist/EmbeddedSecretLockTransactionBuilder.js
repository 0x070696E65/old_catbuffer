"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedSecretLockTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
class EmbeddedSecretLockTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, recipientAddress, secret, mosaic, duration, hashAlgorithm, }) {
        super({ signerPublicKey, version, network, type });
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder({
            recipientAddress,
            secret,
            mosaic,
            duration,
            hashAlgorithm,
        });
        if (version !== EmbeddedSecretLockTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedSecretLockTransactionBuilder.VERSION);
        if (type !== EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.size);
        return new EmbeddedSecretLockTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            recipientAddress: secretLockTransactionBody.recipientAddress,
            secret: secretLockTransactionBody.secret,
            mosaic: secretLockTransactionBody.mosaic,
            duration: secretLockTransactionBody.duration,
            hashAlgorithm: secretLockTransactionBody.hashAlgorithm,
        });
    }
    static createEmbeddedSecretLockTransactionBuilder(signerPublicKey, network, recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        const version = EmbeddedSecretLockTransactionBuilder.VERSION;
        const type = EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedSecretLockTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            recipientAddress: recipientAddress,
            secret: secret,
            mosaic: mosaic,
            duration: duration,
            hashAlgorithm: hashAlgorithm,
        });
    }
    get recipientAddress() {
        return this.secretLockTransactionBody.recipientAddress;
    }
    get secret() {
        return this.secretLockTransactionBody.secret;
    }
    get mosaic() {
        return this.secretLockTransactionBody.mosaic;
    }
    get duration() {
        return this.secretLockTransactionBody.duration;
    }
    get hashAlgorithm() {
        return this.secretLockTransactionBody.hashAlgorithm;
    }
    get size() {
        let size = super.size;
        size += this.secretLockTransactionBody.size;
        return size;
    }
    get body() {
        return this.secretLockTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedSecretLockTransactionBuilder = EmbeddedSecretLockTransactionBuilder;
EmbeddedSecretLockTransactionBuilder.VERSION = 1;
EmbeddedSecretLockTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_SECRET_LOCK_TRANSACTION;
//# sourceMappingURL=EmbeddedSecretLockTransactionBuilder.js.map
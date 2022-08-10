"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLockTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class SecretLockTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder({
            recipientAddress,
            secret,
            mosaic,
            duration,
            hashAlgorithm,
        });
        if (version !== SecretLockTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + SecretLockTransactionBuilder.VERSION);
        if (type !== SecretLockTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + SecretLockTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.size);
        return new SecretLockTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            recipientAddress: secretLockTransactionBody.recipientAddress,
            secret: secretLockTransactionBody.secret,
            mosaic: secretLockTransactionBody.mosaic,
            duration: secretLockTransactionBody.duration,
            hashAlgorithm: secretLockTransactionBody.hashAlgorithm,
        });
    }
    static createSecretLockTransactionBuilder(signature, signerPublicKey, network, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        const version = SecretLockTransactionBuilder.VERSION;
        const type = SecretLockTransactionBuilder.ENTITY_TYPE;
        return new SecretLockTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.SecretLockTransactionBuilder = SecretLockTransactionBuilder;
SecretLockTransactionBuilder.VERSION = 1;
SecretLockTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.SECRET_LOCK_TRANSACTION;
//# sourceMappingURL=SecretLockTransactionBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedSecretProofTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
class EmbeddedSecretProofTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, recipientAddress, secret, hashAlgorithm, proof, }) {
        super({ signerPublicKey, version, network, type });
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder({ recipientAddress, secret, hashAlgorithm, proof });
        if (version !== EmbeddedSecretProofTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedSecretProofTransactionBuilder.VERSION);
        if (type !== EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.size);
        return new EmbeddedSecretProofTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            recipientAddress: secretProofTransactionBody.recipientAddress,
            secret: secretProofTransactionBody.secret,
            hashAlgorithm: secretProofTransactionBody.hashAlgorithm,
            proof: secretProofTransactionBody.proof,
        });
    }
    static createEmbeddedSecretProofTransactionBuilder(signerPublicKey, network, recipientAddress, secret, hashAlgorithm, proof) {
        const version = EmbeddedSecretProofTransactionBuilder.VERSION;
        const type = EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedSecretProofTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
        });
    }
    get recipientAddress() {
        return this.secretProofTransactionBody.recipientAddress;
    }
    get secret() {
        return this.secretProofTransactionBody.secret;
    }
    get hashAlgorithm() {
        return this.secretProofTransactionBody.hashAlgorithm;
    }
    get proof() {
        return this.secretProofTransactionBody.proof;
    }
    get size() {
        let size = super.size;
        size += this.secretProofTransactionBody.size;
        return size;
    }
    get body() {
        return this.secretProofTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedSecretProofTransactionBuilder = EmbeddedSecretProofTransactionBuilder;
EmbeddedSecretProofTransactionBuilder.VERSION = 1;
EmbeddedSecretProofTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_SECRET_PROOF_TRANSACTION;
//# sourceMappingURL=EmbeddedSecretProofTransactionBuilder.js.map
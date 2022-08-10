"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretProofTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class SecretProofTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder({ recipientAddress, secret, hashAlgorithm, proof });
        if (version !== SecretProofTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + SecretProofTransactionBuilder.VERSION);
        if (type !== SecretProofTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + SecretProofTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.size);
        return new SecretProofTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            recipientAddress: secretProofTransactionBody.recipientAddress,
            secret: secretProofTransactionBody.secret,
            hashAlgorithm: secretProofTransactionBody.hashAlgorithm,
            proof: secretProofTransactionBody.proof,
        });
    }
    static createSecretProofTransactionBuilder(signature, signerPublicKey, network, fee, deadline, recipientAddress, secret, hashAlgorithm, proof) {
        const version = SecretProofTransactionBuilder.VERSION;
        const type = SecretProofTransactionBuilder.ENTITY_TYPE;
        return new SecretProofTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.SecretProofTransactionBuilder = SecretProofTransactionBuilder;
SecretProofTransactionBuilder.VERSION = 1;
SecretProofTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.SECRET_PROOF_TRANSACTION;
//# sourceMappingURL=SecretProofTransactionBuilder.js.map
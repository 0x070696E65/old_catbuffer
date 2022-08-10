"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretProofTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class SecretProofTransactionBodyBuilder {
    constructor({ recipientAddress, secret, hashAlgorithm, proof }) {
        GeneratorUtils_1.GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(secret, 'secret is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hashAlgorithm, 'hashAlgorithm is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(proof, 'proof is null or undefined');
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.proof = proof;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.size);
        const proofSize = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const proof = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), proofSize);
        byteArray.splice(0, proofSize);
        return new SecretProofTransactionBodyBuilder({
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
        });
    }
    static createSecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof) {
        return new SecretProofTransactionBodyBuilder({
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
        });
    }
    get size() {
        let size = 0;
        size += this.recipientAddress.size;
        size += this.secret.size;
        size += 2;
        size += 1;
        size += this.proof.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const proofSizeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.proof.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, proofSizeBytes);
        const hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.hashAlgorithm);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const proofBytes = this.proof;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, proofBytes);
        return newArray;
    }
}
exports.SecretProofTransactionBodyBuilder = SecretProofTransactionBodyBuilder;
//# sourceMappingURL=SecretProofTransactionBodyBuilder.js.map
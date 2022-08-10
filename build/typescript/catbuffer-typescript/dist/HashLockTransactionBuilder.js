"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLockTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class HashLockTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder({ mosaic, duration, hash });
        if (version !== HashLockTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + HashLockTransactionBuilder.VERSION);
        if (type !== HashLockTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + HashLockTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.size);
        return new HashLockTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaic: hashLockTransactionBody.mosaic,
            duration: hashLockTransactionBody.duration,
            hash: hashLockTransactionBody.hash,
        });
    }
    static createHashLockTransactionBuilder(signature, signerPublicKey, network, fee, deadline, mosaic, duration, hash) {
        const version = HashLockTransactionBuilder.VERSION;
        const type = HashLockTransactionBuilder.ENTITY_TYPE;
        return new HashLockTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            mosaic: mosaic,
            duration: duration,
            hash: hash,
        });
    }
    get mosaic() {
        return this.hashLockTransactionBody.mosaic;
    }
    get duration() {
        return this.hashLockTransactionBody.duration;
    }
    get hash() {
        return this.hashLockTransactionBody.hash;
    }
    get size() {
        let size = super.size;
        size += this.hashLockTransactionBody.size;
        return size;
    }
    get body() {
        return this.hashLockTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    }
}
exports.HashLockTransactionBuilder = HashLockTransactionBuilder;
HashLockTransactionBuilder.VERSION = 1;
HashLockTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.HASH_LOCK_TRANSACTION;
//# sourceMappingURL=HashLockTransactionBuilder.js.map
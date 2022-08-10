"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedHashLockTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, mosaic, duration, hash }) {
        super({ signerPublicKey, version, network, type });
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder({ mosaic, duration, hash });
        if (version !== EmbeddedHashLockTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedHashLockTransactionBuilder.VERSION);
        if (type !== EmbeddedHashLockTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedHashLockTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.size);
        return new EmbeddedHashLockTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            mosaic: hashLockTransactionBody.mosaic,
            duration: hashLockTransactionBody.duration,
            hash: hashLockTransactionBody.hash,
        });
    }
    static createEmbeddedHashLockTransactionBuilder(signerPublicKey, network, mosaic, duration, hash) {
        const version = EmbeddedHashLockTransactionBuilder.VERSION;
        const type = EmbeddedHashLockTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedHashLockTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedHashLockTransactionBuilder = EmbeddedHashLockTransactionBuilder;
EmbeddedHashLockTransactionBuilder.VERSION = 1;
EmbeddedHashLockTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_HASH_LOCK_TRANSACTION;
//# sourceMappingURL=EmbeddedHashLockTransactionBuilder.js.map
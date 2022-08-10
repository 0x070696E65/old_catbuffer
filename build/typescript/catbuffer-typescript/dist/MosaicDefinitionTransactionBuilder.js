"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicDefinitionTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicDefinitionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder({ id, duration, nonce, flags, divisibility });
        if (version !== MosaicDefinitionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + MosaicDefinitionTransactionBuilder.VERSION);
        if (type !== MosaicDefinitionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + MosaicDefinitionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.size);
        return new MosaicDefinitionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            id: mosaicDefinitionTransactionBody.id,
            duration: mosaicDefinitionTransactionBody.duration,
            nonce: mosaicDefinitionTransactionBody.nonce,
            flags: mosaicDefinitionTransactionBody.flags,
            divisibility: mosaicDefinitionTransactionBody.divisibility,
        });
    }
    static createMosaicDefinitionTransactionBuilder(signature, signerPublicKey, network, fee, deadline, id, duration, nonce, flags, divisibility) {
        const version = MosaicDefinitionTransactionBuilder.VERSION;
        const type = MosaicDefinitionTransactionBuilder.ENTITY_TYPE;
        return new MosaicDefinitionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
        });
    }
    get id() {
        return this.mosaicDefinitionTransactionBody.id;
    }
    get duration() {
        return this.mosaicDefinitionTransactionBody.duration;
    }
    get nonce() {
        return this.mosaicDefinitionTransactionBody.nonce;
    }
    get flags() {
        return this.mosaicDefinitionTransactionBody.flags;
    }
    get divisibility() {
        return this.mosaicDefinitionTransactionBody.divisibility;
    }
    get size() {
        let size = super.size;
        size += this.mosaicDefinitionTransactionBody.size;
        return size;
    }
    get body() {
        return this.mosaicDefinitionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicDefinitionTransactionBuilder = MosaicDefinitionTransactionBuilder;
MosaicDefinitionTransactionBuilder.VERSION = 1;
MosaicDefinitionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION;
//# sourceMappingURL=MosaicDefinitionTransactionBuilder.js.map
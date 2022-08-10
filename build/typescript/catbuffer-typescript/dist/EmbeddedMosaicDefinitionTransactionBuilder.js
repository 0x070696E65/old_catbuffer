"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicDefinitionTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility, }) {
        super({ signerPublicKey, version, network, type });
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder({ id, duration, nonce, flags, divisibility });
        if (version !== EmbeddedMosaicDefinitionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicDefinitionTransactionBuilder.VERSION);
        if (type !== EmbeddedMosaicDefinitionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicDefinitionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.size);
        return new EmbeddedMosaicDefinitionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            id: mosaicDefinitionTransactionBody.id,
            duration: mosaicDefinitionTransactionBody.duration,
            nonce: mosaicDefinitionTransactionBody.nonce,
            flags: mosaicDefinitionTransactionBody.flags,
            divisibility: mosaicDefinitionTransactionBody.divisibility,
        });
    }
    static createEmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey, network, id, duration, nonce, flags, divisibility) {
        const version = EmbeddedMosaicDefinitionTransactionBuilder.VERSION;
        const type = EmbeddedMosaicDefinitionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicDefinitionTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedMosaicDefinitionTransactionBuilder = EmbeddedMosaicDefinitionTransactionBuilder;
EmbeddedMosaicDefinitionTransactionBuilder.VERSION = 1;
EmbeddedMosaicDefinitionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MOSAIC_DEFINITION_TRANSACTION;
//# sourceMappingURL=EmbeddedMosaicDefinitionTransactionBuilder.js.map
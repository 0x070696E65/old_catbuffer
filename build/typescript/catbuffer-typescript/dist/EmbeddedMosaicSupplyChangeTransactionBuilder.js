"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicSupplyChangeTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, mosaicId, delta, action, }) {
        super({ signerPublicKey, version, network, type });
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder({ mosaicId, delta, action });
        if (version !== EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION);
        if (type !== EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.size);
        return new EmbeddedMosaicSupplyChangeTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            mosaicId: mosaicSupplyChangeTransactionBody.mosaicId,
            delta: mosaicSupplyChangeTransactionBody.delta,
            action: mosaicSupplyChangeTransactionBody.action,
        });
    }
    static createEmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey, network, mosaicId, delta, action) {
        const version = EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION;
        const type = EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicSupplyChangeTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaicId: mosaicId,
            delta: delta,
            action: action,
        });
    }
    get mosaicId() {
        return this.mosaicSupplyChangeTransactionBody.mosaicId;
    }
    get delta() {
        return this.mosaicSupplyChangeTransactionBody.delta;
    }
    get action() {
        return this.mosaicSupplyChangeTransactionBody.action;
    }
    get size() {
        let size = super.size;
        size += this.mosaicSupplyChangeTransactionBody.size;
        return size;
    }
    get body() {
        return this.mosaicSupplyChangeTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicSupplyChangeTransactionBuilder = EmbeddedMosaicSupplyChangeTransactionBuilder;
EmbeddedMosaicSupplyChangeTransactionBuilder.VERSION = 1;
EmbeddedMosaicSupplyChangeTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MOSAIC_SUPPLY_CHANGE_TRANSACTION;
//# sourceMappingURL=EmbeddedMosaicSupplyChangeTransactionBuilder.js.map
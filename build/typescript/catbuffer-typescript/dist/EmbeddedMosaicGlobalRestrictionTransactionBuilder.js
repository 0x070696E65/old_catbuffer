"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicGlobalRestrictionTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }) {
        super({ signerPublicKey, version, network, type });
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder({
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        });
        if (version !== EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION);
        if (type !== EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.size);
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            mosaicId: mosaicGlobalRestrictionTransactionBody.mosaicId,
            referenceMosaicId: mosaicGlobalRestrictionTransactionBody.referenceMosaicId,
            restrictionKey: mosaicGlobalRestrictionTransactionBody.restrictionKey,
            previousRestrictionValue: mosaicGlobalRestrictionTransactionBody.previousRestrictionValue,
            newRestrictionValue: mosaicGlobalRestrictionTransactionBody.newRestrictionValue,
            previousRestrictionType: mosaicGlobalRestrictionTransactionBody.previousRestrictionType,
            newRestrictionType: mosaicGlobalRestrictionTransactionBody.newRestrictionType,
        });
    }
    static createEmbeddedMosaicGlobalRestrictionTransactionBuilder(signerPublicKey, network, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        const version = EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaicId: mosaicId,
            referenceMosaicId: referenceMosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            previousRestrictionType: previousRestrictionType,
            newRestrictionType: newRestrictionType,
        });
    }
    get mosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.mosaicId;
    }
    get referenceMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.referenceMosaicId;
    }
    get restrictionKey() {
        return this.mosaicGlobalRestrictionTransactionBody.restrictionKey;
    }
    get previousRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.previousRestrictionValue;
    }
    get newRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.newRestrictionValue;
    }
    get previousRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.previousRestrictionType;
    }
    get newRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.newRestrictionType;
    }
    get size() {
        let size = super.size;
        size += this.mosaicGlobalRestrictionTransactionBody.size;
        return size;
    }
    get body() {
        return this.mosaicGlobalRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicGlobalRestrictionTransactionBuilder = EmbeddedMosaicGlobalRestrictionTransactionBuilder;
EmbeddedMosaicGlobalRestrictionTransactionBuilder.VERSION = 1;
EmbeddedMosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MOSAIC_GLOBAL_RESTRICTION_TRANSACTION;
//# sourceMappingURL=EmbeddedMosaicGlobalRestrictionTransactionBuilder.js.map
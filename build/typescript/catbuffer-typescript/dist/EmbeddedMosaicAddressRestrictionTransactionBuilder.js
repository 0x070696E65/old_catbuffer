"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicAddressRestrictionTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
class EmbeddedMosaicAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }) {
        super({ signerPublicKey, version, network, type });
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        });
        if (version !== EmbeddedMosaicAddressRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicAddressRestrictionTransactionBuilder.VERSION);
        if (type !== EmbeddedMosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.size);
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            mosaicId: mosaicAddressRestrictionTransactionBody.mosaicId,
            restrictionKey: mosaicAddressRestrictionTransactionBody.restrictionKey,
            previousRestrictionValue: mosaicAddressRestrictionTransactionBody.previousRestrictionValue,
            newRestrictionValue: mosaicAddressRestrictionTransactionBody.newRestrictionValue,
            targetAddress: mosaicAddressRestrictionTransactionBody.targetAddress,
        });
    }
    static createEmbeddedMosaicAddressRestrictionTransactionBuilder(signerPublicKey, network, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        const version = EmbeddedMosaicAddressRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedMosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
        });
    }
    get mosaicId() {
        return this.mosaicAddressRestrictionTransactionBody.mosaicId;
    }
    get restrictionKey() {
        return this.mosaicAddressRestrictionTransactionBody.restrictionKey;
    }
    get previousRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.previousRestrictionValue;
    }
    get newRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.newRestrictionValue;
    }
    get targetAddress() {
        return this.mosaicAddressRestrictionTransactionBody.targetAddress;
    }
    get size() {
        let size = super.size;
        size += this.mosaicAddressRestrictionTransactionBody.size;
        return size;
    }
    get body() {
        return this.mosaicAddressRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicAddressRestrictionTransactionBuilder = EmbeddedMosaicAddressRestrictionTransactionBuilder;
EmbeddedMosaicAddressRestrictionTransactionBuilder.VERSION = 1;
EmbeddedMosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MOSAIC_ADDRESS_RESTRICTION_TRANSACTION;
//# sourceMappingURL=EmbeddedMosaicAddressRestrictionTransactionBuilder.js.map
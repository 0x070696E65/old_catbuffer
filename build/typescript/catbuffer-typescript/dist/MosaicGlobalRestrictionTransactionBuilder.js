"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicGlobalRestrictionTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicGlobalRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder({
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        });
        if (version !== MosaicGlobalRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                MosaicGlobalRestrictionTransactionBuilder.VERSION);
        if (type !== MosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                MosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.size);
        return new MosaicGlobalRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaicId: mosaicGlobalRestrictionTransactionBody.mosaicId,
            referenceMosaicId: mosaicGlobalRestrictionTransactionBody.referenceMosaicId,
            restrictionKey: mosaicGlobalRestrictionTransactionBody.restrictionKey,
            previousRestrictionValue: mosaicGlobalRestrictionTransactionBody.previousRestrictionValue,
            newRestrictionValue: mosaicGlobalRestrictionTransactionBody.newRestrictionValue,
            previousRestrictionType: mosaicGlobalRestrictionTransactionBody.previousRestrictionType,
            newRestrictionType: mosaicGlobalRestrictionTransactionBody.newRestrictionType,
        });
    }
    static createMosaicGlobalRestrictionTransactionBuilder(signature, signerPublicKey, network, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        const version = MosaicGlobalRestrictionTransactionBuilder.VERSION;
        const type = MosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE;
        return new MosaicGlobalRestrictionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.MosaicGlobalRestrictionTransactionBuilder = MosaicGlobalRestrictionTransactionBuilder;
MosaicGlobalRestrictionTransactionBuilder.VERSION = 1;
MosaicGlobalRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MOSAIC_GLOBAL_RESTRICTION_TRANSACTION;
//# sourceMappingURL=MosaicGlobalRestrictionTransactionBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAddressRestrictionTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicAddressRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder({
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        });
        if (version !== MosaicAddressRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                MosaicAddressRestrictionTransactionBuilder.VERSION);
        if (type !== MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.size);
        return new MosaicAddressRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaicId: mosaicAddressRestrictionTransactionBody.mosaicId,
            restrictionKey: mosaicAddressRestrictionTransactionBody.restrictionKey,
            previousRestrictionValue: mosaicAddressRestrictionTransactionBody.previousRestrictionValue,
            newRestrictionValue: mosaicAddressRestrictionTransactionBody.newRestrictionValue,
            targetAddress: mosaicAddressRestrictionTransactionBody.targetAddress,
        });
    }
    static createMosaicAddressRestrictionTransactionBuilder(signature, signerPublicKey, network, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        const version = MosaicAddressRestrictionTransactionBuilder.VERSION;
        const type = MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new MosaicAddressRestrictionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.MosaicAddressRestrictionTransactionBuilder = MosaicAddressRestrictionTransactionBuilder;
MosaicAddressRestrictionTransactionBuilder.VERSION = 1;
MosaicAddressRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MOSAIC_ADDRESS_RESTRICTION_TRANSACTION;
//# sourceMappingURL=MosaicAddressRestrictionTransactionBuilder.js.map
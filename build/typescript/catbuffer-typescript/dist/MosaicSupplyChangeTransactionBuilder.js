"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicSupplyChangeTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder({ mosaicId, delta, action });
        if (version !== MosaicSupplyChangeTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + MosaicSupplyChangeTransactionBuilder.VERSION);
        if (type !== MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.size);
        return new MosaicSupplyChangeTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaicId: mosaicSupplyChangeTransactionBody.mosaicId,
            delta: mosaicSupplyChangeTransactionBody.delta,
            action: mosaicSupplyChangeTransactionBody.action,
        });
    }
    static createMosaicSupplyChangeTransactionBuilder(signature, signerPublicKey, network, fee, deadline, mosaicId, delta, action) {
        const version = MosaicSupplyChangeTransactionBuilder.VERSION;
        const type = MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE;
        return new MosaicSupplyChangeTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.MosaicSupplyChangeTransactionBuilder = MosaicSupplyChangeTransactionBuilder;
MosaicSupplyChangeTransactionBuilder.VERSION = 1;
MosaicSupplyChangeTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MOSAIC_SUPPLY_CHANGE_TRANSACTION;
//# sourceMappingURL=MosaicSupplyChangeTransactionBuilder.js.map
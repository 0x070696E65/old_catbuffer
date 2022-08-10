"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicMetadataTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            targetMosaicId,
            valueSizeDelta,
            value,
        });
        if (version !== MosaicMetadataTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + MosaicMetadataTransactionBuilder.VERSION);
        if (type !== MosaicMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + MosaicMetadataTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.size);
        return new MosaicMetadataTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            targetAddress: mosaicMetadataTransactionBody.targetAddress,
            scopedMetadataKey: mosaicMetadataTransactionBody.scopedMetadataKey,
            targetMosaicId: mosaicMetadataTransactionBody.targetMosaicId,
            valueSizeDelta: mosaicMetadataTransactionBody.valueSizeDelta,
            value: mosaicMetadataTransactionBody.value,
        });
    }
    static createMosaicMetadataTransactionBuilder(signature, signerPublicKey, network, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        const version = MosaicMetadataTransactionBuilder.VERSION;
        const type = MosaicMetadataTransactionBuilder.ENTITY_TYPE;
        return new MosaicMetadataTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetMosaicId: targetMosaicId,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }
    get targetAddress() {
        return this.mosaicMetadataTransactionBody.targetAddress;
    }
    get scopedMetadataKey() {
        return this.mosaicMetadataTransactionBody.scopedMetadataKey;
    }
    get targetMosaicId() {
        return this.mosaicMetadataTransactionBody.targetMosaicId;
    }
    get valueSizeDelta() {
        return this.mosaicMetadataTransactionBody.valueSizeDelta;
    }
    get value() {
        return this.mosaicMetadataTransactionBody.value;
    }
    get size() {
        let size = super.size;
        size += this.mosaicMetadataTransactionBody.size;
        return size;
    }
    get body() {
        return this.mosaicMetadataTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicMetadataTransactionBuilder = MosaicMetadataTransactionBuilder;
MosaicMetadataTransactionBuilder.VERSION = 1;
MosaicMetadataTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MOSAIC_METADATA_TRANSACTION;
//# sourceMappingURL=MosaicMetadataTransactionBuilder.js.map
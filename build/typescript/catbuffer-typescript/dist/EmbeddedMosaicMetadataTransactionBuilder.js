"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicMetadataTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
class EmbeddedMosaicMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }) {
        super({ signerPublicKey, version, network, type });
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            targetMosaicId,
            valueSizeDelta,
            value,
        });
        if (version !== EmbeddedMosaicMetadataTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicMetadataTransactionBuilder.VERSION);
        if (type !== EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.size);
        return new EmbeddedMosaicMetadataTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            targetAddress: mosaicMetadataTransactionBody.targetAddress,
            scopedMetadataKey: mosaicMetadataTransactionBody.scopedMetadataKey,
            targetMosaicId: mosaicMetadataTransactionBody.targetMosaicId,
            valueSizeDelta: mosaicMetadataTransactionBody.valueSizeDelta,
            value: mosaicMetadataTransactionBody.value,
        });
    }
    static createEmbeddedMosaicMetadataTransactionBuilder(signerPublicKey, network, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        const version = EmbeddedMosaicMetadataTransactionBuilder.VERSION;
        const type = EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicMetadataTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedMosaicMetadataTransactionBuilder = EmbeddedMosaicMetadataTransactionBuilder;
EmbeddedMosaicMetadataTransactionBuilder.VERSION = 1;
EmbeddedMosaicMetadataTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MOSAIC_METADATA_TRANSACTION;
//# sourceMappingURL=EmbeddedMosaicMetadataTransactionBuilder.js.map
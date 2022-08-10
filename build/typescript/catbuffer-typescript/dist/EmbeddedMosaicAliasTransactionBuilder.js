"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicAliasTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
class EmbeddedMosaicAliasTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, namespaceId, mosaicId, aliasAction, }) {
        super({ signerPublicKey, version, network, type });
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder({ namespaceId, mosaicId, aliasAction });
        if (version !== EmbeddedMosaicAliasTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedMosaicAliasTransactionBuilder.VERSION);
        if (type !== EmbeddedMosaicAliasTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedMosaicAliasTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.size);
        return new EmbeddedMosaicAliasTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            namespaceId: mosaicAliasTransactionBody.namespaceId,
            mosaicId: mosaicAliasTransactionBody.mosaicId,
            aliasAction: mosaicAliasTransactionBody.aliasAction,
        });
    }
    static createEmbeddedMosaicAliasTransactionBuilder(signerPublicKey, network, namespaceId, mosaicId, aliasAction) {
        const version = EmbeddedMosaicAliasTransactionBuilder.VERSION;
        const type = EmbeddedMosaicAliasTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMosaicAliasTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            namespaceId: namespaceId,
            mosaicId: mosaicId,
            aliasAction: aliasAction,
        });
    }
    get namespaceId() {
        return this.mosaicAliasTransactionBody.namespaceId;
    }
    get mosaicId() {
        return this.mosaicAliasTransactionBody.mosaicId;
    }
    get aliasAction() {
        return this.mosaicAliasTransactionBody.aliasAction;
    }
    get size() {
        let size = super.size;
        size += this.mosaicAliasTransactionBody.size;
        return size;
    }
    get body() {
        return this.mosaicAliasTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicAliasTransactionBuilder = EmbeddedMosaicAliasTransactionBuilder;
EmbeddedMosaicAliasTransactionBuilder.VERSION = 1;
EmbeddedMosaicAliasTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MOSAIC_ALIAS_TRANSACTION;
//# sourceMappingURL=EmbeddedMosaicAliasTransactionBuilder.js.map
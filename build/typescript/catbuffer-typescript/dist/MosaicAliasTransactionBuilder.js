"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAliasTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicAliasTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder({ namespaceId, mosaicId, aliasAction });
        if (version !== MosaicAliasTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + MosaicAliasTransactionBuilder.VERSION);
        if (type !== MosaicAliasTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + MosaicAliasTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.size);
        return new MosaicAliasTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            namespaceId: mosaicAliasTransactionBody.namespaceId,
            mosaicId: mosaicAliasTransactionBody.mosaicId,
            aliasAction: mosaicAliasTransactionBody.aliasAction,
        });
    }
    static createMosaicAliasTransactionBuilder(signature, signerPublicKey, network, fee, deadline, namespaceId, mosaicId, aliasAction) {
        const version = MosaicAliasTransactionBuilder.VERSION;
        const type = MosaicAliasTransactionBuilder.ENTITY_TYPE;
        return new MosaicAliasTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.MosaicAliasTransactionBuilder = MosaicAliasTransactionBuilder;
MosaicAliasTransactionBuilder.VERSION = 1;
MosaicAliasTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MOSAIC_ALIAS_TRANSACTION;
//# sourceMappingURL=MosaicAliasTransactionBuilder.js.map
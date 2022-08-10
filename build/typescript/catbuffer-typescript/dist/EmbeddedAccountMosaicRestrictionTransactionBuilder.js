"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountMosaicRestrictionTransactionBuilder = void 0;
const AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        super({ signerPublicKey, version, network, type });
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION);
        if (type !== EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.size);
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            restrictionFlags: accountMosaicRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountMosaicRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountMosaicRestrictionTransactionBody.restrictionDeletions,
        });
    }
    static createEmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey, network, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        const version = EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }
    get restrictionFlags() {
        return this.accountMosaicRestrictionTransactionBody.restrictionFlags;
    }
    get restrictionAdditions() {
        return this.accountMosaicRestrictionTransactionBody.restrictionAdditions;
    }
    get restrictionDeletions() {
        return this.accountMosaicRestrictionTransactionBody.restrictionDeletions;
    }
    get size() {
        let size = super.size;
        size += this.accountMosaicRestrictionTransactionBody.size;
        return size;
    }
    get body() {
        return this.accountMosaicRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountMosaicRestrictionTransactionBuilder = EmbeddedAccountMosaicRestrictionTransactionBuilder;
EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION = 1;
EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION;
//# sourceMappingURL=EmbeddedAccountMosaicRestrictionTransactionBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountAddressRestrictionTransactionBuilder = void 0;
const AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        super({ signerPublicKey, version, network, type });
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION);
        if (type !== EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.size);
        return new EmbeddedAccountAddressRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            restrictionFlags: accountAddressRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountAddressRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountAddressRestrictionTransactionBody.restrictionDeletions,
        });
    }
    static createEmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey, network, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        const version = EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountAddressRestrictionTransactionBuilder({
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
        return this.accountAddressRestrictionTransactionBody.restrictionFlags;
    }
    get restrictionAdditions() {
        return this.accountAddressRestrictionTransactionBody.restrictionAdditions;
    }
    get restrictionDeletions() {
        return this.accountAddressRestrictionTransactionBody.restrictionDeletions;
    }
    get size() {
        let size = super.size;
        size += this.accountAddressRestrictionTransactionBody.size;
        return size;
    }
    get body() {
        return this.accountAddressRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountAddressRestrictionTransactionBuilder = EmbeddedAccountAddressRestrictionTransactionBuilder;
EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION = 1;
EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION;
//# sourceMappingURL=EmbeddedAccountAddressRestrictionTransactionBuilder.js.map
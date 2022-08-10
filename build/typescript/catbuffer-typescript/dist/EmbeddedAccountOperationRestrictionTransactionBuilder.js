"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountOperationRestrictionTransactionBuilder = void 0;
const AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountOperationRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        super({ signerPublicKey, version, network, type });
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION);
        if (type !== EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.size);
        return new EmbeddedAccountOperationRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            restrictionFlags: accountOperationRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountOperationRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountOperationRestrictionTransactionBody.restrictionDeletions,
        });
    }
    static createEmbeddedAccountOperationRestrictionTransactionBuilder(signerPublicKey, network, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        const version = EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountOperationRestrictionTransactionBuilder({
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
        return this.accountOperationRestrictionTransactionBody.restrictionFlags;
    }
    get restrictionAdditions() {
        return this.accountOperationRestrictionTransactionBody.restrictionAdditions;
    }
    get restrictionDeletions() {
        return this.accountOperationRestrictionTransactionBody.restrictionDeletions;
    }
    get size() {
        let size = super.size;
        size += this.accountOperationRestrictionTransactionBody.size;
        return size;
    }
    get body() {
        return this.accountOperationRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountOperationRestrictionTransactionBuilder = EmbeddedAccountOperationRestrictionTransactionBuilder;
EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION = 1;
EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_ACCOUNT_OPERATION_RESTRICTION_TRANSACTION;
//# sourceMappingURL=EmbeddedAccountOperationRestrictionTransactionBuilder.js.map
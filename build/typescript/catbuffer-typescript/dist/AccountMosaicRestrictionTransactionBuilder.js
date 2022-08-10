"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMosaicRestrictionTransactionBuilder = void 0;
const AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountMosaicRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== AccountMosaicRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                AccountMosaicRestrictionTransactionBuilder.VERSION);
        if (type !== AccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                AccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.size);
        return new AccountMosaicRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            restrictionFlags: accountMosaicRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountMosaicRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountMosaicRestrictionTransactionBody.restrictionDeletions,
        });
    }
    static createAccountMosaicRestrictionTransactionBuilder(signature, signerPublicKey, network, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        const version = AccountMosaicRestrictionTransactionBuilder.VERSION;
        const type = AccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE;
        return new AccountMosaicRestrictionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.AccountMosaicRestrictionTransactionBuilder = AccountMosaicRestrictionTransactionBuilder;
AccountMosaicRestrictionTransactionBuilder.VERSION = 1;
AccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION;
//# sourceMappingURL=AccountMosaicRestrictionTransactionBuilder.js.map
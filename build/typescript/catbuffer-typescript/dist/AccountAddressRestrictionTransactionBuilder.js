"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAddressRestrictionTransactionBuilder = void 0;
const AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountAddressRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== AccountAddressRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                AccountAddressRestrictionTransactionBuilder.VERSION);
        if (type !== AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.size);
        return new AccountAddressRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            restrictionFlags: accountAddressRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountAddressRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountAddressRestrictionTransactionBody.restrictionDeletions,
        });
    }
    static createAccountAddressRestrictionTransactionBuilder(signature, signerPublicKey, network, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        const version = AccountAddressRestrictionTransactionBuilder.VERSION;
        const type = AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new AccountAddressRestrictionTransactionBuilder({
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
exports.AccountAddressRestrictionTransactionBuilder = AccountAddressRestrictionTransactionBuilder;
AccountAddressRestrictionTransactionBuilder.VERSION = 1;
AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION;
//# sourceMappingURL=AccountAddressRestrictionTransactionBuilder.js.map
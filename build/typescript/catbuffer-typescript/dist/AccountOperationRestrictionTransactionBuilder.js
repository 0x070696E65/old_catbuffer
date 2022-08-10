"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountOperationRestrictionTransactionBuilder = void 0;
const AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== AccountOperationRestrictionTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                AccountOperationRestrictionTransactionBuilder.VERSION);
        if (type !== AccountOperationRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                AccountOperationRestrictionTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.size);
        return new AccountOperationRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            restrictionFlags: accountOperationRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountOperationRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountOperationRestrictionTransactionBody.restrictionDeletions,
        });
    }
    static createAccountOperationRestrictionTransactionBuilder(signature, signerPublicKey, network, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        const version = AccountOperationRestrictionTransactionBuilder.VERSION;
        const type = AccountOperationRestrictionTransactionBuilder.ENTITY_TYPE;
        return new AccountOperationRestrictionTransactionBuilder({
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
exports.AccountOperationRestrictionTransactionBuilder = AccountOperationRestrictionTransactionBuilder;
AccountOperationRestrictionTransactionBuilder.VERSION = 1;
AccountOperationRestrictionTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.ACCOUNT_OPERATION_RESTRICTION_TRANSACTION;
//# sourceMappingURL=AccountOperationRestrictionTransactionBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountKeyLinkTransactionBuilder = void 0;
const AccountKeyLinkTransactionBodyBuilder_1 = require("./AccountKeyLinkTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== AccountKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + AccountKeyLinkTransactionBuilder.VERSION);
        if (type !== AccountKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + AccountKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountKeyLinkTransactionBody.size);
        return new AccountKeyLinkTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            linkedPublicKey: accountKeyLinkTransactionBody.linkedPublicKey,
            linkAction: accountKeyLinkTransactionBody.linkAction,
        });
    }
    static createAccountKeyLinkTransactionBuilder(signature, signerPublicKey, network, fee, deadline, linkedPublicKey, linkAction) {
        const version = AccountKeyLinkTransactionBuilder.VERSION;
        const type = AccountKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new AccountKeyLinkTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            linkedPublicKey: linkedPublicKey,
            linkAction: linkAction,
        });
    }
    get linkedPublicKey() {
        return this.accountKeyLinkTransactionBody.linkedPublicKey;
    }
    get linkAction() {
        return this.accountKeyLinkTransactionBody.linkAction;
    }
    get size() {
        let size = super.size;
        size += this.accountKeyLinkTransactionBody.size;
        return size;
    }
    get body() {
        return this.accountKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountKeyLinkTransactionBodyBytes = this.accountKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountKeyLinkTransactionBuilder = AccountKeyLinkTransactionBuilder;
AccountKeyLinkTransactionBuilder.VERSION = 1;
AccountKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.ACCOUNT_KEY_LINK_TRANSACTION;
//# sourceMappingURL=AccountKeyLinkTransactionBuilder.js.map
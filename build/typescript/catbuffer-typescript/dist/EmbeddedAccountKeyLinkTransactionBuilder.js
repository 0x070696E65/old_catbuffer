"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountKeyLinkTransactionBuilder = void 0;
const AccountKeyLinkTransactionBodyBuilder_1 = require("./AccountKeyLinkTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction, }) {
        super({ signerPublicKey, version, network, type });
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== EmbeddedAccountKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedAccountKeyLinkTransactionBuilder.VERSION);
        if (type !== EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountKeyLinkTransactionBody.size);
        return new EmbeddedAccountKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: accountKeyLinkTransactionBody.linkedPublicKey,
            linkAction: accountKeyLinkTransactionBody.linkAction,
        });
    }
    static createEmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey, network, linkedPublicKey, linkAction) {
        const version = EmbeddedAccountKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountKeyLinkTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedAccountKeyLinkTransactionBuilder = EmbeddedAccountKeyLinkTransactionBuilder;
EmbeddedAccountKeyLinkTransactionBuilder.VERSION = 1;
EmbeddedAccountKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_ACCOUNT_KEY_LINK_TRANSACTION;
//# sourceMappingURL=EmbeddedAccountKeyLinkTransactionBuilder.js.map
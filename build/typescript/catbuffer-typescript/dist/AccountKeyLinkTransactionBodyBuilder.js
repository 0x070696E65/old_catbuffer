"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountKeyLinkTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class AccountKeyLinkTransactionBodyBuilder {
    constructor({ linkedPublicKey, linkAction }) {
        GeneratorUtils_1.GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.size);
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new AccountKeyLinkTransactionBodyBuilder({ linkedPublicKey: linkedPublicKey, linkAction: linkAction });
    }
    static createAccountKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction) {
        return new AccountKeyLinkTransactionBodyBuilder({ linkedPublicKey: linkedPublicKey, linkAction: linkAction });
    }
    get size() {
        let size = 0;
        size += this.linkedPublicKey.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.AccountKeyLinkTransactionBodyBuilder = AccountKeyLinkTransactionBodyBuilder;
//# sourceMappingURL=AccountKeyLinkTransactionBodyBuilder.js.map
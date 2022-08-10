"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfKeyLinkTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const VrfKeyLinkTransactionBodyBuilder_1 = require("./VrfKeyLinkTransactionBodyBuilder");
class VrfKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== VrfKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + VrfKeyLinkTransactionBuilder.VERSION);
        if (type !== VrfKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + VrfKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, vrfKeyLinkTransactionBody.size);
        return new VrfKeyLinkTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            linkedPublicKey: vrfKeyLinkTransactionBody.linkedPublicKey,
            linkAction: vrfKeyLinkTransactionBody.linkAction,
        });
    }
    static createVrfKeyLinkTransactionBuilder(signature, signerPublicKey, network, fee, deadline, linkedPublicKey, linkAction) {
        const version = VrfKeyLinkTransactionBuilder.VERSION;
        const type = VrfKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new VrfKeyLinkTransactionBuilder({
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
        return this.vrfKeyLinkTransactionBody.linkedPublicKey;
    }
    get linkAction() {
        return this.vrfKeyLinkTransactionBody.linkAction;
    }
    get size() {
        let size = super.size;
        size += this.vrfKeyLinkTransactionBody.size;
        return size;
    }
    get body() {
        return this.vrfKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.VrfKeyLinkTransactionBuilder = VrfKeyLinkTransactionBuilder;
VrfKeyLinkTransactionBuilder.VERSION = 1;
VrfKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.VRF_KEY_LINK_TRANSACTION;
//# sourceMappingURL=VrfKeyLinkTransactionBuilder.js.map
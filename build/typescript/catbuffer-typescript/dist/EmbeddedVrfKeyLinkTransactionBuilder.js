"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedVrfKeyLinkTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VrfKeyLinkTransactionBodyBuilder_1 = require("./VrfKeyLinkTransactionBodyBuilder");
class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction, }) {
        super({ signerPublicKey, version, network, type });
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== EmbeddedVrfKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedVrfKeyLinkTransactionBuilder.VERSION);
        if (type !== EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, vrfKeyLinkTransactionBody.size);
        return new EmbeddedVrfKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: vrfKeyLinkTransactionBody.linkedPublicKey,
            linkAction: vrfKeyLinkTransactionBody.linkAction,
        });
    }
    static createEmbeddedVrfKeyLinkTransactionBuilder(signerPublicKey, network, linkedPublicKey, linkAction) {
        const version = EmbeddedVrfKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedVrfKeyLinkTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedVrfKeyLinkTransactionBuilder = EmbeddedVrfKeyLinkTransactionBuilder;
EmbeddedVrfKeyLinkTransactionBuilder.VERSION = 1;
EmbeddedVrfKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_VRF_KEY_LINK_TRANSACTION;
//# sourceMappingURL=EmbeddedVrfKeyLinkTransactionBuilder.js.map
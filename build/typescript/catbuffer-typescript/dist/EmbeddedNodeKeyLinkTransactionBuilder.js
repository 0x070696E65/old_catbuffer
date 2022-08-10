"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNodeKeyLinkTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NodeKeyLinkTransactionBodyBuilder_1 = require("./NodeKeyLinkTransactionBodyBuilder");
class EmbeddedNodeKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction, }) {
        super({ signerPublicKey, version, network, type });
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== EmbeddedNodeKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + EmbeddedNodeKeyLinkTransactionBuilder.VERSION);
        if (type !== EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nodeKeyLinkTransactionBody.size);
        return new EmbeddedNodeKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: nodeKeyLinkTransactionBody.linkedPublicKey,
            linkAction: nodeKeyLinkTransactionBody.linkAction,
        });
    }
    static createEmbeddedNodeKeyLinkTransactionBuilder(signerPublicKey, network, linkedPublicKey, linkAction) {
        const version = EmbeddedNodeKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedNodeKeyLinkTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            linkedPublicKey: linkedPublicKey,
            linkAction: linkAction,
        });
    }
    get linkedPublicKey() {
        return this.nodeKeyLinkTransactionBody.linkedPublicKey;
    }
    get linkAction() {
        return this.nodeKeyLinkTransactionBody.linkAction;
    }
    get size() {
        let size = super.size;
        size += this.nodeKeyLinkTransactionBody.size;
        return size;
    }
    get body() {
        return this.nodeKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const nodeKeyLinkTransactionBodyBytes = this.nodeKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nodeKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNodeKeyLinkTransactionBuilder = EmbeddedNodeKeyLinkTransactionBuilder;
EmbeddedNodeKeyLinkTransactionBuilder.VERSION = 1;
EmbeddedNodeKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_NODE_KEY_LINK_TRANSACTION;
//# sourceMappingURL=EmbeddedNodeKeyLinkTransactionBuilder.js.map
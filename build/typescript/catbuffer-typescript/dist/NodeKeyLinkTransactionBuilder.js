"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeKeyLinkTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NodeKeyLinkTransactionBodyBuilder_1 = require("./NodeKeyLinkTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NodeKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder({ linkedPublicKey, linkAction });
        if (version !== NodeKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + NodeKeyLinkTransactionBuilder.VERSION);
        if (type !== NodeKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + NodeKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nodeKeyLinkTransactionBody.size);
        return new NodeKeyLinkTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            linkedPublicKey: nodeKeyLinkTransactionBody.linkedPublicKey,
            linkAction: nodeKeyLinkTransactionBody.linkAction,
        });
    }
    static createNodeKeyLinkTransactionBuilder(signature, signerPublicKey, network, fee, deadline, linkedPublicKey, linkAction) {
        const version = NodeKeyLinkTransactionBuilder.VERSION;
        const type = NodeKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new NodeKeyLinkTransactionBuilder({
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
exports.NodeKeyLinkTransactionBuilder = NodeKeyLinkTransactionBuilder;
NodeKeyLinkTransactionBuilder.VERSION = 1;
NodeKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.NODE_KEY_LINK_TRANSACTION;
//# sourceMappingURL=NodeKeyLinkTransactionBuilder.js.map
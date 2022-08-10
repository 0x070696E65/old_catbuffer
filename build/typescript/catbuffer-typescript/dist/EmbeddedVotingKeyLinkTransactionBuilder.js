"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedVotingKeyLinkTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingKeyLinkTransactionBodyBuilder_1 = require("./VotingKeyLinkTransactionBodyBuilder");
class EmbeddedVotingKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction, }) {
        super({ signerPublicKey, version, network, type });
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder({ linkedPublicKey, startEpoch, endEpoch, linkAction });
        if (version !== EmbeddedVotingKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedVotingKeyLinkTransactionBuilder.VERSION);
        if (type !== EmbeddedVotingKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedVotingKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKeyLinkTransactionBody.size);
        return new EmbeddedVotingKeyLinkTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            linkedPublicKey: votingKeyLinkTransactionBody.linkedPublicKey,
            startEpoch: votingKeyLinkTransactionBody.startEpoch,
            endEpoch: votingKeyLinkTransactionBody.endEpoch,
            linkAction: votingKeyLinkTransactionBody.linkAction,
        });
    }
    static createEmbeddedVotingKeyLinkTransactionBuilder(signerPublicKey, network, linkedPublicKey, startEpoch, endEpoch, linkAction) {
        const version = EmbeddedVotingKeyLinkTransactionBuilder.VERSION;
        const type = EmbeddedVotingKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedVotingKeyLinkTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
    }
    get linkedPublicKey() {
        return this.votingKeyLinkTransactionBody.linkedPublicKey;
    }
    get startEpoch() {
        return this.votingKeyLinkTransactionBody.startEpoch;
    }
    get endEpoch() {
        return this.votingKeyLinkTransactionBody.endEpoch;
    }
    get linkAction() {
        return this.votingKeyLinkTransactionBody.linkAction;
    }
    get size() {
        let size = super.size;
        size += this.votingKeyLinkTransactionBody.size;
        return size;
    }
    get body() {
        return this.votingKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const votingKeyLinkTransactionBodyBytes = this.votingKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedVotingKeyLinkTransactionBuilder = EmbeddedVotingKeyLinkTransactionBuilder;
EmbeddedVotingKeyLinkTransactionBuilder.VERSION = 1;
EmbeddedVotingKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_VOTING_KEY_LINK_TRANSACTION;
//# sourceMappingURL=EmbeddedVotingKeyLinkTransactionBuilder.js.map
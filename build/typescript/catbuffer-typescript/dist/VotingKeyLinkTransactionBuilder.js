"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingKeyLinkTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const VotingKeyLinkTransactionBodyBuilder_1 = require("./VotingKeyLinkTransactionBodyBuilder");
class VotingKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder({ linkedPublicKey, startEpoch, endEpoch, linkAction });
        if (version !== VotingKeyLinkTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + VotingKeyLinkTransactionBuilder.VERSION);
        if (type !== VotingKeyLinkTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + VotingKeyLinkTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKeyLinkTransactionBody.size);
        return new VotingKeyLinkTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            linkedPublicKey: votingKeyLinkTransactionBody.linkedPublicKey,
            startEpoch: votingKeyLinkTransactionBody.startEpoch,
            endEpoch: votingKeyLinkTransactionBody.endEpoch,
            linkAction: votingKeyLinkTransactionBody.linkAction,
        });
    }
    static createVotingKeyLinkTransactionBuilder(signature, signerPublicKey, network, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction) {
        const version = VotingKeyLinkTransactionBuilder.VERSION;
        const type = VotingKeyLinkTransactionBuilder.ENTITY_TYPE;
        return new VotingKeyLinkTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
exports.VotingKeyLinkTransactionBuilder = VotingKeyLinkTransactionBuilder;
VotingKeyLinkTransactionBuilder.VERSION = 1;
VotingKeyLinkTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.VOTING_KEY_LINK_TRANSACTION;
//# sourceMappingURL=VotingKeyLinkTransactionBuilder.js.map
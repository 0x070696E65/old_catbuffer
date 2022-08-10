"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingKeyLinkTransactionBodyBuilder = void 0;
const FinalizationEpochDto_1 = require("./FinalizationEpochDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingKeyDto_1 = require("./VotingKeyDto");
class VotingKeyLinkTransactionBodyBuilder {
    constructor({ linkedPublicKey, startEpoch, endEpoch, linkAction }) {
        GeneratorUtils_1.GeneratorUtils.notNull(linkedPublicKey, 'linkedPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(linkAction, 'linkAction is null or undefined');
        this.linkedPublicKey = linkedPublicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = VotingKeyDto_1.VotingKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.size);
        const startEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new VotingKeyLinkTransactionBodyBuilder({
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
    }
    static createVotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction) {
        return new VotingKeyLinkTransactionBodyBuilder({
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
    }
    get size() {
        let size = 0;
        size += this.linkedPublicKey.size;
        size += this.startEpoch.size;
        size += this.endEpoch.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.linkAction);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.VotingKeyLinkTransactionBodyBuilder = VotingKeyLinkTransactionBodyBuilder;
//# sourceMappingURL=VotingKeyLinkTransactionBodyBuilder.js.map
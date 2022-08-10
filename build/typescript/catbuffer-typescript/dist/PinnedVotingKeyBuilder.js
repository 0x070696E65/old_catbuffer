"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedVotingKeyBuilder = void 0;
const FinalizationEpochDto_1 = require("./FinalizationEpochDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingKeyDto_1 = require("./VotingKeyDto");
class PinnedVotingKeyBuilder {
    constructor({ votingKey, startEpoch, endEpoch }) {
        GeneratorUtils_1.GeneratorUtils.notNull(votingKey, 'votingKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(startEpoch, 'startEpoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endEpoch, 'endEpoch is null or undefined');
        this.votingKey = votingKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const votingKey = VotingKeyDto_1.VotingKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKey.size);
        const startEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        return new PinnedVotingKeyBuilder({ votingKey: votingKey, startEpoch: startEpoch, endEpoch: endEpoch });
    }
    static createPinnedVotingKeyBuilder(votingKey, startEpoch, endEpoch) {
        return new PinnedVotingKeyBuilder({ votingKey: votingKey, startEpoch: startEpoch, endEpoch: endEpoch });
    }
    get size() {
        let size = 0;
        size += this.votingKey.size;
        size += this.startEpoch.size;
        size += this.endEpoch.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const votingKeyBytes = this.votingKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endEpochBytes);
        return newArray;
    }
}
exports.PinnedVotingKeyBuilder = PinnedVotingKeyBuilder;
//# sourceMappingURL=PinnedVotingKeyBuilder.js.map
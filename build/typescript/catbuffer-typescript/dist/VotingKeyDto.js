"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingKeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class VotingKeyDto {
    constructor(votingKey) {
        this.votingKey = votingKey;
    }
    static loadFromBinary(payload) {
        const votingKey = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new VotingKeyDto(votingKey);
    }
    static createEmpty() {
        return new VotingKeyDto(Buffer.alloc(32));
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.votingKey;
    }
}
exports.VotingKeyDto = VotingKeyDto;
//# sourceMappingURL=VotingKeyDto.js.map
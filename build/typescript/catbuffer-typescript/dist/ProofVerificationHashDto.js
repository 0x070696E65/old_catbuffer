"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofVerificationHashDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class ProofVerificationHashDto {
    constructor(proofVerificationHash) {
        this.proofVerificationHash = proofVerificationHash;
    }
    static loadFromBinary(payload) {
        const proofVerificationHash = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 16);
        return new ProofVerificationHashDto(proofVerificationHash);
    }
    static createEmpty() {
        return new ProofVerificationHashDto(Buffer.alloc(16));
    }
    get size() {
        return 16;
    }
    serialize() {
        return this.proofVerificationHash;
    }
}
exports.ProofVerificationHashDto = ProofVerificationHashDto;
//# sourceMappingURL=ProofVerificationHashDto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class SignatureDto {
    constructor(signature) {
        this.signature = signature;
    }
    static loadFromBinary(payload) {
        const signature = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 64);
        return new SignatureDto(signature);
    }
    static createEmpty() {
        return new SignatureDto(Buffer.alloc(64));
    }
    get size() {
        return 64;
    }
    serialize() {
        return this.signature;
    }
}
exports.SignatureDto = SignatureDto;
//# sourceMappingURL=SignatureDto.js.map
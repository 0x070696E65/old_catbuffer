"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash256Dto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class Hash256Dto {
    constructor(hash256) {
        this.hash256 = hash256;
    }
    static loadFromBinary(payload) {
        const hash256 = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new Hash256Dto(hash256);
    }
    static createEmpty() {
        return new Hash256Dto(Buffer.alloc(32));
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.hash256;
    }
}
exports.Hash256Dto = Hash256Dto;
//# sourceMappingURL=Hash256Dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash512Dto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class Hash512Dto {
    constructor(hash512) {
        this.hash512 = hash512;
    }
    static loadFromBinary(payload) {
        const hash512 = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 64);
        return new Hash512Dto(hash512);
    }
    static createEmpty() {
        return new Hash512Dto(Buffer.alloc(64));
    }
    get size() {
        return 64;
    }
    serialize() {
        return this.hash512;
    }
}
exports.Hash512Dto = Hash512Dto;
//# sourceMappingURL=Hash512Dto.js.map
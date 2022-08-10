"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class KeyDto {
    constructor(key) {
        this.key = key;
    }
    static loadFromBinary(payload) {
        const key = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 32);
        return new KeyDto(key);
    }
    static createEmpty() {
        return new KeyDto(Buffer.alloc(32));
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.key;
    }
}
exports.KeyDto = KeyDto;
//# sourceMappingURL=KeyDto.js.map
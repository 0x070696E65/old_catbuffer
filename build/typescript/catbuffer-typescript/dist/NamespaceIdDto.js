"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceIdDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class NamespaceIdDto {
    constructor(namespaceId) {
        this.namespaceId = namespaceId;
    }
    static loadFromBinary(payload) {
        const namespaceId = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(payload));
        return new NamespaceIdDto(namespaceId);
    }
    static createEmpty() {
        return new NamespaceIdDto(BigInt(0));
    }
    get size() {
        return 8;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.namespaceId);
    }
}
exports.NamespaceIdDto = NamespaceIdDto;
//# sourceMappingURL=NamespaceIdDto.js.map
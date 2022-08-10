"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class AddressDto {
    constructor(address) {
        this.address = address;
    }
    static loadFromBinary(payload) {
        const address = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 24);
        return new AddressDto(address);
    }
    static createEmpty() {
        return new AddressDto(Buffer.alloc(24));
    }
    get size() {
        return 24;
    }
    serialize() {
        return this.address;
    }
}
exports.AddressDto = AddressDto;
//# sourceMappingURL=AddressDto.js.map
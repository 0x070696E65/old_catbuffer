"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceLifetimeBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightDto_1 = require("./HeightDto");
class NamespaceLifetimeBuilder {
    constructor({ lifetimeStart, lifetimeEnd }) {
        GeneratorUtils_1.GeneratorUtils.notNull(lifetimeStart, 'lifetimeStart is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(lifetimeEnd, 'lifetimeEnd is null or undefined');
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const lifetimeStart = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.size);
        const lifetimeEnd = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.size);
        return new NamespaceLifetimeBuilder({ lifetimeStart: lifetimeStart, lifetimeEnd: lifetimeEnd });
    }
    static createNamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd) {
        return new NamespaceLifetimeBuilder({ lifetimeStart: lifetimeStart, lifetimeEnd: lifetimeEnd });
    }
    get size() {
        let size = 0;
        size += this.lifetimeStart.size;
        size += this.lifetimeEnd.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeStartBytes);
        const lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    }
}
exports.NamespaceLifetimeBuilder = NamespaceLifetimeBuilder;
//# sourceMappingURL=NamespaceLifetimeBuilder.js.map
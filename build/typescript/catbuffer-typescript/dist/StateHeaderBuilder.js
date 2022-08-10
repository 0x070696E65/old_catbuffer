"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateHeaderBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class StateHeaderBuilder {
    constructor({ version }) {
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        this.version = version;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        return new StateHeaderBuilder({ version: version });
    }
    static createStateHeaderBuilder(version) {
        return new StateHeaderBuilder({ version: version });
    }
    get size() {
        let size = 0;
        size += 2;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.version);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        return newArray;
    }
}
exports.StateHeaderBuilder = StateHeaderBuilder;
//# sourceMappingURL=StateHeaderBuilder.js.map
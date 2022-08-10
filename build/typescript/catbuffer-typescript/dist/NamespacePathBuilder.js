"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespacePathBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceAliasBuilder_1 = require("./NamespaceAliasBuilder");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
class NamespacePathBuilder {
    constructor({ path, alias }) {
        GeneratorUtils_1.GeneratorUtils.notNull(path, 'path is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(alias, 'alias is null or undefined');
        this.path = path;
        this.alias = alias;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const pathSize = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const path = GeneratorUtils_1.GeneratorUtils.loadFromBinary(NamespaceIdDto_1.NamespaceIdDto.loadFromBinary, Uint8Array.from(byteArray), pathSize);
        byteArray.splice(0, path.reduce((sum, c) => sum + c.size, 0));
        const alias = NamespaceAliasBuilder_1.NamespaceAliasBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, alias.size);
        return new NamespacePathBuilder({ path: path, alias: alias });
    }
    static createNamespacePathBuilder(path, alias) {
        return new NamespacePathBuilder({ path: path, alias: alias });
    }
    get size() {
        let size = 0;
        size += 1;
        size += this.path.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        size += this.alias.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const pathSizeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.path.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathSizeBytes);
        const pathBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.path, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathBytes);
        const aliasBytes = this.alias.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasBytes);
        return newArray;
    }
}
exports.NamespacePathBuilder = NamespacePathBuilder;
//# sourceMappingURL=NamespacePathBuilder.js.map
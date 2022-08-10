"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootNamespaceHistoryBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceAliasBuilder_1 = require("./NamespaceAliasBuilder");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const NamespaceLifetimeBuilder_1 = require("./NamespaceLifetimeBuilder");
const NamespacePathBuilder_1 = require("./NamespacePathBuilder");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class RootNamespaceHistoryBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor({ version, id, ownerAddress, lifetime, rootAlias, paths }) {
        super({ version });
        GeneratorUtils_1.GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(lifetime, 'lifetime is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(rootAlias, 'rootAlias is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(paths, 'paths is null or undefined');
        this.id = id;
        this.ownerAddress = ownerAddress;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const id = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const ownerAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const lifetime = NamespaceLifetimeBuilder_1.NamespaceLifetimeBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetime.size);
        const rootAlias = NamespaceAliasBuilder_1.NamespaceAliasBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, rootAlias.size);
        const childrenCount = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const paths = GeneratorUtils_1.GeneratorUtils.loadFromBinary(NamespacePathBuilder_1.NamespacePathBuilder.loadFromBinary, Uint8Array.from(byteArray), childrenCount);
        byteArray.splice(0, paths.reduce((sum, c) => sum + c.size, 0));
        return new RootNamespaceHistoryBuilder({
            version: superObject.version,
            id: id,
            ownerAddress: ownerAddress,
            lifetime: lifetime,
            rootAlias: rootAlias,
            paths: paths,
        });
    }
    static createRootNamespaceHistoryBuilder(version, id, ownerAddress, lifetime, rootAlias, paths) {
        return new RootNamespaceHistoryBuilder({
            version: version,
            id: id,
            ownerAddress: ownerAddress,
            lifetime: lifetime,
            rootAlias: rootAlias,
            paths: paths,
        });
    }
    get size() {
        let size = super.size;
        size += this.id.size;
        size += this.ownerAddress.size;
        size += this.lifetime.size;
        size += this.rootAlias.size;
        size += 8;
        size += this.paths.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const lifetimeBytes = this.lifetime.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeBytes);
        const rootAliasBytes = this.rootAlias.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rootAliasBytes);
        const childrenCountBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.paths.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, childrenCountBytes);
        const pathsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.paths, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathsBytes);
        return newArray;
    }
}
exports.RootNamespaceHistoryBuilder = RootNamespaceHistoryBuilder;
//# sourceMappingURL=RootNamespaceHistoryBuilder.js.map
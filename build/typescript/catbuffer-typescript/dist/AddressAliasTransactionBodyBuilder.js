"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressAliasTransactionBodyBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
class AddressAliasTransactionBodyBuilder {
    constructor({ namespaceId, address, aliasAction }) {
        GeneratorUtils_1.GeneratorUtils.notNull(namespaceId, 'namespaceId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(aliasAction, 'aliasAction is null or undefined');
        this.namespaceId = namespaceId;
        this.address = address;
        this.aliasAction = aliasAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.size);
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const aliasAction = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new AddressAliasTransactionBodyBuilder({ namespaceId: namespaceId, address: address, aliasAction: aliasAction });
    }
    static createAddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction) {
        return new AddressAliasTransactionBodyBuilder({ namespaceId: namespaceId, address: address, aliasAction: aliasAction });
    }
    get size() {
        let size = 0;
        size += this.namespaceId.size;
        size += this.address.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const aliasActionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.aliasAction);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
exports.AddressAliasTransactionBodyBuilder = AddressAliasTransactionBodyBuilder;
//# sourceMappingURL=AddressAliasTransactionBodyBuilder.js.map
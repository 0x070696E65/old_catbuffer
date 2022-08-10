"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressResolutionStatementBuilder = void 0;
const AddressResolutionEntryBuilder_1 = require("./AddressResolutionEntryBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class AddressResolutionStatementBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor({ version, type, unresolved, resolutionEntries }) {
        super({ version, type });
        GeneratorUtils_1.GeneratorUtils.notNull(unresolved, 'unresolved is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(resolutionEntries, 'resolutionEntries is null or undefined');
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const unresolved = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.size);
        const resolutionEntries = GeneratorUtils_1.GeneratorUtils.loadFromBinaryRemaining(AddressResolutionEntryBuilder_1.AddressResolutionEntryBuilder.loadFromBinary, Uint8Array.from(byteArray), byteArray.length, 0);
        byteArray.splice(0, resolutionEntries.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0));
        return new AddressResolutionStatementBuilder({
            version: superObject.version,
            type: superObject.type,
            unresolved: unresolved,
            resolutionEntries: resolutionEntries,
        });
    }
    static createAddressResolutionStatementBuilder(version, type, unresolved, resolutionEntries) {
        return new AddressResolutionStatementBuilder({
            version: version,
            type: type,
            unresolved: unresolved,
            resolutionEntries: resolutionEntries,
        });
    }
    get size() {
        let size = super.size;
        size += this.unresolved.size;
        size += this.resolutionEntries.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        const resolutionEntriesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.resolutionEntries, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        return newArray;
    }
}
exports.AddressResolutionStatementBuilder = AddressResolutionStatementBuilder;
//# sourceMappingURL=AddressResolutionStatementBuilder.js.map
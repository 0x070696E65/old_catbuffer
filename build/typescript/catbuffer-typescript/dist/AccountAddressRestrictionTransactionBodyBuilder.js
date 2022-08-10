"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAddressRestrictionTransactionBodyBuilder = void 0;
const AccountRestrictionFlagsDto_1 = require("./AccountRestrictionFlagsDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class AccountAddressRestrictionTransactionBodyBuilder {
    constructor({ restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionFlags, 'restrictionFlags is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionAdditions, 'restrictionAdditions is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionDeletions, 'restrictionDeletions is null or undefined');
        this.restrictionFlags = restrictionFlags;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = GeneratorUtils_1.GeneratorUtils.toFlags(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto, GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray)));
        byteArray.splice(0, 2);
        const restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const restrictionAdditions = GeneratorUtils_1.GeneratorUtils.loadFromBinary(UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary, Uint8Array.from(byteArray), restrictionAdditionsCount);
        byteArray.splice(0, restrictionAdditions.reduce((sum, c) => sum + c.size, 0));
        const restrictionDeletions = GeneratorUtils_1.GeneratorUtils.loadFromBinary(UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary, Uint8Array.from(byteArray), restrictionDeletionsCount);
        byteArray.splice(0, restrictionDeletions.reduce((sum, c) => sum + c.size, 0));
        return new AccountAddressRestrictionTransactionBodyBuilder({
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }
    static createAccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        return new AccountAddressRestrictionTransactionBodyBuilder({
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }
    get size() {
        let size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        size += this.restrictionAdditions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        size += this.restrictionDeletions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(GeneratorUtils_1.GeneratorUtils.fromFlags(AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto, this.restrictionFlags));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.restrictionAdditions.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.restrictionDeletions.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        const restrictionAdditionsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.restrictionAdditions, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        const restrictionDeletionsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.restrictionDeletions, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        return newArray;
    }
}
exports.AccountAddressRestrictionTransactionBodyBuilder = AccountAddressRestrictionTransactionBodyBuilder;
//# sourceMappingURL=AccountAddressRestrictionTransactionBodyBuilder.js.map
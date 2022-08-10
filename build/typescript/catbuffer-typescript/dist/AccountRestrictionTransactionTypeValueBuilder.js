"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionTransactionTypeValueBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionTransactionTypeValueBuilder {
    constructor({ restrictionValues }) {
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionValues, 'restrictionValues is null or undefined');
        this.restrictionValues = restrictionValues;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues = GeneratorUtils_1.GeneratorUtils.loadFromBinaryEnums(Uint8Array.from(byteArray), restrictionValuesCount, 2);
        byteArray.splice(0, restrictionValues.reduce((sum) => sum + 2, 0));
        return new AccountRestrictionTransactionTypeValueBuilder({ restrictionValues: restrictionValues });
    }
    static createAccountRestrictionTransactionTypeValueBuilder(restrictionValues) {
        return new AccountRestrictionTransactionTypeValueBuilder({ restrictionValues: restrictionValues });
    }
    get size() {
        let size = 0;
        size += 8;
        size += this.restrictionValues.reduce((sum) => sum + 2, 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.restrictionValues.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        const restrictionValuesBytes = GeneratorUtils_1.GeneratorUtils.writeListEnum(this.restrictionValues, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}
exports.AccountRestrictionTransactionTypeValueBuilder = AccountRestrictionTransactionTypeValueBuilder;
//# sourceMappingURL=AccountRestrictionTransactionTypeValueBuilder.js.map
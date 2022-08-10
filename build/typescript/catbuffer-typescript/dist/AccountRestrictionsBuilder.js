"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionsBuilder = void 0;
const AccountRestrictionsInfoBuilder_1 = require("./AccountRestrictionsInfoBuilder");
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class AccountRestrictionsBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor({ version, address, restrictions }) {
        super({ version });
        GeneratorUtils_1.GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictions, 'restrictions is null or undefined');
        this.address = address;
        this.restrictions = restrictions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const restrictionsCount = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictions = GeneratorUtils_1.GeneratorUtils.loadFromBinary(AccountRestrictionsInfoBuilder_1.AccountRestrictionsInfoBuilder.loadFromBinary, Uint8Array.from(byteArray), restrictionsCount);
        byteArray.splice(0, restrictions.reduce((sum, c) => sum + c.size, 0));
        return new AccountRestrictionsBuilder({ version: superObject.version, address: address, restrictions: restrictions });
    }
    static createAccountRestrictionsBuilder(version, address, restrictions) {
        return new AccountRestrictionsBuilder({ version: version, address: address, restrictions: restrictions });
    }
    get size() {
        let size = super.size;
        size += this.address.size;
        size += 8;
        size += this.restrictions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const restrictionsCountBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.restrictions.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionsCountBytes);
        const restrictionsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.restrictions, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionsBytes);
        return newArray;
    }
}
exports.AccountRestrictionsBuilder = AccountRestrictionsBuilder;
//# sourceMappingURL=AccountRestrictionsBuilder.js.map
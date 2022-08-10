"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const hexString = "FA8EC085AE64CF30E44ADD18A3133D9B2190F9A20C08667A5EF44E5E9962E720FA8EC085AE64CF30E44ADD18A3133D9B2190F9A20C08667A5EF44E5E9962E720";
const hex = Uint8Array.from(Buffer.from(hexString, 'hex'));
const byteArray = Array.from(hex);
const a = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(hex);
const restrictionAdditions = GeneratorUtils_1.GeneratorUtils.loadFromBinary(UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary, Uint8Array.from(byteArray), 2);
function size(restrictionAdditions) {
    let size = 0;
    size += 2;
    size += 1;
    size += 1;
    size += 4;
    console.log(restrictionAdditions);
    console.log(Buffer.from(restrictionAdditions).toString('hex'));
    size += restrictionAdditions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
    return size;
}
console.log(size(restrictionAdditions));
//# sourceMappingURL=main.js.map
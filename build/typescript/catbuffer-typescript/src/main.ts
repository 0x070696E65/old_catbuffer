//import { AccountAddressRestrictionTransactionBuilder } from './AccountAddressRestrictionTransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { GeneratorUtils } from './GeneratorUtils';
//const payload = Uint8Array.from([-6, -114, -64, -123, -82, 100, -49, 48 ,-28 ,74 ,-35 ,24 ,-93 ,19 ,61 ,-101 ,33 ,-112 ,-7 ,-94, 12, 8, 102, 122, 94, -12, 78, 94, -103, 98, -25, 32]);
const hexString = "FA8EC085AE64CF30E44ADD18A3133D9B2190F9A20C08667A5EF44E5E9962E720FA8EC085AE64CF30E44ADD18A3133D9B2190F9A20C08667A5EF44E5E9962E720";
const hex = Uint8Array.from(Buffer.from(hexString, 'hex'));//const accountAddressRestrictionTransactionBuilder: AccountAddressRestrictionTransactionBuilder = AccountAddressRestrictionTransactionBuilder.loadFromBinary(payload)
const byteArray = Array.from(hex);
const a = UnresolvedAddressDto.loadFromBinary(hex);
const restrictionAdditions: UnresolvedAddressDto[] = GeneratorUtils.loadFromBinary(
    UnresolvedAddressDto.loadFromBinary,
    Uint8Array.from(byteArray),
    2,
);
function size(restrictionAdditions: UnresolvedAddressDto[]): number {
    let size = 0;
    size += 2; // restrictionFlags
    size += 1; // restrictionAdditionsCount
    size += 1; // restrictionDeletionsCount
    size += 4; // accountRestrictionTransactionBody_Reserved1
    console.log(restrictionAdditions);
    console.log(Buffer.from(restrictionAdditions).toString('hex'));
    size += restrictionAdditions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // restrictionAdditions
    return size;
}
console.log(size(restrictionAdditions));

//console.log(Buffer.from(restrictionAdditions).toString('hex'));

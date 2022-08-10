"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigAccountModificationTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class MultisigAccountModificationTransactionBodyBuilder {
    constructor({ minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }) {
        GeneratorUtils_1.GeneratorUtils.notNull(minRemovalDelta, 'minRemovalDelta is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(minApprovalDelta, 'minApprovalDelta is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(addressAdditions, 'addressAdditions is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(addressDeletions, 'addressDeletions is null or undefined');
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const minRemovalDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const minApprovalDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressAdditions = GeneratorUtils_1.GeneratorUtils.loadFromBinary(UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary, Uint8Array.from(byteArray), addressAdditionsCount);
        byteArray.splice(0, addressAdditions.reduce((sum, c) => sum + c.size, 0));
        const addressDeletions = GeneratorUtils_1.GeneratorUtils.loadFromBinary(UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary, Uint8Array.from(byteArray), addressDeletionsCount);
        byteArray.splice(0, addressDeletions.reduce((sum, c) => sum + c.size, 0));
        return new MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
        });
    }
    static createMultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions) {
        return new MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
        });
    }
    get size() {
        let size = 0;
        size += 1;
        size += 1;
        size += 1;
        size += 1;
        size += 4;
        size += this.addressAdditions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        size += this.addressDeletions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const minRemovalDeltaBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.minRemovalDelta);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        const minApprovalDeltaBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.minApprovalDelta);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        const addressAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.addressAdditions.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAdditionsCountBytes);
        const addressDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.addressDeletions.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressDeletionsCountBytes);
        const multisigAccountModificationTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBody_Reserved1Bytes);
        const addressAdditionsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.addressAdditions, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAdditionsBytes);
        const addressDeletionsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.addressDeletions, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressDeletionsBytes);
        return newArray;
    }
}
exports.MultisigAccountModificationTransactionBodyBuilder = MultisigAccountModificationTransactionBodyBuilder;
//# sourceMappingURL=MultisigAccountModificationTransactionBodyBuilder.js.map
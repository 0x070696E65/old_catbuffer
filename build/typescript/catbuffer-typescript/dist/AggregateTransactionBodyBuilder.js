"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateTransactionBodyBuilder = void 0;
const CosignatureBuilder_1 = require("./CosignatureBuilder");
const EmbeddedTransactionHelper_1 = require("./EmbeddedTransactionHelper");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
class AggregateTransactionBodyBuilder {
    constructor({ transactionsHash, transactions, cosignatures }) {
        GeneratorUtils_1.GeneratorUtils.notNull(transactionsHash, 'transactionsHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(transactions, 'transactions is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(cosignatures, 'cosignatures is null or undefined');
        this.transactionsHash = transactionsHash;
        this.transactions = transactions;
        this.cosignatures = cosignatures;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.size);
        const payloadSize = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const transactions = GeneratorUtils_1.GeneratorUtils.loadFromBinaryRemaining(EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.loadFromBinary, Uint8Array.from(byteArray), payloadSize, 8);
        byteArray.splice(0, transactions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 8), 0));
        const cosignatures = GeneratorUtils_1.GeneratorUtils.loadFromBinaryRemaining(CosignatureBuilder_1.CosignatureBuilder.loadFromBinary, Uint8Array.from(byteArray), byteArray.length, 0);
        byteArray.splice(0, cosignatures.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0));
        return new AggregateTransactionBodyBuilder({
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }
    static createAggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures) {
        return new AggregateTransactionBodyBuilder({
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }
    get size() {
        let size = 0;
        size += this.transactionsHash.size;
        size += 4;
        size += 4;
        size += this.transactions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 8), 0);
        size += this.cosignatures.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const payloadSize = this.transactions.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 8), 0);
        const payloadSizeBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(payloadSize);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, payloadSizeBytes);
        const aggregateTransactionHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionHeader_Reserved1Bytes);
        const transactionsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.transactions, 8);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsBytes);
        const cosignaturesBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.cosignatures, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignaturesBytes);
        return newArray;
    }
}
exports.AggregateTransactionBodyBuilder = AggregateTransactionBodyBuilder;
//# sourceMappingURL=AggregateTransactionBodyBuilder.js.map
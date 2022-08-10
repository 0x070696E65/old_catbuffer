"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceBlockFooterBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
class ImportanceBlockFooterBuilder {
    constructor({ votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash, }) {
        GeneratorUtils_1.GeneratorUtils.notNull(votingEligibleAccountsCount, 'votingEligibleAccountsCount is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(harvestingEligibleAccountsCount, 'harvestingEligibleAccountsCount is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(totalVotingBalance, 'totalVotingBalance is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(previousImportanceBlockHash, 'previousImportanceBlockHash is null or undefined');
        this.votingEligibleAccountsCount = votingEligibleAccountsCount;
        this.harvestingEligibleAccountsCount = harvestingEligibleAccountsCount;
        this.totalVotingBalance = totalVotingBalance;
        this.previousImportanceBlockHash = previousImportanceBlockHash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const votingEligibleAccountsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const harvestingEligibleAccountsCount = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const totalVotingBalance = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalVotingBalance.size);
        const previousImportanceBlockHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousImportanceBlockHash.size);
        return new ImportanceBlockFooterBuilder({
            votingEligibleAccountsCount: votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: harvestingEligibleAccountsCount,
            totalVotingBalance: totalVotingBalance,
            previousImportanceBlockHash: previousImportanceBlockHash,
        });
    }
    static createImportanceBlockFooterBuilder(votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash) {
        return new ImportanceBlockFooterBuilder({
            votingEligibleAccountsCount: votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: harvestingEligibleAccountsCount,
            totalVotingBalance: totalVotingBalance,
            previousImportanceBlockHash: previousImportanceBlockHash,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 8;
        size += this.totalVotingBalance.size;
        size += this.previousImportanceBlockHash.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const votingEligibleAccountsCountBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.votingEligibleAccountsCount);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingEligibleAccountsCountBytes);
        const harvestingEligibleAccountsCountBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.harvestingEligibleAccountsCount);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, harvestingEligibleAccountsCountBytes);
        const totalVotingBalanceBytes = this.totalVotingBalance.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, totalVotingBalanceBytes);
        const previousImportanceBlockHashBytes = this.previousImportanceBlockHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousImportanceBlockHashBytes);
        return newArray;
    }
}
exports.ImportanceBlockFooterBuilder = ImportanceBlockFooterBuilder;
//# sourceMappingURL=ImportanceBlockFooterBuilder.js.map
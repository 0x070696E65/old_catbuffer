"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceBlockHeaderBuilder = void 0;
const BlockHeaderBuilder_1 = require("./BlockHeaderBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceBlockFooterBuilder_1 = require("./ImportanceBlockFooterBuilder");
class ImportanceBlockHeaderBuilder extends BlockHeaderBuilder_1.BlockHeaderBuilder {
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash, }) {
        super({
            signature,
            signerPublicKey,
            version,
            network,
            type,
            height,
            timestamp,
            difficulty,
            generationHashProof,
            previousBlockHash,
            transactionsHash,
            receiptsHash,
            stateHash,
            beneficiaryAddress,
            feeMultiplier,
        });
        this.importanceBlockFooter = new ImportanceBlockFooterBuilder_1.ImportanceBlockFooterBuilder({
            votingEligibleAccountsCount,
            harvestingEligibleAccountsCount,
            totalVotingBalance,
            previousImportanceBlockHash,
        });
        if (version !== ImportanceBlockHeaderBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + ImportanceBlockHeaderBuilder.VERSION);
        if (type !== ImportanceBlockHeaderBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + ImportanceBlockHeaderBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder_1.BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const importanceBlockFooter = ImportanceBlockFooterBuilder_1.ImportanceBlockFooterBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importanceBlockFooter.size);
        return new ImportanceBlockHeaderBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            height: superObject.height,
            timestamp: superObject.timestamp,
            difficulty: superObject.difficulty,
            generationHashProof: superObject.generationHashProof,
            previousBlockHash: superObject.previousBlockHash,
            transactionsHash: superObject.transactionsHash,
            receiptsHash: superObject.receiptsHash,
            stateHash: superObject.stateHash,
            beneficiaryAddress: superObject.beneficiaryAddress,
            feeMultiplier: superObject.feeMultiplier,
            votingEligibleAccountsCount: importanceBlockFooter.votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: importanceBlockFooter.harvestingEligibleAccountsCount,
            totalVotingBalance: importanceBlockFooter.totalVotingBalance,
            previousImportanceBlockHash: importanceBlockFooter.previousImportanceBlockHash,
        });
    }
    static createImportanceBlockHeaderBuilder(signature, signerPublicKey, network, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash) {
        const version = ImportanceBlockHeaderBuilder.VERSION;
        const type = ImportanceBlockHeaderBuilder.ENTITY_TYPE;
        return new ImportanceBlockHeaderBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            height: height,
            timestamp: timestamp,
            difficulty: difficulty,
            generationHashProof: generationHashProof,
            previousBlockHash: previousBlockHash,
            transactionsHash: transactionsHash,
            receiptsHash: receiptsHash,
            stateHash: stateHash,
            beneficiaryAddress: beneficiaryAddress,
            feeMultiplier: feeMultiplier,
            votingEligibleAccountsCount: votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: harvestingEligibleAccountsCount,
            totalVotingBalance: totalVotingBalance,
            previousImportanceBlockHash: previousImportanceBlockHash,
        });
    }
    get votingEligibleAccountsCount() {
        return this.importanceBlockFooter.votingEligibleAccountsCount;
    }
    get harvestingEligibleAccountsCount() {
        return this.importanceBlockFooter.harvestingEligibleAccountsCount;
    }
    get totalVotingBalance() {
        return this.importanceBlockFooter.totalVotingBalance;
    }
    get previousImportanceBlockHash() {
        return this.importanceBlockFooter.previousImportanceBlockHash;
    }
    get size() {
        let size = super.size;
        size += this.importanceBlockFooter.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const importanceBlockFooterBytes = this.importanceBlockFooter.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBlockFooterBytes);
        return newArray;
    }
}
exports.ImportanceBlockHeaderBuilder = ImportanceBlockHeaderBuilder;
ImportanceBlockHeaderBuilder.VERSION = 1;
ImportanceBlockHeaderBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.IMPORTANCE_BLOCK_HEADER;
//# sourceMappingURL=ImportanceBlockHeaderBuilder.js.map
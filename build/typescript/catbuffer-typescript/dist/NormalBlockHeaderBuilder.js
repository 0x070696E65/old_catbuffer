"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalBlockHeaderBuilder = void 0;
const BlockHeaderBuilder_1 = require("./BlockHeaderBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class NormalBlockHeaderBuilder extends BlockHeaderBuilder_1.BlockHeaderBuilder {
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, }) {
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
        if (version !== NormalBlockHeaderBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + NormalBlockHeaderBuilder.VERSION);
        if (type !== NormalBlockHeaderBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + NormalBlockHeaderBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder_1.BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new NormalBlockHeaderBuilder({
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
        });
    }
    static createNormalBlockHeaderBuilder(signature, signerPublicKey, network, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier) {
        const version = NormalBlockHeaderBuilder.VERSION;
        const type = NormalBlockHeaderBuilder.ENTITY_TYPE;
        return new NormalBlockHeaderBuilder({
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
        });
    }
    get size() {
        let size = super.size;
        size += 4;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const blockHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockHeader_Reserved1Bytes);
        return newArray;
    }
}
exports.NormalBlockHeaderBuilder = NormalBlockHeaderBuilder;
NormalBlockHeaderBuilder.VERSION = 1;
NormalBlockHeaderBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.NORMAL_BLOCK_HEADER;
//# sourceMappingURL=NormalBlockHeaderBuilder.js.map
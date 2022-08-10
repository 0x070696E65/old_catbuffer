"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHeaderBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const BlockFeeMultiplierDto_1 = require("./BlockFeeMultiplierDto");
const DifficultyDto_1 = require("./DifficultyDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const KeyDto_1 = require("./KeyDto");
const SignatureDto_1 = require("./SignatureDto");
const TimestampDto_1 = require("./TimestampDto");
const VrfProofBuilder_1 = require("./VrfProofBuilder");
class BlockHeaderBuilder {
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, }) {
        GeneratorUtils_1.GeneratorUtils.notNull(signature, 'signature is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(type, 'type is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(height, 'height is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(timestamp, 'timestamp is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(difficulty, 'difficulty is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(generationHashProof, 'generationHashProof is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(previousBlockHash, 'previousBlockHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(transactionsHash, 'transactionsHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(receiptsHash, 'receiptsHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(stateHash, 'stateHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(beneficiaryAddress, 'beneficiaryAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(feeMultiplier, 'feeMultiplier is null or undefined');
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.height = height;
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.generationHashProof = generationHashProof;
        this.previousBlockHash = previousBlockHash;
        this.transactionsHash = transactionsHash;
        this.receiptsHash = receiptsHash;
        this.stateHash = stateHash;
        this.beneficiaryAddress = beneficiaryAddress;
        this.feeMultiplier = feeMultiplier;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
        const signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const height = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        const timestamp = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, timestamp.size);
        const difficulty = DifficultyDto_1.DifficultyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, difficulty.size);
        const generationHashProof = VrfProofBuilder_1.VrfProofBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, generationHashProof.size);
        const previousBlockHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousBlockHash.size);
        const transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.size);
        const receiptsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, receiptsHash.size);
        const stateHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, stateHash.size);
        const beneficiaryAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, beneficiaryAddress.size);
        const feeMultiplier = BlockFeeMultiplierDto_1.BlockFeeMultiplierDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, feeMultiplier.size);
        return new BlockHeaderBuilder({
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
    static createBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier) {
        return new BlockHeaderBuilder({
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
        let size = 0;
        size += 4;
        size += 4;
        size += this.signature.size;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.height.size;
        size += this.timestamp.size;
        size += this.difficulty.size;
        size += this.generationHashProof.size;
        size += this.previousBlockHash.size;
        size += this.transactionsHash.size;
        size += this.receiptsHash.size;
        size += this.stateHash.size;
        size += this.beneficiaryAddress.size;
        size += this.feeMultiplier.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.size);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeader_Reserved1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.version);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.network);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        const timestampBytes = this.timestamp.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        const difficultyBytes = this.difficulty.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        const generationHashProofBytes = this.generationHashProof.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, generationHashProofBytes);
        const previousBlockHashBytes = this.previousBlockHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousBlockHashBytes);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const receiptsHashBytes = this.receiptsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, receiptsHashBytes);
        const stateHashBytes = this.stateHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, stateHashBytes);
        const beneficiaryAddressBytes = this.beneficiaryAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryAddressBytes);
        const feeMultiplierBytes = this.feeMultiplier.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeMultiplierBytes);
        return newArray;
    }
}
exports.BlockHeaderBuilder = BlockHeaderBuilder;
//# sourceMappingURL=BlockHeaderBuilder.js.map
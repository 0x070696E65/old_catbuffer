"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLockTransactionBodyBuilder = void 0;
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class SecretLockTransactionBodyBuilder {
    constructor({ recipientAddress, secret, mosaic, duration, hashAlgorithm }) {
        GeneratorUtils_1.GeneratorUtils.notNull(recipientAddress, 'recipientAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(secret, 'secret is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(duration, 'duration is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hashAlgorithm, 'hashAlgorithm is null or undefined');
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.mosaic = mosaic;
        this.duration = duration;
        this.hashAlgorithm = hashAlgorithm;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.size);
        const mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new SecretLockTransactionBodyBuilder({
            recipientAddress: recipientAddress,
            secret: secret,
            mosaic: mosaic,
            duration: duration,
            hashAlgorithm: hashAlgorithm,
        });
    }
    static createSecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        return new SecretLockTransactionBodyBuilder({
            recipientAddress: recipientAddress,
            secret: secret,
            mosaic: mosaic,
            duration: duration,
            hashAlgorithm: hashAlgorithm,
        });
    }
    get size() {
        let size = 0;
        size += this.recipientAddress.size;
        size += this.secret.size;
        size += this.mosaic.size;
        size += this.duration.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.hashAlgorithm);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        return newArray;
    }
}
exports.SecretLockTransactionBodyBuilder = SecretLockTransactionBodyBuilder;
//# sourceMappingURL=SecretLockTransactionBodyBuilder.js.map
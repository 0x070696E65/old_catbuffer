"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLockInfoBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class HashLockInfoBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor({ version, ownerAddress, mosaic, endHeight, status, hash }) {
        super({ version });
        GeneratorUtils_1.GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endHeight, 'endHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(status, 'status is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hash = hash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const ownerAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const endHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.size);
        const status = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new HashLockInfoBuilder({
            version: superObject.version,
            ownerAddress: ownerAddress,
            mosaic: mosaic,
            endHeight: endHeight,
            status: status,
            hash: hash,
        });
    }
    static createHashLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hash) {
        return new HashLockInfoBuilder({
            version: version,
            ownerAddress: ownerAddress,
            mosaic: mosaic,
            endHeight: endHeight,
            status: status,
            hash: hash,
        });
    }
    get size() {
        let size = super.size;
        size += this.ownerAddress.size;
        size += this.mosaic.size;
        size += this.endHeight.size;
        size += 1;
        size += this.hash.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.status);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.HashLockInfoBuilder = HashLockInfoBuilder;
//# sourceMappingURL=HashLockInfoBuilder.js.map
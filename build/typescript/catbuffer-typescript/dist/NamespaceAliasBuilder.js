"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceAliasBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const NamespaceAliasTypeDto_1 = require("./NamespaceAliasTypeDto");
class NamespaceAliasBuilder {
    constructor({ namespaceAliasType, mosaicAlias, addressAlias }) {
        GeneratorUtils_1.GeneratorUtils.notNull(namespaceAliasType, 'namespaceAliasType is null or undefined');
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            GeneratorUtils_1.GeneratorUtils.notNull(mosaicAlias, 'mosaicAlias is null or undefined');
        }
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            GeneratorUtils_1.GeneratorUtils.notNull(addressAlias, 'addressAlias is null or undefined');
        }
        this.namespaceAliasType = namespaceAliasType;
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceAliasType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let mosaicAlias = undefined;
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            mosaicAlias = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicAlias.size);
        }
        let addressAlias = undefined;
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            addressAlias = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, addressAlias.size);
        }
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType, mosaicAlias: mosaicAlias, addressAlias: addressAlias });
    }
    static createNamespaceAliasBuilderNone() {
        const namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.NONE;
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType });
    }
    static createNamespaceAliasBuilderAddress(addressAlias) {
        const namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS;
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType, addressAlias: addressAlias });
    }
    static createNamespaceAliasBuilderMosaicId(mosaicAlias) {
        const namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID;
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType, mosaicAlias: mosaicAlias });
    }
    get size() {
        let size = 0;
        size += 1;
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            size += this.mosaicAlias.size;
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            size += this.addressAlias.size;
        }
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceAliasTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.namespaceAliasType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceAliasTypeBytes);
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            const mosaicAliasBytes = this.mosaicAlias.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasBytes);
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            const addressAliasBytes = this.addressAlias.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasBytes);
        }
        return newArray;
    }
}
exports.NamespaceAliasBuilder = NamespaceAliasBuilder;
//# sourceMappingURL=NamespaceAliasBuilder.js.map
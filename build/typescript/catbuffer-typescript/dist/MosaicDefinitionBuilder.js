"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicDefinitionBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightDto_1 = require("./HeightDto");
const MosaicPropertiesBuilder_1 = require("./MosaicPropertiesBuilder");
class MosaicDefinitionBuilder {
    constructor({ startHeight, ownerAddress, revision, properties }) {
        GeneratorUtils_1.GeneratorUtils.notNull(startHeight, 'startHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(revision, 'revision is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(properties, 'properties is null or undefined');
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.properties = properties;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const startHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const ownerAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const revision = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const properties = MosaicPropertiesBuilder_1.MosaicPropertiesBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.size);
        return new MosaicDefinitionBuilder({
            startHeight: startHeight,
            ownerAddress: ownerAddress,
            revision: revision,
            properties: properties,
        });
    }
    static createMosaicDefinitionBuilder(startHeight, ownerAddress, revision, properties) {
        return new MosaicDefinitionBuilder({
            startHeight: startHeight,
            ownerAddress: ownerAddress,
            revision: revision,
            properties: properties,
        });
    }
    get size() {
        let size = 0;
        size += this.startHeight.size;
        size += this.ownerAddress.size;
        size += 4;
        size += this.properties.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const revisionBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.revision);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, revisionBytes);
        const propertiesBytes = this.properties.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    }
}
exports.MosaicDefinitionBuilder = MosaicDefinitionBuilder;
//# sourceMappingURL=MosaicDefinitionBuilder.js.map
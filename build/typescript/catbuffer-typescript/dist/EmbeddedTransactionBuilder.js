"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type }) {
        GeneratorUtils_1.GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(type, 'type is null or undefined');
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
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
        return new EmbeddedTransactionBuilder({ signerPublicKey: signerPublicKey, version: version, network: network, type: type });
    }
    static createEmbeddedTransactionBuilder(signerPublicKey, version, network, type) {
        return new EmbeddedTransactionBuilder({ signerPublicKey: signerPublicKey, version: version, network: network, type: type });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        return size;
    }
    get body() {
        return undefined;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.size);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, embeddedTransactionHeader_Reserved1Bytes);
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
        return newArray;
    }
}
exports.EmbeddedTransactionBuilder = EmbeddedTransactionBuilder;
//# sourceMappingURL=EmbeddedTransactionBuilder.js.map
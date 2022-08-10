"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceRegistrationTransactionBodyBuilder = void 0;
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
class NamespaceRegistrationTransactionBodyBuilder {
    constructor({ duration, parentId, id, registrationType, name }) {
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            GeneratorUtils_1.GeneratorUtils.notNull(duration, 'duration is null or undefined');
        }
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            GeneratorUtils_1.GeneratorUtils.notNull(parentId, 'parentId is null or undefined');
        }
        GeneratorUtils_1.GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(registrationType, 'registrationType is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(name, 'name is null or undefined');
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.registrationType = registrationType;
        this.name = name;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const registrationTypeCondition = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const id = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const registrationType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const nameSize = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const name = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        let duration = undefined;
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            duration = new BlockDurationDto_1.BlockDurationDto(registrationTypeCondition);
        }
        let parentId = undefined;
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            parentId = new NamespaceIdDto_1.NamespaceIdDto(registrationTypeCondition);
        }
        return new NamespaceRegistrationTransactionBodyBuilder({
            duration: duration,
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }
    static createNamespaceRegistrationTransactionBodyBuilderRoot(duration, id, name) {
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBodyBuilder({
            duration: duration,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }
    static createNamespaceRegistrationTransactionBodyBuilderChild(parentId, id, name) {
        const registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBodyBuilder({
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }
    get size() {
        let size = 0;
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            size += this.duration.size;
        }
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            size += this.parentId.size;
        }
        size += this.id.size;
        size += 1;
        size += 1;
        size += this.name.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            const durationBytes = this.duration.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            const parentIdBytes = this.parentId.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, parentIdBytes);
        }
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const registrationTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.registrationType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, registrationTypeBytes);
        const nameSizeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.name.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nameSizeBytes);
        const nameBytes = this.name;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nameBytes);
        return newArray;
    }
}
exports.NamespaceRegistrationTransactionBodyBuilder = NamespaceRegistrationTransactionBodyBuilder;
//# sourceMappingURL=NamespaceRegistrationTransactionBodyBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizationRoundBuilder = void 0;
const FinalizationEpochDto_1 = require("./FinalizationEpochDto");
const FinalizationPointDto_1 = require("./FinalizationPointDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class FinalizationRoundBuilder {
    constructor({ epoch, point }) {
        GeneratorUtils_1.GeneratorUtils.notNull(epoch, 'epoch is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(point, 'point is null or undefined');
        this.epoch = epoch;
        this.point = point;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const epoch = FinalizationEpochDto_1.FinalizationEpochDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, epoch.size);
        const point = FinalizationPointDto_1.FinalizationPointDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, point.size);
        return new FinalizationRoundBuilder({ epoch: epoch, point: point });
    }
    static createFinalizationRoundBuilder(epoch, point) {
        return new FinalizationRoundBuilder({ epoch: epoch, point: point });
    }
    get size() {
        let size = 0;
        size += this.epoch.size;
        size += this.point.size;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const epochBytes = this.epoch.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, epochBytes);
        const pointBytes = this.point.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pointBytes);
        return newArray;
    }
}
exports.FinalizationRoundBuilder = FinalizationRoundBuilder;
//# sourceMappingURL=FinalizationRoundBuilder.js.map
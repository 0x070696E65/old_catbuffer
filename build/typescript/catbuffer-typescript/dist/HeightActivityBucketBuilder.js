"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightActivityBucketBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceHeightDto_1 = require("./ImportanceHeightDto");
class HeightActivityBucketBuilder {
    constructor({ startHeight, totalFeesPaid, beneficiaryCount, rawScore }) {
        GeneratorUtils_1.GeneratorUtils.notNull(startHeight, 'startHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(totalFeesPaid, 'totalFeesPaid is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(beneficiaryCount, 'beneficiaryCount is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(rawScore, 'rawScore is null or undefined');
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const startHeight = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const totalFeesPaid = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.size);
        const beneficiaryCount = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const rawScore = GeneratorUtils_1.GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new HeightActivityBucketBuilder({
            startHeight: startHeight,
            totalFeesPaid: totalFeesPaid,
            beneficiaryCount: beneficiaryCount,
            rawScore: rawScore,
        });
    }
    static createHeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore) {
        return new HeightActivityBucketBuilder({
            startHeight: startHeight,
            totalFeesPaid: totalFeesPaid,
            beneficiaryCount: beneficiaryCount,
            rawScore: rawScore,
        });
    }
    get size() {
        let size = 0;
        size += this.startHeight.size;
        size += this.totalFeesPaid.size;
        size += 4;
        size += 8;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, totalFeesPaidBytes);
        const beneficiaryCountBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.beneficiaryCount);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryCountBytes);
        const rawScoreBytes = GeneratorUtils_1.GeneratorUtils.bigIntToBuffer(this.rawScore);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    }
}
exports.HeightActivityBucketBuilder = HeightActivityBucketBuilder;
//# sourceMappingURL=HeightActivityBucketBuilder.js.map
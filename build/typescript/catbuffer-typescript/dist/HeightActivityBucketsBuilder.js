"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightActivityBucketsBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightActivityBucketBuilder_1 = require("./HeightActivityBucketBuilder");
class HeightActivityBucketsBuilder {
    constructor({ buckets }) {
        GeneratorUtils_1.GeneratorUtils.notNull(buckets, 'buckets is null or undefined');
        this.buckets = buckets;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const buckets = GeneratorUtils_1.GeneratorUtils.loadFromBinary(HeightActivityBucketBuilder_1.HeightActivityBucketBuilder.loadFromBinary, Uint8Array.from(byteArray), 5);
        byteArray.splice(0, buckets.reduce((sum, c) => sum + c.size, 0));
        return new HeightActivityBucketsBuilder({ buckets: buckets });
    }
    static createHeightActivityBucketsBuilder(buckets) {
        return new HeightActivityBucketsBuilder({ buckets: buckets });
    }
    get size() {
        let size = 0;
        size += this.buckets.reduce((sum, c) => sum + GeneratorUtils_1.GeneratorUtils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const bucketsBytes = GeneratorUtils_1.GeneratorUtils.writeList(this.buckets, 0);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, bucketsBytes);
        return newArray;
    }
}
exports.HeightActivityBucketsBuilder = HeightActivityBucketsBuilder;
//# sourceMappingURL=HeightActivityBucketsBuilder.js.map
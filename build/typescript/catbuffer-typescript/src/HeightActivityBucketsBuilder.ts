/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { GeneratorUtils } from './GeneratorUtils';
import { HeightActivityBucketBuilder } from './HeightActivityBucketBuilder';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of HeightActivityBucketsBuilder.
 */
export interface HeightActivityBucketsBuilderParams {
    /** Account activity buckets. **/
    buckets: HeightActivityBucketBuilder[];
}

/**
 * Account activity buckets
 **/
export class HeightActivityBucketsBuilder implements Serializer {
    /** Account activity buckets. **/
    public readonly buckets: HeightActivityBucketBuilder[];

    /**
     * Constructor.
     *
     * @param buckets Account activity buckets.
     */
    public constructor({ buckets }: HeightActivityBucketsBuilderParams) {
        GeneratorUtils.notNull(buckets, 'buckets is null or undefined');
        this.buckets = buckets;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): HeightActivityBucketsBuilder {
        const byteArray = Array.from(payload);
        const buckets: HeightActivityBucketBuilder[] = GeneratorUtils.loadFromBinary(
            HeightActivityBucketBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            5,
        );
        byteArray.splice(
            0,
            buckets.reduce((sum, c) => sum + c.size, 0),
        );
        return new HeightActivityBucketsBuilder({ buckets: buckets });
    }

    /**
     * Creates an instance of HeightActivityBucketsBuilder.
     *
     * @param buckets Account activity buckets.
     * @return Instance of HeightActivityBucketsBuilder.
     */
    public static createHeightActivityBucketsBuilder(buckets: HeightActivityBucketBuilder[]): HeightActivityBucketsBuilder {
        return new HeightActivityBucketsBuilder({ buckets: buckets });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.buckets.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // buckets
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const bucketsBytes = GeneratorUtils.writeList(this.buckets, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, bucketsBytes);
        return newArray;
    }
}

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

package io.nem.symbol.catapult.builders;

import java.io.DataInputStream;
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;

/**
* Account activity buckets
**/
public class HeightActivityBucketsBuilder implements Serializer {

    /** Account activity buckets. **/
    private final List<HeightActivityBucketBuilder> buckets;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected HeightActivityBucketsBuilder(DataInputStream stream) {
        try {
            this.buckets = GeneratorUtils.loadFromBinaryArray(HeightActivityBucketBuilder::loadFromBinary, stream, 5, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of HeightActivityBucketsBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of HeightActivityBucketsBuilder.
     */
    public static HeightActivityBucketsBuilder loadFromBinary(DataInputStream stream) {
        return new HeightActivityBucketsBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param buckets Account activity buckets.
    */
    protected HeightActivityBucketsBuilder(List<HeightActivityBucketBuilder> buckets) {
        GeneratorUtils.notNull(buckets, "buckets is null");
        this.buckets = buckets;
    }
    
    /**
     * Creates an instance of HeightActivityBucketsBuilder.
     *
     * @param buckets Account activity buckets.
     * @return Instance of HeightActivityBucketsBuilder.
     */
    public static HeightActivityBucketsBuilder create(List<HeightActivityBucketBuilder> buckets) {
        return new HeightActivityBucketsBuilder(buckets);
    }

    /**
     * Gets account activity buckets.
     *
     * @return Account activity buckets.
     */
    public List<HeightActivityBucketBuilder> getBuckets() {
        return this.buckets;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size +=  GeneratorUtils.getSumSize(this.buckets, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeList(dataOutputStream, this.buckets, 0);
        });
    }
}


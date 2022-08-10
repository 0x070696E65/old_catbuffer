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
* Account activity bucket
**/
public class HeightActivityBucketBuilder implements Serializer {

    /** Activity start height. **/
    private final ImportanceHeightDto startHeight;

    /** Total fees paid by account. **/
    private final AmountDto totalFeesPaid;

    /** Number of times account has been used as a beneficiary. **/
    private final int beneficiaryCount;

    /** Raw importance score. **/
    private final long rawScore;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected HeightActivityBucketBuilder(DataInputStream stream) {
        try {
            this.startHeight = ImportanceHeightDto.loadFromBinary(stream);
            this.totalFeesPaid = AmountDto.loadFromBinary(stream);
            this.beneficiaryCount = Integer.reverseBytes(stream.readInt());
            this.rawScore = Long.reverseBytes(stream.readLong());
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of HeightActivityBucketBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of HeightActivityBucketBuilder.
     */
    public static HeightActivityBucketBuilder loadFromBinary(DataInputStream stream) {
        return new HeightActivityBucketBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param startHeight Activity start height.
    * @param totalFeesPaid Total fees paid by account.
    * @param beneficiaryCount Number of times account has been used as a beneficiary.
    * @param rawScore Raw importance score.
    */
    protected HeightActivityBucketBuilder(ImportanceHeightDto startHeight, AmountDto totalFeesPaid, int beneficiaryCount, long rawScore) {
        GeneratorUtils.notNull(startHeight, "startHeight is null");
        GeneratorUtils.notNull(totalFeesPaid, "totalFeesPaid is null");
        GeneratorUtils.notNull(beneficiaryCount, "beneficiaryCount is null");
        GeneratorUtils.notNull(rawScore, "rawScore is null");
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
    
    /**
     * Creates an instance of HeightActivityBucketBuilder.
     *
     * @param startHeight Activity start height.
     * @param totalFeesPaid Total fees paid by account.
     * @param beneficiaryCount Number of times account has been used as a beneficiary.
     * @param rawScore Raw importance score.
     * @return Instance of HeightActivityBucketBuilder.
     */
    public static HeightActivityBucketBuilder create(ImportanceHeightDto startHeight, AmountDto totalFeesPaid, int beneficiaryCount, long rawScore) {
        return new HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore);
    }

    /**
     * Gets activity start height.
     *
     * @return Activity start height.
     */
    public ImportanceHeightDto getStartHeight() {
        return this.startHeight;
    }

    /**
     * Gets total fees paid by account.
     *
     * @return Total fees paid by account.
     */
    public AmountDto getTotalFeesPaid() {
        return this.totalFeesPaid;
    }

    /**
     * Gets number of times account has been used as a beneficiary.
     *
     * @return Number of times account has been used as a beneficiary.
     */
    public int getBeneficiaryCount() {
        return this.beneficiaryCount;
    }

    /**
     * Gets raw importance score.
     *
     * @return Raw importance score.
     */
    public long getRawScore() {
        return this.rawScore;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.startHeight.getSize();
        size += this.totalFeesPaid.getSize();
        size += 4; // beneficiaryCount
        size += 8; // rawScore
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.startHeight);
            GeneratorUtils.writeEntity(dataOutputStream, this.totalFeesPaid);
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getBeneficiaryCount()));
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getRawScore()));
        });
    }
}


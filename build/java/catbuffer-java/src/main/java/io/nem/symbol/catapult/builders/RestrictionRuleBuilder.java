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
* Binary layout of restriction rule being applied
**/
public class RestrictionRuleBuilder implements Serializer {

    /** Identifier of the mosaic providing the restriction key. **/
    private final MosaicIdDto referenceMosaicId;

    /** Restriction value. **/
    private final long restrictionValue;

    /** Restriction type. **/
    private final MosaicRestrictionTypeDto restrictionType;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected RestrictionRuleBuilder(DataInputStream stream) {
        try {
            this.referenceMosaicId = MosaicIdDto.loadFromBinary(stream);
            this.restrictionValue = Long.reverseBytes(stream.readLong());
            this.restrictionType = MosaicRestrictionTypeDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of RestrictionRuleBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of RestrictionRuleBuilder.
     */
    public static RestrictionRuleBuilder loadFromBinary(DataInputStream stream) {
        return new RestrictionRuleBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
    * @param restrictionValue Restriction value.
    * @param restrictionType Restriction type.
    */
    protected RestrictionRuleBuilder(MosaicIdDto referenceMosaicId, long restrictionValue, MosaicRestrictionTypeDto restrictionType) {
        GeneratorUtils.notNull(referenceMosaicId, "referenceMosaicId is null");
        GeneratorUtils.notNull(restrictionValue, "restrictionValue is null");
        GeneratorUtils.notNull(restrictionType, "restrictionType is null");
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }
    
    /**
     * Creates an instance of RestrictionRuleBuilder.
     *
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
     * @param restrictionValue Restriction value.
     * @param restrictionType Restriction type.
     * @return Instance of RestrictionRuleBuilder.
     */
    public static RestrictionRuleBuilder create(MosaicIdDto referenceMosaicId, long restrictionValue, MosaicRestrictionTypeDto restrictionType) {
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    }

    /**
     * Gets identifier of the mosaic providing the restriction key.
     *
     * @return Identifier of the mosaic providing the restriction key.
     */
    public MosaicIdDto getReferenceMosaicId() {
        return this.referenceMosaicId;
    }

    /**
     * Gets restriction value.
     *
     * @return Restriction value.
     */
    public long getRestrictionValue() {
        return this.restrictionValue;
    }

    /**
     * Gets restriction type.
     *
     * @return Restriction type.
     */
    public MosaicRestrictionTypeDto getRestrictionType() {
        return this.restrictionType;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.referenceMosaicId.getSize();
        size += 8; // restrictionValue
        size += this.restrictionType.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.referenceMosaicId);
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getRestrictionValue()));
            GeneratorUtils.writeEntity(dataOutputStream, this.restrictionType);
        });
    }
}


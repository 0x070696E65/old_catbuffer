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
* Binary layout for a mosaic restriction
**/
public class MosaicRestrictionEntryBuilder extends StateHeaderBuilder implements Serializer {

    /** Type of restriction being placed upon the entity. **/
    private final MosaicRestrictionEntryTypeDto entryType;

    /** Address restriction rule. **/
    private MosaicAddressRestrictionEntryBuilder addressEntry;

    /** Global mosaic rule. **/
    private MosaicGlobalRestrictionEntryBuilder globalEntry;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicRestrictionEntryBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.entryType = MosaicRestrictionEntryTypeDto.loadFromBinary(stream);
            if (this.entryType == MosaicRestrictionEntryTypeDto.ADDRESS) {
                this.addressEntry = MosaicAddressRestrictionEntryBuilder.loadFromBinary(stream);
            }
            if (this.entryType == MosaicRestrictionEntryTypeDto.GLOBAL) {
                this.globalEntry = MosaicGlobalRestrictionEntryBuilder.loadFromBinary(stream);
            }
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicRestrictionEntryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicRestrictionEntryBuilder.
     */
    public static MosaicRestrictionEntryBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicRestrictionEntryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param entryType Type of restriction being placed upon the entity.
    * @param addressEntry Address restriction rule.
    * @param globalEntry Global mosaic rule.
    */
    protected MosaicRestrictionEntryBuilder(short version, MosaicRestrictionEntryTypeDto entryType, MosaicAddressRestrictionEntryBuilder addressEntry, MosaicGlobalRestrictionEntryBuilder globalEntry) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(entryType, "entryType is null");
        if (entryType == MosaicRestrictionEntryTypeDto.ADDRESS) {
            GeneratorUtils.notNull(addressEntry, "addressEntry is null");
        }
        if (entryType == MosaicRestrictionEntryTypeDto.GLOBAL) {
            GeneratorUtils.notNull(globalEntry, "globalEntry is null");
        }
        this.entryType = entryType;
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
    }
    
    /**
     * Creates an instance of MosaicRestrictionEntryBuilder.
     *
     * @param version Serialization version.
     * @param globalEntry Global mosaic rule.
     * @return Instance of MosaicRestrictionEntryBuilder.
     */
    public static MosaicRestrictionEntryBuilder createGlobal(short version, MosaicGlobalRestrictionEntryBuilder globalEntry) {
        MosaicRestrictionEntryTypeDto entryType = MosaicRestrictionEntryTypeDto.GLOBAL;
        return new MosaicRestrictionEntryBuilder(version, entryType, null, globalEntry);
    }
    
    /**
     * Creates an instance of MosaicRestrictionEntryBuilder.
     *
     * @param version Serialization version.
     * @param addressEntry Address restriction rule.
     * @return Instance of MosaicRestrictionEntryBuilder.
     */
    public static MosaicRestrictionEntryBuilder createAddress(short version, MosaicAddressRestrictionEntryBuilder addressEntry) {
        MosaicRestrictionEntryTypeDto entryType = MosaicRestrictionEntryTypeDto.ADDRESS;
        return new MosaicRestrictionEntryBuilder(version, entryType, addressEntry, null);
    }

    /**
     * Gets type of restriction being placed upon the entity.
     *
     * @return Type of restriction being placed upon the entity.
     */
    public MosaicRestrictionEntryTypeDto getEntryType() {
        return this.entryType;
    }

    /**
     * Gets address restriction rule.
     *
     * @return Address restriction rule.
     */
    public MosaicAddressRestrictionEntryBuilder getAddressEntry() {
        if (!(this.entryType == MosaicRestrictionEntryTypeDto.ADDRESS)) {
            throw new java.lang.IllegalStateException("entryType is not set to ADDRESS.");
        }
        return this.addressEntry;
    }

    /**
     * Gets global mosaic rule.
     *
     * @return Global mosaic rule.
     */
    public MosaicGlobalRestrictionEntryBuilder getGlobalEntry() {
        if (!(this.entryType == MosaicRestrictionEntryTypeDto.GLOBAL)) {
            throw new java.lang.IllegalStateException("entryType is not set to GLOBAL.");
        }
        return this.globalEntry;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.entryType.getSize();
        if (this.entryType == MosaicRestrictionEntryTypeDto.ADDRESS) {
            size += this.addressEntry.getSize();
        }
        if (this.entryType == MosaicRestrictionEntryTypeDto.GLOBAL) {
            size += this.globalEntry.getSize();
        }
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            final byte[] superBytes = super.serialize();
            dataOutputStream.write(superBytes, 0, superBytes.length);
            GeneratorUtils.writeEntity(dataOutputStream, this.entryType);
            if (this.entryType == MosaicRestrictionEntryTypeDto.ADDRESS) {
                GeneratorUtils.writeEntity(dataOutputStream, this.addressEntry);
            }
            if (this.entryType == MosaicRestrictionEntryTypeDto.GLOBAL) {
                GeneratorUtils.writeEntity(dataOutputStream, this.globalEntry);
            }
        });
    }
}


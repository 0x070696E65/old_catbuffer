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
* Binary layout for alias
**/
public class NamespaceAliasBuilder implements Serializer {

    /** Namespace alias type. **/
    private final NamespaceAliasTypeDto namespaceAliasType;

    /** Mosaic alias. **/
    private MosaicIdDto mosaicAlias;

    /** Address alias. **/
    private AddressDto addressAlias;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceAliasBuilder(DataInputStream stream) {
        try {
            this.namespaceAliasType = NamespaceAliasTypeDto.loadFromBinary(stream);
            if (this.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID) {
                this.mosaicAlias = MosaicIdDto.loadFromBinary(stream);
            }
            if (this.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS) {
                this.addressAlias = AddressDto.loadFromBinary(stream);
            }
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceAliasBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceAliasBuilder.
     */
    public static NamespaceAliasBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceAliasBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param namespaceAliasType Namespace alias type.
    * @param mosaicAlias Mosaic alias.
    * @param addressAlias Address alias.
    */
    protected NamespaceAliasBuilder(NamespaceAliasTypeDto namespaceAliasType, MosaicIdDto mosaicAlias, AddressDto addressAlias) {
        GeneratorUtils.notNull(namespaceAliasType, "namespaceAliasType is null");
        if (namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID) {
            GeneratorUtils.notNull(mosaicAlias, "mosaicAlias is null");
        }
        if (namespaceAliasType == NamespaceAliasTypeDto.ADDRESS) {
            GeneratorUtils.notNull(addressAlias, "addressAlias is null");
        }
        this.namespaceAliasType = namespaceAliasType;
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
    }
    
    /**
     * Creates an instance of NamespaceAliasBuilder.
     *
     * @return Instance of NamespaceAliasBuilder.
     */
    public static NamespaceAliasBuilder createNone() {
        NamespaceAliasTypeDto namespaceAliasType = NamespaceAliasTypeDto.NONE;
        return new NamespaceAliasBuilder(namespaceAliasType, null, null);
    }
    
    /**
     * Creates an instance of NamespaceAliasBuilder.
     *
     * @param addressAlias Address alias.
     * @return Instance of NamespaceAliasBuilder.
     */
    public static NamespaceAliasBuilder createAddress(AddressDto addressAlias) {
        NamespaceAliasTypeDto namespaceAliasType = NamespaceAliasTypeDto.ADDRESS;
        return new NamespaceAliasBuilder(namespaceAliasType, null, addressAlias);
    }
    
    /**
     * Creates an instance of NamespaceAliasBuilder.
     *
     * @param mosaicAlias Mosaic alias.
     * @return Instance of NamespaceAliasBuilder.
     */
    public static NamespaceAliasBuilder createMosaicId(MosaicIdDto mosaicAlias) {
        NamespaceAliasTypeDto namespaceAliasType = NamespaceAliasTypeDto.MOSAIC_ID;
        return new NamespaceAliasBuilder(namespaceAliasType, mosaicAlias, null);
    }

    /**
     * Gets namespace alias type.
     *
     * @return Namespace alias type.
     */
    public NamespaceAliasTypeDto getNamespaceAliasType() {
        return this.namespaceAliasType;
    }

    /**
     * Gets mosaic alias.
     *
     * @return Mosaic alias.
     */
    public MosaicIdDto getMosaicAlias() {
        if (!(this.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID)) {
            throw new java.lang.IllegalStateException("namespaceAliasType is not set to MOSAIC_ID.");
        }
        return this.mosaicAlias;
    }

    /**
     * Gets address alias.
     *
     * @return Address alias.
     */
    public AddressDto getAddressAlias() {
        if (!(this.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS)) {
            throw new java.lang.IllegalStateException("namespaceAliasType is not set to ADDRESS.");
        }
        return this.addressAlias;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.namespaceAliasType.getSize();
        if (this.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID) {
            size += this.mosaicAlias.getSize();
        }
        if (this.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS) {
            size += this.addressAlias.getSize();
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
            GeneratorUtils.writeEntity(dataOutputStream, this.namespaceAliasType);
            if (this.namespaceAliasType == NamespaceAliasTypeDto.MOSAIC_ID) {
                GeneratorUtils.writeEntity(dataOutputStream, this.mosaicAlias);
            }
            if (this.namespaceAliasType == NamespaceAliasTypeDto.ADDRESS) {
                GeneratorUtils.writeEntity(dataOutputStream, this.addressAlias);
            }
        });
    }
}


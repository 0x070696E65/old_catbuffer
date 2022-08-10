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
* Binary layout for an mosaic alias transaction
**/
public class MosaicAliasTransactionBodyBuilder implements Serializer {

    /** Identifier of the namespace that will become an alias. **/
    private final NamespaceIdDto namespaceId;

    /** Aliased mosaic identifier. **/
    private final MosaicIdDto mosaicId;

    /** Alias action. **/
    private final AliasActionDto aliasAction;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicAliasTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.namespaceId = NamespaceIdDto.loadFromBinary(stream);
            this.mosaicId = MosaicIdDto.loadFromBinary(stream);
            this.aliasAction = AliasActionDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicAliasTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicAliasTransactionBodyBuilder.
     */
    public static MosaicAliasTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicAliasTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param namespaceId Identifier of the namespace that will become an alias.
    * @param mosaicId Aliased mosaic identifier.
    * @param aliasAction Alias action.
    */
    protected MosaicAliasTransactionBodyBuilder(NamespaceIdDto namespaceId, MosaicIdDto mosaicId, AliasActionDto aliasAction) {
        GeneratorUtils.notNull(namespaceId, "namespaceId is null");
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(aliasAction, "aliasAction is null");
        this.namespaceId = namespaceId;
        this.mosaicId = mosaicId;
        this.aliasAction = aliasAction;
    }
    
    /**
     * Creates an instance of MosaicAliasTransactionBodyBuilder.
     *
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param mosaicId Aliased mosaic identifier.
     * @param aliasAction Alias action.
     * @return Instance of MosaicAliasTransactionBodyBuilder.
     */
    public static MosaicAliasTransactionBodyBuilder create(NamespaceIdDto namespaceId, MosaicIdDto mosaicId, AliasActionDto aliasAction) {
        return new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }

    /**
     * Gets identifier of the namespace that will become an alias.
     *
     * @return Identifier of the namespace that will become an alias.
     */
    public NamespaceIdDto getNamespaceId() {
        return this.namespaceId;
    }

    /**
     * Gets aliased mosaic identifier.
     *
     * @return Aliased mosaic identifier.
     */
    public MosaicIdDto getMosaicId() {
        return this.mosaicId;
    }

    /**
     * Gets alias action.
     *
     * @return Alias action.
     */
    public AliasActionDto getAliasAction() {
        return this.aliasAction;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.namespaceId.getSize();
        size += this.mosaicId.getSize();
        size += this.aliasAction.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.namespaceId);
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicId);
            GeneratorUtils.writeEntity(dataOutputStream, this.aliasAction);
        });
    }
}


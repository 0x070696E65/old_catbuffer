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
* Binary layout for a namespace path
**/
public class NamespacePathBuilder implements Serializer {

    /** Namespace path (excluding root id). **/
    private final List<NamespaceIdDto> path;

    /** Namespace alias. **/
    private final NamespaceAliasBuilder alias;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespacePathBuilder(DataInputStream stream) {
        try {
            final byte pathSize = stream.readByte();
            this.path = GeneratorUtils.loadFromBinaryArray(NamespaceIdDto::loadFromBinary, stream, pathSize, 0);
            this.alias = NamespaceAliasBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespacePathBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespacePathBuilder.
     */
    public static NamespacePathBuilder loadFromBinary(DataInputStream stream) {
        return new NamespacePathBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param path Namespace path (excluding root id).
    * @param alias Namespace alias.
    */
    protected NamespacePathBuilder(List<NamespaceIdDto> path, NamespaceAliasBuilder alias) {
        GeneratorUtils.notNull(path, "path is null");
        GeneratorUtils.notNull(alias, "alias is null");
        this.path = path;
        this.alias = alias;
    }
    
    /**
     * Creates an instance of NamespacePathBuilder.
     *
     * @param path Namespace path (excluding root id).
     * @param alias Namespace alias.
     * @return Instance of NamespacePathBuilder.
     */
    public static NamespacePathBuilder create(List<NamespaceIdDto> path, NamespaceAliasBuilder alias) {
        return new NamespacePathBuilder(path, alias);
    }

    /**
     * Gets namespace path (excluding root id).
     *
     * @return Namespace path (excluding root id).
     */
    public List<NamespaceIdDto> getPath() {
        return this.path;
    }

    /**
     * Gets namespace alias.
     *
     * @return Namespace alias.
     */
    public NamespaceAliasBuilder getAlias() {
        return this.alias;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 1; // pathSize
        size +=  GeneratorUtils.getSumSize(this.path, 0);
        size += this.alias.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getPath()));
            GeneratorUtils.writeList(dataOutputStream, this.path, 0);
            GeneratorUtils.writeEntity(dataOutputStream, this.alias);
        });
    }
}


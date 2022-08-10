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
* Binary layout for non-historical root namespace history
**/
public class RootNamespaceHistoryBuilder extends StateHeaderBuilder implements Serializer {

    /** Id of the root namespace history. **/
    private final NamespaceIdDto id;

    /** Namespace owner address. **/
    private final AddressDto ownerAddress;

    /** Lifetime in blocks. **/
    private final NamespaceLifetimeBuilder lifetime;

    /** Root namespace alias. **/
    private final NamespaceAliasBuilder rootAlias;

    /** Save child sub-namespace paths. **/
    private final List<NamespacePathBuilder> paths;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected RootNamespaceHistoryBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.id = NamespaceIdDto.loadFromBinary(stream);
            this.ownerAddress = AddressDto.loadFromBinary(stream);
            this.lifetime = NamespaceLifetimeBuilder.loadFromBinary(stream);
            this.rootAlias = NamespaceAliasBuilder.loadFromBinary(stream);
            final long childrenCount = Long.reverseBytes(stream.readLong());
            this.paths = GeneratorUtils.loadFromBinaryArray(NamespacePathBuilder::loadFromBinary, stream, childrenCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of RootNamespaceHistoryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of RootNamespaceHistoryBuilder.
     */
    public static RootNamespaceHistoryBuilder loadFromBinary(DataInputStream stream) {
        return new RootNamespaceHistoryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param id Id of the root namespace history.
    * @param ownerAddress Namespace owner address.
    * @param lifetime Lifetime in blocks.
    * @param rootAlias Root namespace alias.
    * @param paths Save child sub-namespace paths.
    */
    protected RootNamespaceHistoryBuilder(short version, NamespaceIdDto id, AddressDto ownerAddress, NamespaceLifetimeBuilder lifetime, NamespaceAliasBuilder rootAlias, List<NamespacePathBuilder> paths) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(id, "id is null");
        GeneratorUtils.notNull(ownerAddress, "ownerAddress is null");
        GeneratorUtils.notNull(lifetime, "lifetime is null");
        GeneratorUtils.notNull(rootAlias, "rootAlias is null");
        GeneratorUtils.notNull(paths, "paths is null");
        this.id = id;
        this.ownerAddress = ownerAddress;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }
    
    /**
     * Creates an instance of RootNamespaceHistoryBuilder.
     *
     * @param version Serialization version.
     * @param id Id of the root namespace history.
     * @param ownerAddress Namespace owner address.
     * @param lifetime Lifetime in blocks.
     * @param rootAlias Root namespace alias.
     * @param paths Save child sub-namespace paths.
     * @return Instance of RootNamespaceHistoryBuilder.
     */
    public static RootNamespaceHistoryBuilder create(short version, NamespaceIdDto id, AddressDto ownerAddress, NamespaceLifetimeBuilder lifetime, NamespaceAliasBuilder rootAlias, List<NamespacePathBuilder> paths) {
        return new RootNamespaceHistoryBuilder(version, id, ownerAddress, lifetime, rootAlias, paths);
    }

    /**
     * Gets id of the root namespace history.
     *
     * @return Id of the root namespace history.
     */
    public NamespaceIdDto getId() {
        return this.id;
    }

    /**
     * Gets namespace owner address.
     *
     * @return Namespace owner address.
     */
    public AddressDto getOwnerAddress() {
        return this.ownerAddress;
    }

    /**
     * Gets lifetime in blocks.
     *
     * @return Lifetime in blocks.
     */
    public NamespaceLifetimeBuilder getLifetime() {
        return this.lifetime;
    }

    /**
     * Gets root namespace alias.
     *
     * @return Root namespace alias.
     */
    public NamespaceAliasBuilder getRootAlias() {
        return this.rootAlias;
    }

    /**
     * Gets save child sub-namespace paths.
     *
     * @return Save child sub-namespace paths.
     */
    public List<NamespacePathBuilder> getPaths() {
        return this.paths;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.id.getSize();
        size += this.ownerAddress.getSize();
        size += this.lifetime.getSize();
        size += this.rootAlias.getSize();
        size += 8; // childrenCount
        size +=  GeneratorUtils.getSumSize(this.paths, 0);
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
            GeneratorUtils.writeEntity(dataOutputStream, this.id);
            GeneratorUtils.writeEntity(dataOutputStream, this.ownerAddress);
            GeneratorUtils.writeEntity(dataOutputStream, this.lifetime);
            GeneratorUtils.writeEntity(dataOutputStream, this.rootAlias);
            dataOutputStream.writeLong(Long.reverseBytes((long) GeneratorUtils.getSize(this.getPaths())));
            GeneratorUtils.writeList(dataOutputStream, this.paths, 0);
        });
    }
}


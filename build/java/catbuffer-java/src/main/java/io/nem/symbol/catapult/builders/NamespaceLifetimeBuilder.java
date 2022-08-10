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
* Binary layout for namespace lifetime
**/
public class NamespaceLifetimeBuilder implements Serializer {

    /** Start height. **/
    private final HeightDto lifetimeStart;

    /** End height. **/
    private final HeightDto lifetimeEnd;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceLifetimeBuilder(DataInputStream stream) {
        try {
            this.lifetimeStart = HeightDto.loadFromBinary(stream);
            this.lifetimeEnd = HeightDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceLifetimeBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceLifetimeBuilder.
     */
    public static NamespaceLifetimeBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceLifetimeBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param lifetimeStart Start height.
    * @param lifetimeEnd End height.
    */
    protected NamespaceLifetimeBuilder(HeightDto lifetimeStart, HeightDto lifetimeEnd) {
        GeneratorUtils.notNull(lifetimeStart, "lifetimeStart is null");
        GeneratorUtils.notNull(lifetimeEnd, "lifetimeEnd is null");
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }
    
    /**
     * Creates an instance of NamespaceLifetimeBuilder.
     *
     * @param lifetimeStart Start height.
     * @param lifetimeEnd End height.
     * @return Instance of NamespaceLifetimeBuilder.
     */
    public static NamespaceLifetimeBuilder create(HeightDto lifetimeStart, HeightDto lifetimeEnd) {
        return new NamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd);
    }

    /**
     * Gets start height.
     *
     * @return Start height.
     */
    public HeightDto getLifetimeStart() {
        return this.lifetimeStart;
    }

    /**
     * Gets end height.
     *
     * @return End height.
     */
    public HeightDto getLifetimeEnd() {
        return this.lifetimeEnd;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.lifetimeStart.getSize();
        size += this.lifetimeEnd.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.lifetimeStart);
            GeneratorUtils.writeEntity(dataOutputStream, this.lifetimeEnd);
        });
    }
}


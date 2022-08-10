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
* Temporal importance information
**/
public class ImportanceSnapshotBuilder implements Serializer {

    /** Account importance. **/
    private final ImportanceDto importance;

    /** Importance height. **/
    private final ImportanceHeightDto height;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected ImportanceSnapshotBuilder(DataInputStream stream) {
        try {
            this.importance = ImportanceDto.loadFromBinary(stream);
            this.height = ImportanceHeightDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of ImportanceSnapshotBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of ImportanceSnapshotBuilder.
     */
    public static ImportanceSnapshotBuilder loadFromBinary(DataInputStream stream) {
        return new ImportanceSnapshotBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param importance Account importance.
    * @param height Importance height.
    */
    protected ImportanceSnapshotBuilder(ImportanceDto importance, ImportanceHeightDto height) {
        GeneratorUtils.notNull(importance, "importance is null");
        GeneratorUtils.notNull(height, "height is null");
        this.importance = importance;
        this.height = height;
    }
    
    /**
     * Creates an instance of ImportanceSnapshotBuilder.
     *
     * @param importance Account importance.
     * @param height Importance height.
     * @return Instance of ImportanceSnapshotBuilder.
     */
    public static ImportanceSnapshotBuilder create(ImportanceDto importance, ImportanceHeightDto height) {
        return new ImportanceSnapshotBuilder(importance, height);
    }

    /**
     * Gets account importance.
     *
     * @return Account importance.
     */
    public ImportanceDto getImportance() {
        return this.importance;
    }

    /**
     * Gets importance height.
     *
     * @return Importance height.
     */
    public ImportanceHeightDto getHeight() {
        return this.height;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.importance.getSize();
        size += this.height.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.importance);
            GeneratorUtils.writeEntity(dataOutputStream, this.height);
        });
    }
}


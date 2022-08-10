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
* Binary layout for a namespace registration transaction
**/
public class NamespaceRegistrationTransactionBodyBuilder implements Serializer {

    /** Namespace duration. **/
    private BlockDurationDto duration;

    /** Parent namespace identifier. **/
    private NamespaceIdDto parentId;

    /** Namespace identifier. **/
    private final NamespaceIdDto id;

    /** Namespace registration type. **/
    private final NamespaceRegistrationTypeDto registrationType;

    /** Namespace name. **/
    private final ByteBuffer name;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceRegistrationTransactionBodyBuilder(DataInputStream stream) {
        try {
            final long registrationTypeCondition = Long.reverseBytes(stream.readLong());
            this.id = NamespaceIdDto.loadFromBinary(stream);
            this.registrationType = NamespaceRegistrationTypeDto.loadFromBinary(stream);
            final byte nameSize = stream.readByte();
            this.name = GeneratorUtils.readByteBuffer(stream, nameSize);
            if (this.registrationType == NamespaceRegistrationTypeDto.ROOT) {
                this.duration = new BlockDurationDto(registrationTypeCondition);
            }
            if (this.registrationType == NamespaceRegistrationTypeDto.CHILD) {
                this.parentId = new NamespaceIdDto(registrationTypeCondition);
            }
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static NamespaceRegistrationTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceRegistrationTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param duration Namespace duration.
    * @param parentId Parent namespace identifier.
    * @param id Namespace identifier.
    * @param registrationType Namespace registration type.
    * @param name Namespace name.
    */
    protected NamespaceRegistrationTransactionBodyBuilder(BlockDurationDto duration, NamespaceIdDto parentId, NamespaceIdDto id, NamespaceRegistrationTypeDto registrationType, ByteBuffer name) {
        if (registrationType == NamespaceRegistrationTypeDto.ROOT) {
            GeneratorUtils.notNull(duration, "duration is null");
        }
        if (registrationType == NamespaceRegistrationTypeDto.CHILD) {
            GeneratorUtils.notNull(parentId, "parentId is null");
        }
        GeneratorUtils.notNull(id, "id is null");
        GeneratorUtils.notNull(registrationType, "registrationType is null");
        GeneratorUtils.notNull(name, "name is null");
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.registrationType = registrationType;
        this.name = name;
    }
    
    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder.
     *
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static NamespaceRegistrationTransactionBodyBuilder createChild(NamespaceIdDto parentId, NamespaceIdDto id, ByteBuffer name) {
        NamespaceRegistrationTypeDto registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBodyBuilder(null, parentId, id, registrationType, name);
    }
    
    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder.
     *
     * @param duration Namespace duration.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static NamespaceRegistrationTransactionBodyBuilder createRoot(BlockDurationDto duration, NamespaceIdDto id, ByteBuffer name) {
        NamespaceRegistrationTypeDto registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBodyBuilder(duration, null, id, registrationType, name);
    }

    /**
     * Gets namespace duration.
     *
     * @return Namespace duration.
     */
    public BlockDurationDto getDuration() {
        if (!(this.registrationType == NamespaceRegistrationTypeDto.ROOT)) {
            throw new java.lang.IllegalStateException("registrationType is not set to ROOT.");
        }
        return this.duration;
    }

    /**
     * Gets parent namespace identifier.
     *
     * @return Parent namespace identifier.
     */
    public NamespaceIdDto getParentId() {
        if (!(this.registrationType == NamespaceRegistrationTypeDto.CHILD)) {
            throw new java.lang.IllegalStateException("registrationType is not set to CHILD.");
        }
        return this.parentId;
    }

    /**
     * Gets namespace identifier.
     *
     * @return Namespace identifier.
     */
    public NamespaceIdDto getId() {
        return this.id;
    }

    /**
     * Gets namespace registration type.
     *
     * @return Namespace registration type.
     */
    public NamespaceRegistrationTypeDto getRegistrationType() {
        return this.registrationType;
    }

    /**
     * Gets namespace name.
     *
     * @return Namespace name.
     */
    public ByteBuffer getName() {
        return this.name;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        if (this.registrationType == NamespaceRegistrationTypeDto.ROOT) {
            size += this.duration.getSize();
        }
        if (this.registrationType == NamespaceRegistrationTypeDto.CHILD) {
            size += this.parentId.getSize();
        }
        size += this.id.getSize();
        size += this.registrationType.getSize();
        size += 1; // nameSize
        size += this.name.array().length;
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            if (this.registrationType == NamespaceRegistrationTypeDto.ROOT) {
                GeneratorUtils.writeEntity(dataOutputStream, this.duration);
            }
            if (this.registrationType == NamespaceRegistrationTypeDto.CHILD) {
                GeneratorUtils.writeEntity(dataOutputStream, this.parentId);
            }
            GeneratorUtils.writeEntity(dataOutputStream, this.id);
            GeneratorUtils.writeEntity(dataOutputStream, this.registrationType);
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getName()));
            dataOutputStream.write(this.name.array(), 0, this.name.array().length);
        });
    }
}


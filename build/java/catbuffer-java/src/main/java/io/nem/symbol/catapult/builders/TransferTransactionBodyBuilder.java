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
* Binary layout for a transfer transaction
**/
public class TransferTransactionBodyBuilder implements Serializer {

    /** Recipient address. **/
    private final UnresolvedAddressDto recipientAddress;

    /** Reserved padding to align mosaics on 8-byte boundary. **/
    private final int transferTransactionBody_Reserved1;

    /** Reserved padding to align mosaics on 8-byte boundary. **/
    private final byte transferTransactionBody_Reserved2;

    /** Attached mosaics. **/
    private final List<UnresolvedMosaicBuilder> mosaics;

    /** Attached message. **/
    private final ByteBuffer message;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected TransferTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.recipientAddress = UnresolvedAddressDto.loadFromBinary(stream);
            final short messageSize = Short.reverseBytes(stream.readShort());
            final byte mosaicsCount = stream.readByte();
            this.transferTransactionBody_Reserved1 = Integer.reverseBytes(stream.readInt());
            this.transferTransactionBody_Reserved2 = stream.readByte();
            this.mosaics = GeneratorUtils.loadFromBinaryArray(UnresolvedMosaicBuilder::loadFromBinary, stream, mosaicsCount, 0);
            this.message = GeneratorUtils.readByteBuffer(stream, messageSize);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of TransferTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of TransferTransactionBodyBuilder.
     */
    public static TransferTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new TransferTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param recipientAddress Recipient address.
    * @param mosaics Attached mosaics.
    * @param message Attached message.
    */
    protected TransferTransactionBodyBuilder(UnresolvedAddressDto recipientAddress, List<UnresolvedMosaicBuilder> mosaics, ByteBuffer message) {
        GeneratorUtils.notNull(recipientAddress, "recipientAddress is null");
        GeneratorUtils.notNull(mosaics, "mosaics is null");
        GeneratorUtils.notNull(message, "message is null");
        this.recipientAddress = recipientAddress;
        this.transferTransactionBody_Reserved1 = 0;
        this.transferTransactionBody_Reserved2 = 0;
        this.mosaics = mosaics;
        this.message = message;
    }
    
    /**
     * Creates an instance of TransferTransactionBodyBuilder.
     *
     * @param recipientAddress Recipient address.
     * @param mosaics Attached mosaics.
     * @param message Attached message.
     * @return Instance of TransferTransactionBodyBuilder.
     */
    public static TransferTransactionBodyBuilder create(UnresolvedAddressDto recipientAddress, List<UnresolvedMosaicBuilder> mosaics, ByteBuffer message) {
        return new TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }

    /**
     * Gets recipient address.
     *
     * @return Recipient address.
     */
    public UnresolvedAddressDto getRecipientAddress() {
        return this.recipientAddress;
    }

    /**
     * Gets reserved padding to align mosaics on 8-byte boundary.
     *
     * @return Reserved padding to align mosaics on 8-byte boundary.
     */
    private int getTransferTransactionBody_Reserved1() {
        return this.transferTransactionBody_Reserved1;
    }

    /**
     * Gets reserved padding to align mosaics on 8-byte boundary.
     *
     * @return Reserved padding to align mosaics on 8-byte boundary.
     */
    private byte getTransferTransactionBody_Reserved2() {
        return this.transferTransactionBody_Reserved2;
    }

    /**
     * Gets attached mosaics.
     *
     * @return Attached mosaics.
     */
    public List<UnresolvedMosaicBuilder> getMosaics() {
        return this.mosaics;
    }

    /**
     * Gets attached message.
     *
     * @return Attached message.
     */
    public ByteBuffer getMessage() {
        return this.message;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.recipientAddress.getSize();
        size += 2; // messageSize
        size += 1; // mosaicsCount
        size += 4; // transferTransactionBody_Reserved1
        size += 1; // transferTransactionBody_Reserved2
        size +=  GeneratorUtils.getSumSize(this.mosaics, 0);
        size += this.message.array().length;
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.recipientAddress);
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.getSize(this.getMessage())));
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getMosaics()));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getTransferTransactionBody_Reserved1()));
            dataOutputStream.writeByte((byte) this.getTransferTransactionBody_Reserved2());
            GeneratorUtils.writeList(dataOutputStream, this.mosaics, 0);
            dataOutputStream.write(this.message.array(), 0, this.message.array().length);
        });
    }
}


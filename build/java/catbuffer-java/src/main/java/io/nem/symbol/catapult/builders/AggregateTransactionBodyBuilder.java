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
* Binary layout for an aggregate transaction
**/
public class AggregateTransactionBodyBuilder implements Serializer {

    /** Aggregate hash of an aggregate's transactions. **/
    private final Hash256Dto transactionsHash;

    /** Reserved padding to align end of AggregateTransactionHeader on 8-byte boundary. **/
    private final int aggregateTransactionHeader_Reserved1;

    /** Sub-transaction data (transactions are variable sized and payload size is in bytes). **/
    private final List<EmbeddedTransactionBuilder> transactions;

    /** Cosignatures data (fills remaining body space after transactions). **/
    private final List<CosignatureBuilder> cosignatures;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AggregateTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.transactionsHash = Hash256Dto.loadFromBinary(stream);
            final int payloadSize = Integer.reverseBytes(stream.readInt());
            this.aggregateTransactionHeader_Reserved1 = Integer.reverseBytes(stream.readInt());
            this.transactions = GeneratorUtils.loadFromBinaryArrayRemaining(EmbeddedTransactionBuilderHelper::loadFromBinary, stream, payloadSize, 8);
            this.cosignatures = GeneratorUtils.loadFromBinaryArrayRemaining(CosignatureBuilder::loadFromBinary, stream, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AggregateTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AggregateTransactionBodyBuilder.
     */
    public static AggregateTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new AggregateTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param transactionsHash Aggregate hash of an aggregate's transactions.
    * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
    * @param cosignatures Cosignatures data (fills remaining body space after transactions).
    */
    protected AggregateTransactionBodyBuilder(Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures) {
        GeneratorUtils.notNull(transactionsHash, "transactionsHash is null");
        GeneratorUtils.notNull(transactions, "transactions is null");
        GeneratorUtils.notNull(cosignatures, "cosignatures is null");
        this.transactionsHash = transactionsHash;
        this.aggregateTransactionHeader_Reserved1 = 0;
        this.transactions = transactions;
        this.cosignatures = cosignatures;
    }
    
    /**
     * Creates an instance of AggregateTransactionBodyBuilder.
     *
     * @param transactionsHash Aggregate hash of an aggregate's transactions.
     * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
     * @param cosignatures Cosignatures data (fills remaining body space after transactions).
     * @return Instance of AggregateTransactionBodyBuilder.
     */
    public static AggregateTransactionBodyBuilder create(Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures) {
        return new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }

    /**
     * Gets aggregate hash of an aggregate's transactions.
     *
     * @return Aggregate hash of an aggregate's transactions.
     */
    public Hash256Dto getTransactionsHash() {
        return this.transactionsHash;
    }

    /**
     * Gets reserved padding to align end of AggregateTransactionHeader on 8-byte boundary.
     *
     * @return Reserved padding to align end of AggregateTransactionHeader on 8-byte boundary.
     */
    private int getAggregateTransactionHeader_Reserved1() {
        return this.aggregateTransactionHeader_Reserved1;
    }

    /**
     * Gets sub-transaction data (transactions are variable sized and payload size is in bytes).
     *
     * @return Sub-transaction data (transactions are variable sized and payload size is in bytes).
     */
    public List<EmbeddedTransactionBuilder> getTransactions() {
        return this.transactions;
    }

    /**
     * Gets cosignatures data (fills remaining body space after transactions).
     *
     * @return Cosignatures data (fills remaining body space after transactions).
     */
    public List<CosignatureBuilder> getCosignatures() {
        return this.cosignatures;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.transactionsHash.getSize();
        size += 4; // payloadSize
        size += 4; // aggregateTransactionHeader_Reserved1
        size +=  GeneratorUtils.getSumSize(this.transactions, 8);
        size +=  GeneratorUtils.getSumSize(this.cosignatures, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.transactionsHash);
            dataOutputStream.writeInt(Integer.reverseBytes((int) GeneratorUtils.getSumSize(this.getTransactions(), 8)));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getAggregateTransactionHeader_Reserved1()));
            GeneratorUtils.writeList(dataOutputStream, this.transactions, 8);
            GeneratorUtils.writeList(dataOutputStream, this.cosignatures, 0);
        });
    }
}


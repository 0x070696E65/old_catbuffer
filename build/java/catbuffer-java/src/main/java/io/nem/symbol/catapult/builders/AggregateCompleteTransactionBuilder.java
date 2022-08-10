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
* Binary layout for an aggregate complete transaction
**/
public class AggregateCompleteTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Aggregate transaction body. **/
    private final AggregateTransactionBodyBuilder aggregateTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AggregateCompleteTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.aggregateTransactionBody = AggregateTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AggregateCompleteTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AggregateCompleteTransactionBuilder.
     */
    public static AggregateCompleteTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new AggregateCompleteTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signature Entity signature.
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param fee Transaction fee.
    * @param deadline Transaction deadline.
    * @param transactionsHash Aggregate hash of an aggregate's transactions.
    * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
    * @param cosignatures Cosignatures data (fills remaining body space after transactions).
    */
    protected AggregateCompleteTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(transactionsHash, "transactionsHash is null");
        GeneratorUtils.notNull(transactions, "transactions is null");
        GeneratorUtils.notNull(cosignatures, "cosignatures is null");
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }
    
    /**
     * Creates an instance of AggregateCompleteTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param transactionsHash Aggregate hash of an aggregate's transactions.
     * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
     * @param cosignatures Cosignatures data (fills remaining body space after transactions).
     * @return Instance of AggregateCompleteTransactionBuilder.
     */
    public static AggregateCompleteTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures) {
        return new AggregateCompleteTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures);
    }

    /**
     * Gets aggregate hash of an aggregate's transactions.
     *
     * @return Aggregate hash of an aggregate's transactions.
     */
    public Hash256Dto getTransactionsHash() {
        return this.aggregateTransactionBody.getTransactionsHash();
    }

    /**
     * Gets sub-transaction data (transactions are variable sized and payload size is in bytes).
     *
     * @return Sub-transaction data (transactions are variable sized and payload size is in bytes).
     */
    public List<EmbeddedTransactionBuilder> getTransactions() {
        return this.aggregateTransactionBody.getTransactions();
    }

    /**
     * Gets cosignatures data (fills remaining body space after transactions).
     *
     * @return Cosignatures data (fills remaining body space after transactions).
     */
    public List<CosignatureBuilder> getCosignatures() {
        return this.aggregateTransactionBody.getCosignatures();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.aggregateTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public AggregateTransactionBodyBuilder getBody() {
        return this.aggregateTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.aggregateTransactionBody);
        });
    }
}


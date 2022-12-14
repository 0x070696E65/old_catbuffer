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

using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace Symbol.Builders {
    /*
    * Binary layout for an aggregate bonded transaction
    */
    [Serializable]
    public class AggregateBondedTransactionBuilder: TransactionBuilder {

        /* Aggregate transaction body. */
        public AggregateTransactionBodyBuilder aggregateTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AggregateBondedTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                aggregateTransactionBody = AggregateTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AggregateBondedTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AggregateBondedTransactionBuilder.
        */
        public new static AggregateBondedTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new AggregateBondedTransactionBuilder(stream);
        }

        
        /*
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
        internal AggregateBondedTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(transactionsHash, "transactionsHash is null");
            GeneratorUtils.NotNull(transactions, "transactions is null");
            GeneratorUtils.NotNull(cosignatures, "cosignatures is null");
            this.aggregateTransactionBody = new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
        }
        
        /*
        * Creates an instance of AggregateBondedTransactionBuilder.
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
        * @return Instance of AggregateBondedTransactionBuilder.
        */
        public static  AggregateBondedTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures) {
            return new AggregateBondedTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures);
        }

        /*
        * Gets aggregate hash of an aggregate's transactions.
        *
        * @return Aggregate hash of an aggregate's transactions.
        */
        public Hash256Dto GetTransactionsHash() {
            return aggregateTransactionBody.GetTransactionsHash();
        }

        /*
        * Gets sub-transaction data (transactions are variable sized and payload size is in bytes).
        *
        * @return Sub-transaction data (transactions are variable sized and payload size is in bytes).
        */
        public List<EmbeddedTransactionBuilder> GetTransactions() {
            return aggregateTransactionBody.GetTransactions();
        }

        /*
        * Gets cosignatures data (fills remaining body space after transactions).
        *
        * @return Cosignatures data (fills remaining body space after transactions).
        */
        public List<CosignatureBuilder> GetCosignatures() {
            return aggregateTransactionBody.GetCosignatures();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += aggregateTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AggregateTransactionBodyBuilder GetBody() {
            return aggregateTransactionBody;
        }


    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public new byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var superBytes = base.Serialize();
            bw.Write(superBytes, 0, superBytes.Length);
            var aggregateTransactionBodyEntityBytes = (aggregateTransactionBody).Serialize();
            bw.Write(aggregateTransactionBodyEntityBytes, 0, aggregateTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

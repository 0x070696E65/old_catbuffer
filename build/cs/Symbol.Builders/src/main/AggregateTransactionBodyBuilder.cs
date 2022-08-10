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
    * Binary layout for an aggregate transaction
    */
    [Serializable]
    public class AggregateTransactionBodyBuilder: ISerializer {

        /* Aggregate hash of an aggregate's transactions. */
        public Hash256Dto transactionsHash;
        /* Reserved padding to align end of AggregateTransactionHeader on 8-byte boundary. */
        public int aggregateTransactionHeader_Reserved1;
        /* Sub-transaction data (transactions are variable sized and payload size is in bytes). */
        public List<EmbeddedTransactionBuilder> transactions;
        /* Cosignatures data (fills remaining body space after transactions). */
        public List<CosignatureBuilder> cosignatures;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AggregateTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                transactionsHash = Hash256Dto.LoadFromBinary(stream);
                var payloadSize = stream.ReadInt32();
                aggregateTransactionHeader_Reserved1 = stream.ReadInt32();
                transactions = GeneratorUtils.LoadFromBinaryArrayRemaining(EmbeddedTransactionHelper.LoadFromBinary, stream, payloadSize, 8);
                cosignatures = GeneratorUtils.LoadFromBinaryArrayRemaining(CosignatureBuilder.LoadFromBinary, stream, 0);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AggregateTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AggregateTransactionBodyBuilder.
        */
        public static AggregateTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new AggregateTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param transactionsHash Aggregate hash of an aggregate's transactions.
        * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
        * @param cosignatures Cosignatures data (fills remaining body space after transactions).
        */
        internal AggregateTransactionBodyBuilder(Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures)
        {
            GeneratorUtils.NotNull(transactionsHash, "transactionsHash is null");
            GeneratorUtils.NotNull(transactions, "transactions is null");
            GeneratorUtils.NotNull(cosignatures, "cosignatures is null");
            this.transactionsHash = transactionsHash;
            this.aggregateTransactionHeader_Reserved1 = 0;
            this.transactions = transactions;
            this.cosignatures = cosignatures;
        }
        
        /*
        * Creates an instance of AggregateTransactionBodyBuilder.
        *
        * @param transactionsHash Aggregate hash of an aggregate's transactions.
        * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
        * @param cosignatures Cosignatures data (fills remaining body space after transactions).
        * @return Instance of AggregateTransactionBodyBuilder.
        */
        public static  AggregateTransactionBodyBuilder Create(Hash256Dto transactionsHash, List<EmbeddedTransactionBuilder> transactions, List<CosignatureBuilder> cosignatures) {
            return new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
        }

        /*
        * Gets aggregate hash of an aggregate's transactions.
        *
        * @return Aggregate hash of an aggregate's transactions.
        */
        public Hash256Dto GetTransactionsHash() {
            return transactionsHash;
        }

        /*
        * Gets reserved padding to align end of AggregateTransactionHeader on 8-byte boundary.
        *
        * @return Reserved padding to align end of AggregateTransactionHeader on 8-byte boundary.
        */
        private int GetAggregateTransactionHeader_Reserved1() {
            return aggregateTransactionHeader_Reserved1;
        }

        /*
        * Gets sub-transaction data (transactions are variable sized and payload size is in bytes).
        *
        * @return Sub-transaction data (transactions are variable sized and payload size is in bytes).
        */
        public List<EmbeddedTransactionBuilder> GetTransactions() {
            return transactions;
        }

        /*
        * Gets cosignatures data (fills remaining body space after transactions).
        *
        * @return Cosignatures data (fills remaining body space after transactions).
        */
        public List<CosignatureBuilder> GetCosignatures() {
            return cosignatures;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += transactionsHash.GetSize();
            size += 4; // payloadSize
            size += 4; // aggregateTransactionHeader_Reserved1
            size +=  GeneratorUtils.GetSumSize(transactions, 8);
            size +=  GeneratorUtils.GetSumSize(cosignatures, 0);
            return size;
        }



    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var transactionsHashEntityBytes = (transactionsHash).Serialize();
            bw.Write(transactionsHashEntityBytes, 0, transactionsHashEntityBytes.Length);
            var size = 0;
            foreach (var i in GetTransactions())
            {
                //size += i.GetStreamSize();
                size += i.GetSize();
                size += GeneratorUtils.GetPadding(size, 8);
            }
            bw.Write(size);
            bw.Write(GetAggregateTransactionHeader_Reserved1());
            GeneratorUtils.WriteList(bw, transactions, 8);
            GeneratorUtils.WriteList(bw, cosignatures, 0);
            var result = ms.ToArray();
            return result;
        }
    }
}

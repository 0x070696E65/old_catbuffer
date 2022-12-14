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
    * Binary layout for an embedded hash lock transaction
    */
    [Serializable]
    public class EmbeddedHashLockTransactionBuilder: EmbeddedTransactionBuilder {

        /* Hash lock transaction body. */
        public HashLockTransactionBodyBuilder hashLockTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedHashLockTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                hashLockTransactionBody = HashLockTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedHashLockTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedHashLockTransactionBuilder.
        */
        public new static EmbeddedHashLockTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedHashLockTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param mosaic Lock mosaic.
        * @param duration Number of blocks for which a lock should be valid.
        * @param hash Lock hash.
        */
        internal EmbeddedHashLockTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(mosaic, "mosaic is null");
            GeneratorUtils.NotNull(duration, "duration is null");
            GeneratorUtils.NotNull(hash, "hash is null");
            this.hashLockTransactionBody = new HashLockTransactionBodyBuilder(mosaic, duration, hash);
        }
        
        /*
        * Creates an instance of EmbeddedHashLockTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param mosaic Lock mosaic.
        * @param duration Number of blocks for which a lock should be valid.
        * @param hash Lock hash.
        * @return Instance of EmbeddedHashLockTransactionBuilder.
        */
        public static  EmbeddedHashLockTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
            return new EmbeddedHashLockTransactionBuilder(signerPublicKey, version, network, type, mosaic, duration, hash);
        }

        /*
        * Gets lock mosaic.
        *
        * @return Lock mosaic.
        */
        public UnresolvedMosaicBuilder GetMosaic() {
            return hashLockTransactionBody.GetMosaic();
        }

        /*
        * Gets number of blocks for which a lock should be valid.
        *
        * @return Number of blocks for which a lock should be valid.
        */
        public BlockDurationDto GetDuration() {
            return hashLockTransactionBody.GetDuration();
        }

        /*
        * Gets lock hash.
        *
        * @return Lock hash.
        */
        public Hash256Dto GetHash() {
            return hashLockTransactionBody.GetHash();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += hashLockTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new HashLockTransactionBodyBuilder GetBody() {
            return hashLockTransactionBody;
        }


    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public override byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var superBytes = base.Serialize();
            bw.Write(superBytes, 0, superBytes.Length);
            var hashLockTransactionBodyEntityBytes = (hashLockTransactionBody).Serialize();
            bw.Write(hashLockTransactionBodyEntityBytes, 0, hashLockTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for a non-embedded hash lock transaction
    */
    [Serializable]
    public class HashLockTransactionBuilder: TransactionBuilder {

        /* Hash lock transaction body. */
        public HashLockTransactionBodyBuilder hashLockTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal HashLockTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                hashLockTransactionBody = HashLockTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of HashLockTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of HashLockTransactionBuilder.
        */
        public new static HashLockTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new HashLockTransactionBuilder(stream);
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
        * @param mosaic Lock mosaic.
        * @param duration Number of blocks for which a lock should be valid.
        * @param hash Lock hash.
        */
        internal HashLockTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(mosaic, "mosaic is null");
            GeneratorUtils.NotNull(duration, "duration is null");
            GeneratorUtils.NotNull(hash, "hash is null");
            this.hashLockTransactionBody = new HashLockTransactionBodyBuilder(mosaic, duration, hash);
        }
        
        /*
        * Creates an instance of HashLockTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param mosaic Lock mosaic.
        * @param duration Number of blocks for which a lock should be valid.
        * @param hash Lock hash.
        * @return Instance of HashLockTransactionBuilder.
        */
        public static  HashLockTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, Hash256Dto hash) {
            return new HashLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash);
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
    //Transaction
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
        public new byte[] Serialize() {
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

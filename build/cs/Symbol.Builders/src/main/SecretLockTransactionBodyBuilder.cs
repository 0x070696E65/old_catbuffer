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
    * Binary layout for a secret lock transaction
    */
    [Serializable]
    public class SecretLockTransactionBodyBuilder: ISerializer {

        /* Locked mosaic recipient address. */
        public UnresolvedAddressDto recipientAddress;
        /* Secret. */
        public Hash256Dto secret;
        /* Locked mosaic. */
        public UnresolvedMosaicBuilder mosaic;
        /* Number of blocks for which a lock should be valid. */
        public BlockDurationDto duration;
        /* Hash algorithm. */
        public LockHashAlgorithmDto hashAlgorithm;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal SecretLockTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                recipientAddress = UnresolvedAddressDto.LoadFromBinary(stream);
                secret = Hash256Dto.LoadFromBinary(stream);
                mosaic = UnresolvedMosaicBuilder.LoadFromBinary(stream);
                duration = BlockDurationDto.LoadFromBinary(stream);
                hashAlgorithm = (LockHashAlgorithmDto)Enum.ToObject(typeof(LockHashAlgorithmDto), (byte)stream.ReadByte());
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of SecretLockTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of SecretLockTransactionBodyBuilder.
        */
        public static SecretLockTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new SecretLockTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param recipientAddress Locked mosaic recipient address.
        * @param secret Secret.
        * @param mosaic Locked mosaic.
        * @param duration Number of blocks for which a lock should be valid.
        * @param hashAlgorithm Hash algorithm.
        */
        internal SecretLockTransactionBodyBuilder(UnresolvedAddressDto recipientAddress, Hash256Dto secret, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, LockHashAlgorithmDto hashAlgorithm)
        {
            GeneratorUtils.NotNull(recipientAddress, "recipientAddress is null");
            GeneratorUtils.NotNull(secret, "secret is null");
            GeneratorUtils.NotNull(mosaic, "mosaic is null");
            GeneratorUtils.NotNull(duration, "duration is null");
            GeneratorUtils.NotNull(hashAlgorithm, "hashAlgorithm is null");
            this.recipientAddress = recipientAddress;
            this.secret = secret;
            this.mosaic = mosaic;
            this.duration = duration;
            this.hashAlgorithm = hashAlgorithm;
        }
        
        /*
        * Creates an instance of SecretLockTransactionBodyBuilder.
        *
        * @param recipientAddress Locked mosaic recipient address.
        * @param secret Secret.
        * @param mosaic Locked mosaic.
        * @param duration Number of blocks for which a lock should be valid.
        * @param hashAlgorithm Hash algorithm.
        * @return Instance of SecretLockTransactionBodyBuilder.
        */
        public static  SecretLockTransactionBodyBuilder Create(UnresolvedAddressDto recipientAddress, Hash256Dto secret, UnresolvedMosaicBuilder mosaic, BlockDurationDto duration, LockHashAlgorithmDto hashAlgorithm) {
            return new SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
        }

        /*
        * Gets locked mosaic recipient address.
        *
        * @return Locked mosaic recipient address.
        */
        public UnresolvedAddressDto GetRecipientAddress() {
            return recipientAddress;
        }

        /*
        * Gets secret.
        *
        * @return Secret.
        */
        public Hash256Dto GetSecret() {
            return secret;
        }

        /*
        * Gets locked mosaic.
        *
        * @return Locked mosaic.
        */
        public UnresolvedMosaicBuilder GetMosaic() {
            return mosaic;
        }

        /*
        * Gets number of blocks for which a lock should be valid.
        *
        * @return Number of blocks for which a lock should be valid.
        */
        public BlockDurationDto GetDuration() {
            return duration;
        }

        /*
        * Gets hash algorithm.
        *
        * @return Hash algorithm.
        */
        public LockHashAlgorithmDto GetHashAlgorithm() {
            return hashAlgorithm;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += recipientAddress.GetSize();
            size += secret.GetSize();
            size += mosaic.GetSize();
            size += duration.GetSize();
            size += hashAlgorithm.GetSize();
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
            var recipientAddressEntityBytes = (recipientAddress).Serialize();
            bw.Write(recipientAddressEntityBytes, 0, recipientAddressEntityBytes.Length);
            var secretEntityBytes = (secret).Serialize();
            bw.Write(secretEntityBytes, 0, secretEntityBytes.Length);
            var mosaicEntityBytes = (mosaic).Serialize();
            bw.Write(mosaicEntityBytes, 0, mosaicEntityBytes.Length);
            var durationEntityBytes = (duration).Serialize();
            bw.Write(durationEntityBytes, 0, durationEntityBytes.Length);
            var hashAlgorithmEntityBytes = (hashAlgorithm).Serialize();
            bw.Write(hashAlgorithmEntityBytes, 0, hashAlgorithmEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

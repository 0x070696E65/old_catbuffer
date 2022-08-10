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
    * Binary layout for an embedded mosaic definition transaction
    */
    [Serializable]
    public class EmbeddedMosaicDefinitionTransactionBuilder: EmbeddedTransactionBuilder {

        /* Mosaic definition transaction body. */
        public MosaicDefinitionTransactionBodyBuilder mosaicDefinitionTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedMosaicDefinitionTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedMosaicDefinitionTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedMosaicDefinitionTransactionBuilder.
        */
        public new static EmbeddedMosaicDefinitionTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedMosaicDefinitionTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param id Mosaic identifier.
        * @param duration Mosaic duration.
        * @param nonce Mosaic nonce.
        * @param flags Mosaic flags.
        * @param divisibility Mosaic divisibility.
        */
        internal EmbeddedMosaicDefinitionTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, List<MosaicFlagsDto> flags, byte divisibility)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(id, "id is null");
            GeneratorUtils.NotNull(duration, "duration is null");
            GeneratorUtils.NotNull(nonce, "nonce is null");
            GeneratorUtils.NotNull(flags, "flags is null");
            GeneratorUtils.NotNull(divisibility, "divisibility is null");
            this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
        }
        
        /*
        * Creates an instance of EmbeddedMosaicDefinitionTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param id Mosaic identifier.
        * @param duration Mosaic duration.
        * @param nonce Mosaic nonce.
        * @param flags Mosaic flags.
        * @param divisibility Mosaic divisibility.
        * @return Instance of EmbeddedMosaicDefinitionTransactionBuilder.
        */
        public static  EmbeddedMosaicDefinitionTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, List<MosaicFlagsDto> flags, byte divisibility) {
            return new EmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility);
        }

        /*
        * Gets mosaic identifier.
        *
        * @return Mosaic identifier.
        */
        public MosaicIdDto GetId() {
            return mosaicDefinitionTransactionBody.GetId();
        }

        /*
        * Gets mosaic duration.
        *
        * @return Mosaic duration.
        */
        public BlockDurationDto GetDuration() {
            return mosaicDefinitionTransactionBody.GetDuration();
        }

        /*
        * Gets mosaic nonce.
        *
        * @return Mosaic nonce.
        */
        public MosaicNonceDto GetNonce() {
            return mosaicDefinitionTransactionBody.GetNonce();
        }

        /*
        * Gets mosaic flags.
        *
        * @return Mosaic flags.
        */
        public List<MosaicFlagsDto> GetFlags() {
            return mosaicDefinitionTransactionBody.GetFlags();
        }

        /*
        * Gets mosaic divisibility.
        *
        * @return Mosaic divisibility.
        */
        public byte GetDivisibility() {
            return mosaicDefinitionTransactionBody.GetDivisibility();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += mosaicDefinitionTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new MosaicDefinitionTransactionBodyBuilder GetBody() {
            return mosaicDefinitionTransactionBody;
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
            var mosaicDefinitionTransactionBodyEntityBytes = (mosaicDefinitionTransactionBody).Serialize();
            bw.Write(mosaicDefinitionTransactionBodyEntityBytes, 0, mosaicDefinitionTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

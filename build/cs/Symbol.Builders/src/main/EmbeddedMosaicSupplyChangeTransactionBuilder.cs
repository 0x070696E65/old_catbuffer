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
    * Binary layout for an embedded mosaic supply change transaction
    */
    [Serializable]
    public class EmbeddedMosaicSupplyChangeTransactionBuilder: EmbeddedTransactionBuilder {

        /* Mosaic supply change transaction body. */
        public MosaicSupplyChangeTransactionBodyBuilder mosaicSupplyChangeTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedMosaicSupplyChangeTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedMosaicSupplyChangeTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
        */
        public new static EmbeddedMosaicSupplyChangeTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedMosaicSupplyChangeTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param mosaicId Affected mosaic identifier.
        * @param delta Change amount.
        * @param action Supply change action.
        */
        internal EmbeddedMosaicSupplyChangeTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicIdDto mosaicId, AmountDto delta, MosaicSupplyChangeActionDto action)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(mosaicId, "mosaicId is null");
            GeneratorUtils.NotNull(delta, "delta is null");
            GeneratorUtils.NotNull(action, "action is null");
            this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
        }
        
        /*
        * Creates an instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param mosaicId Affected mosaic identifier.
        * @param delta Change amount.
        * @param action Supply change action.
        * @return Instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
        */
        public static  EmbeddedMosaicSupplyChangeTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicIdDto mosaicId, AmountDto delta, MosaicSupplyChangeActionDto action) {
            return new EmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey, version, network, type, mosaicId, delta, action);
        }

        /*
        * Gets affected mosaic identifier.
        *
        * @return Affected mosaic identifier.
        */
        public UnresolvedMosaicIdDto GetMosaicId() {
            return mosaicSupplyChangeTransactionBody.GetMosaicId();
        }

        /*
        * Gets change amount.
        *
        * @return Change amount.
        */
        public AmountDto GetDelta() {
            return mosaicSupplyChangeTransactionBody.GetDelta();
        }

        /*
        * Gets supply change action.
        *
        * @return Supply change action.
        */
        public MosaicSupplyChangeActionDto GetAction() {
            return mosaicSupplyChangeTransactionBody.GetAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += mosaicSupplyChangeTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new MosaicSupplyChangeTransactionBodyBuilder GetBody() {
            return mosaicSupplyChangeTransactionBody;
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
            var mosaicSupplyChangeTransactionBodyEntityBytes = (mosaicSupplyChangeTransactionBody).Serialize();
            bw.Write(mosaicSupplyChangeTransactionBodyEntityBytes, 0, mosaicSupplyChangeTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

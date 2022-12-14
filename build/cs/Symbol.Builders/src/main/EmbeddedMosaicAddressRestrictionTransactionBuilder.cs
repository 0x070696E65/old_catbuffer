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
    * Binary layout for an embedded mosaic address restriction transaction
    */
    [Serializable]
    public class EmbeddedMosaicAddressRestrictionTransactionBuilder: EmbeddedTransactionBuilder {

        /* Mosaic address restriction transaction body. */
        public MosaicAddressRestrictionTransactionBodyBuilder mosaicAddressRestrictionTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedMosaicAddressRestrictionTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedMosaicAddressRestrictionTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
        */
        public new static EmbeddedMosaicAddressRestrictionTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedMosaicAddressRestrictionTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param mosaicId Identifier of the mosaic to which the restriction applies.
        * @param restrictionKey Restriction key.
        * @param previousRestrictionValue Previous restriction value.
        * @param newRestrictionValue New restriction value.
        * @param targetAddress Address being restricted.
        */
        internal EmbeddedMosaicAddressRestrictionTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicIdDto mosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, UnresolvedAddressDto targetAddress)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(mosaicId, "mosaicId is null");
            GeneratorUtils.NotNull(restrictionKey, "restrictionKey is null");
            GeneratorUtils.NotNull(previousRestrictionValue, "previousRestrictionValue is null");
            GeneratorUtils.NotNull(newRestrictionValue, "newRestrictionValue is null");
            GeneratorUtils.NotNull(targetAddress, "targetAddress is null");
            this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
        }
        
        /*
        * Creates an instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param mosaicId Identifier of the mosaic to which the restriction applies.
        * @param restrictionKey Restriction key.
        * @param previousRestrictionValue Previous restriction value.
        * @param newRestrictionValue New restriction value.
        * @param targetAddress Address being restricted.
        * @return Instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
        */
        public static  EmbeddedMosaicAddressRestrictionTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicIdDto mosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, UnresolvedAddressDto targetAddress) {
            return new EmbeddedMosaicAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
        }

        /*
        * Gets identifier of the mosaic to which the restriction applies.
        *
        * @return Identifier of the mosaic to which the restriction applies.
        */
        public UnresolvedMosaicIdDto GetMosaicId() {
            return mosaicAddressRestrictionTransactionBody.GetMosaicId();
        }

        /*
        * Gets restriction key.
        *
        * @return Restriction key.
        */
        public long GetRestrictionKey() {
            return mosaicAddressRestrictionTransactionBody.GetRestrictionKey();
        }

        /*
        * Gets previous restriction value.
        *
        * @return Previous restriction value.
        */
        public long GetPreviousRestrictionValue() {
            return mosaicAddressRestrictionTransactionBody.GetPreviousRestrictionValue();
        }

        /*
        * Gets new restriction value.
        *
        * @return New restriction value.
        */
        public long GetNewRestrictionValue() {
            return mosaicAddressRestrictionTransactionBody.GetNewRestrictionValue();
        }

        /*
        * Gets address being restricted.
        *
        * @return Address being restricted.
        */
        public UnresolvedAddressDto GetTargetAddress() {
            return mosaicAddressRestrictionTransactionBody.GetTargetAddress();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += mosaicAddressRestrictionTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new MosaicAddressRestrictionTransactionBodyBuilder GetBody() {
            return mosaicAddressRestrictionTransactionBody;
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
            var mosaicAddressRestrictionTransactionBodyEntityBytes = (mosaicAddressRestrictionTransactionBody).Serialize();
            bw.Write(mosaicAddressRestrictionTransactionBodyEntityBytes, 0, mosaicAddressRestrictionTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

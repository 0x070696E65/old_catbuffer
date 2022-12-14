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
    * Binary layout for a non-embedded mosaic global restriction transaction
    */
    [Serializable]
    public class MosaicGlobalRestrictionTransactionBuilder: TransactionBuilder {

        /* Mosaic global restriction transaction body. */
        public MosaicGlobalRestrictionTransactionBodyBuilder mosaicGlobalRestrictionTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal MosaicGlobalRestrictionTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of MosaicGlobalRestrictionTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of MosaicGlobalRestrictionTransactionBuilder.
        */
        public new static MosaicGlobalRestrictionTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new MosaicGlobalRestrictionTransactionBuilder(stream);
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
        * @param mosaicId Identifier of the mosaic being restricted.
        * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
        * @param restrictionKey Restriction key relative to the reference mosaic identifier.
        * @param previousRestrictionValue Previous restriction value.
        * @param newRestrictionValue New restriction value.
        * @param previousRestrictionType Previous restriction type.
        * @param newRestrictionType New restriction type.
        */
        internal MosaicGlobalRestrictionTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicIdDto mosaicId, UnresolvedMosaicIdDto referenceMosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, MosaicRestrictionTypeDto previousRestrictionType, MosaicRestrictionTypeDto newRestrictionType)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(mosaicId, "mosaicId is null");
            GeneratorUtils.NotNull(referenceMosaicId, "referenceMosaicId is null");
            GeneratorUtils.NotNull(restrictionKey, "restrictionKey is null");
            GeneratorUtils.NotNull(previousRestrictionValue, "previousRestrictionValue is null");
            GeneratorUtils.NotNull(newRestrictionValue, "newRestrictionValue is null");
            GeneratorUtils.NotNull(previousRestrictionType, "previousRestrictionType is null");
            GeneratorUtils.NotNull(newRestrictionType, "newRestrictionType is null");
            this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
        }
        
        /*
        * Creates an instance of MosaicGlobalRestrictionTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param mosaicId Identifier of the mosaic being restricted.
        * @param referenceMosaicId Identifier of the mosaic providing the restriction key.
        * @param restrictionKey Restriction key relative to the reference mosaic identifier.
        * @param previousRestrictionValue Previous restriction value.
        * @param newRestrictionValue New restriction value.
        * @param previousRestrictionType Previous restriction type.
        * @param newRestrictionType New restriction type.
        * @return Instance of MosaicGlobalRestrictionTransactionBuilder.
        */
        public static  MosaicGlobalRestrictionTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedMosaicIdDto mosaicId, UnresolvedMosaicIdDto referenceMosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, MosaicRestrictionTypeDto previousRestrictionType, MosaicRestrictionTypeDto newRestrictionType) {
            return new MosaicGlobalRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
        }

        /*
        * Gets identifier of the mosaic being restricted.
        *
        * @return Identifier of the mosaic being restricted.
        */
        public UnresolvedMosaicIdDto GetMosaicId() {
            return mosaicGlobalRestrictionTransactionBody.GetMosaicId();
        }

        /*
        * Gets identifier of the mosaic providing the restriction key.
        *
        * @return Identifier of the mosaic providing the restriction key.
        */
        public UnresolvedMosaicIdDto GetReferenceMosaicId() {
            return mosaicGlobalRestrictionTransactionBody.GetReferenceMosaicId();
        }

        /*
        * Gets restriction key relative to the reference mosaic identifier.
        *
        * @return Restriction key relative to the reference mosaic identifier.
        */
        public long GetRestrictionKey() {
            return mosaicGlobalRestrictionTransactionBody.GetRestrictionKey();
        }

        /*
        * Gets previous restriction value.
        *
        * @return Previous restriction value.
        */
        public long GetPreviousRestrictionValue() {
            return mosaicGlobalRestrictionTransactionBody.GetPreviousRestrictionValue();
        }

        /*
        * Gets new restriction value.
        *
        * @return New restriction value.
        */
        public long GetNewRestrictionValue() {
            return mosaicGlobalRestrictionTransactionBody.GetNewRestrictionValue();
        }

        /*
        * Gets previous restriction type.
        *
        * @return Previous restriction type.
        */
        public MosaicRestrictionTypeDto GetPreviousRestrictionType() {
            return mosaicGlobalRestrictionTransactionBody.GetPreviousRestrictionType();
        }

        /*
        * Gets new restriction type.
        *
        * @return New restriction type.
        */
        public MosaicRestrictionTypeDto GetNewRestrictionType() {
            return mosaicGlobalRestrictionTransactionBody.GetNewRestrictionType();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += mosaicGlobalRestrictionTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new MosaicGlobalRestrictionTransactionBodyBuilder GetBody() {
            return mosaicGlobalRestrictionTransactionBody;
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
            var mosaicGlobalRestrictionTransactionBodyEntityBytes = (mosaicGlobalRestrictionTransactionBody).Serialize();
            bw.Write(mosaicGlobalRestrictionTransactionBodyEntityBytes, 0, mosaicGlobalRestrictionTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

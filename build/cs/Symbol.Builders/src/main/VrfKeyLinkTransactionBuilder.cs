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
    * Binary layout for a non-embedded vrf key link transaction
    */
    [Serializable]
    public class VrfKeyLinkTransactionBuilder: TransactionBuilder {

        /* Vrf key link transaction body. */
        public VrfKeyLinkTransactionBodyBuilder vrfKeyLinkTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal VrfKeyLinkTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of VrfKeyLinkTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of VrfKeyLinkTransactionBuilder.
        */
        public new static VrfKeyLinkTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new VrfKeyLinkTransactionBuilder(stream);
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
        * @param linkedPublicKey Linked public key.
        * @param linkAction Link action.
        */
        internal VrfKeyLinkTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, KeyDto linkedPublicKey, LinkActionDto linkAction)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(linkedPublicKey, "linkedPublicKey is null");
            GeneratorUtils.NotNull(linkAction, "linkAction is null");
            this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
        }
        
        /*
        * Creates an instance of VrfKeyLinkTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param linkedPublicKey Linked public key.
        * @param linkAction Link action.
        * @return Instance of VrfKeyLinkTransactionBuilder.
        */
        public static  VrfKeyLinkTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, KeyDto linkedPublicKey, LinkActionDto linkAction) {
            return new VrfKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction);
        }

        /*
        * Gets linked public key.
        *
        * @return Linked public key.
        */
        public KeyDto GetLinkedPublicKey() {
            return vrfKeyLinkTransactionBody.GetLinkedPublicKey();
        }

        /*
        * Gets link action.
        *
        * @return Link action.
        */
        public LinkActionDto GetLinkAction() {
            return vrfKeyLinkTransactionBody.GetLinkAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += vrfKeyLinkTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new VrfKeyLinkTransactionBodyBuilder GetBody() {
            return vrfKeyLinkTransactionBody;
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
            var vrfKeyLinkTransactionBodyEntityBytes = (vrfKeyLinkTransactionBody).Serialize();
            bw.Write(vrfKeyLinkTransactionBodyEntityBytes, 0, vrfKeyLinkTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

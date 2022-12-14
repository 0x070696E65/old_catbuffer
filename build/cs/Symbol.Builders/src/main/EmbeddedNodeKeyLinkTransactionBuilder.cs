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
    * Binary layout for an embedded node key link transaction
    */
    [Serializable]
    public class EmbeddedNodeKeyLinkTransactionBuilder: EmbeddedTransactionBuilder {

        /* Node key link transaction body. */
        public NodeKeyLinkTransactionBodyBuilder nodeKeyLinkTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedNodeKeyLinkTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedNodeKeyLinkTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedNodeKeyLinkTransactionBuilder.
        */
        public new static EmbeddedNodeKeyLinkTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedNodeKeyLinkTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param linkedPublicKey Linked public key.
        * @param linkAction Link action.
        */
        internal EmbeddedNodeKeyLinkTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, KeyDto linkedPublicKey, LinkActionDto linkAction)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(linkedPublicKey, "linkedPublicKey is null");
            GeneratorUtils.NotNull(linkAction, "linkAction is null");
            this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
        }
        
        /*
        * Creates an instance of EmbeddedNodeKeyLinkTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param linkedPublicKey Linked public key.
        * @param linkAction Link action.
        * @return Instance of EmbeddedNodeKeyLinkTransactionBuilder.
        */
        public static  EmbeddedNodeKeyLinkTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, KeyDto linkedPublicKey, LinkActionDto linkAction) {
            return new EmbeddedNodeKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
        }

        /*
        * Gets linked public key.
        *
        * @return Linked public key.
        */
        public KeyDto GetLinkedPublicKey() {
            return nodeKeyLinkTransactionBody.GetLinkedPublicKey();
        }

        /*
        * Gets link action.
        *
        * @return Link action.
        */
        public LinkActionDto GetLinkAction() {
            return nodeKeyLinkTransactionBody.GetLinkAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += nodeKeyLinkTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new NodeKeyLinkTransactionBodyBuilder GetBody() {
            return nodeKeyLinkTransactionBody;
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
            var nodeKeyLinkTransactionBodyEntityBytes = (nodeKeyLinkTransactionBody).Serialize();
            bw.Write(nodeKeyLinkTransactionBodyEntityBytes, 0, nodeKeyLinkTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for an embedded account key link transaction
    */
    [Serializable]
    public class EmbeddedAccountKeyLinkTransactionBuilder: EmbeddedTransactionBuilder {

        /* Account key link transaction body. */
        public AccountKeyLinkTransactionBodyBuilder accountKeyLinkTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedAccountKeyLinkTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedAccountKeyLinkTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedAccountKeyLinkTransactionBuilder.
        */
        public new static EmbeddedAccountKeyLinkTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedAccountKeyLinkTransactionBuilder(stream);
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
        internal EmbeddedAccountKeyLinkTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, KeyDto linkedPublicKey, LinkActionDto linkAction)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(linkedPublicKey, "linkedPublicKey is null");
            GeneratorUtils.NotNull(linkAction, "linkAction is null");
            this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
        }
        
        /*
        * Creates an instance of EmbeddedAccountKeyLinkTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param linkedPublicKey Linked public key.
        * @param linkAction Link action.
        * @return Instance of EmbeddedAccountKeyLinkTransactionBuilder.
        */
        public static  EmbeddedAccountKeyLinkTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, KeyDto linkedPublicKey, LinkActionDto linkAction) {
            return new EmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
        }

        /*
        * Gets linked public key.
        *
        * @return Linked public key.
        */
        public KeyDto GetLinkedPublicKey() {
            return accountKeyLinkTransactionBody.GetLinkedPublicKey();
        }

        /*
        * Gets link action.
        *
        * @return Link action.
        */
        public LinkActionDto GetLinkAction() {
            return accountKeyLinkTransactionBody.GetLinkAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += accountKeyLinkTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AccountKeyLinkTransactionBodyBuilder GetBody() {
            return accountKeyLinkTransactionBody;
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
            var accountKeyLinkTransactionBodyEntityBytes = (accountKeyLinkTransactionBody).Serialize();
            bw.Write(accountKeyLinkTransactionBodyEntityBytes, 0, accountKeyLinkTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

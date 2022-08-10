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
    * Binary layout for an embedded voting key link transaction
    */
    [Serializable]
    public class EmbeddedVotingKeyLinkTransactionBuilder: EmbeddedTransactionBuilder {

        /* Voting key link transaction body. */
        public VotingKeyLinkTransactionBodyBuilder votingKeyLinkTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedVotingKeyLinkTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedVotingKeyLinkTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedVotingKeyLinkTransactionBuilder.
        */
        public new static EmbeddedVotingKeyLinkTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedVotingKeyLinkTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param linkedPublicKey Linked public key.
        * @param startEpoch Start finalization epoch.
        * @param endEpoch End finalization epoch.
        * @param linkAction Link action.
        */
        internal EmbeddedVotingKeyLinkTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(linkedPublicKey, "linkedPublicKey is null");
            GeneratorUtils.NotNull(startEpoch, "startEpoch is null");
            GeneratorUtils.NotNull(endEpoch, "endEpoch is null");
            GeneratorUtils.NotNull(linkAction, "linkAction is null");
            this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
        }
        
        /*
        * Creates an instance of EmbeddedVotingKeyLinkTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param linkedPublicKey Linked public key.
        * @param startEpoch Start finalization epoch.
        * @param endEpoch End finalization epoch.
        * @param linkAction Link action.
        * @return Instance of EmbeddedVotingKeyLinkTransactionBuilder.
        */
        public static  EmbeddedVotingKeyLinkTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction) {
            return new EmbeddedVotingKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction);
        }

        /*
        * Gets linked public key.
        *
        * @return Linked public key.
        */
        public VotingKeyDto GetLinkedPublicKey() {
            return votingKeyLinkTransactionBody.GetLinkedPublicKey();
        }

        /*
        * Gets start finalization epoch.
        *
        * @return Start finalization epoch.
        */
        public FinalizationEpochDto GetStartEpoch() {
            return votingKeyLinkTransactionBody.GetStartEpoch();
        }

        /*
        * Gets end finalization epoch.
        *
        * @return End finalization epoch.
        */
        public FinalizationEpochDto GetEndEpoch() {
            return votingKeyLinkTransactionBody.GetEndEpoch();
        }

        /*
        * Gets link action.
        *
        * @return Link action.
        */
        public LinkActionDto GetLinkAction() {
            return votingKeyLinkTransactionBody.GetLinkAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += votingKeyLinkTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new VotingKeyLinkTransactionBodyBuilder GetBody() {
            return votingKeyLinkTransactionBody;
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
            var votingKeyLinkTransactionBodyEntityBytes = (votingKeyLinkTransactionBody).Serialize();
            bw.Write(votingKeyLinkTransactionBodyEntityBytes, 0, votingKeyLinkTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

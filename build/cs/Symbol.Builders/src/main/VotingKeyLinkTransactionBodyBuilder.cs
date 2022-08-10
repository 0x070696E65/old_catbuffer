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
    * Binary layout for a voting key link transaction
    */
    [Serializable]
    public class VotingKeyLinkTransactionBodyBuilder: ISerializer {

        /* Linked public key. */
        public VotingKeyDto linkedPublicKey;
        /* Start finalization epoch. */
        public FinalizationEpochDto startEpoch;
        /* End finalization epoch. */
        public FinalizationEpochDto endEpoch;
        /* Link action. */
        public LinkActionDto linkAction;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal VotingKeyLinkTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                linkedPublicKey = VotingKeyDto.LoadFromBinary(stream);
                startEpoch = FinalizationEpochDto.LoadFromBinary(stream);
                endEpoch = FinalizationEpochDto.LoadFromBinary(stream);
                linkAction = (LinkActionDto)Enum.ToObject(typeof(LinkActionDto), (byte)stream.ReadByte());
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of VotingKeyLinkTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of VotingKeyLinkTransactionBodyBuilder.
        */
        public static VotingKeyLinkTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new VotingKeyLinkTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param linkedPublicKey Linked public key.
        * @param startEpoch Start finalization epoch.
        * @param endEpoch End finalization epoch.
        * @param linkAction Link action.
        */
        internal VotingKeyLinkTransactionBodyBuilder(VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction)
        {
            GeneratorUtils.NotNull(linkedPublicKey, "linkedPublicKey is null");
            GeneratorUtils.NotNull(startEpoch, "startEpoch is null");
            GeneratorUtils.NotNull(endEpoch, "endEpoch is null");
            GeneratorUtils.NotNull(linkAction, "linkAction is null");
            this.linkedPublicKey = linkedPublicKey;
            this.startEpoch = startEpoch;
            this.endEpoch = endEpoch;
            this.linkAction = linkAction;
        }
        
        /*
        * Creates an instance of VotingKeyLinkTransactionBodyBuilder.
        *
        * @param linkedPublicKey Linked public key.
        * @param startEpoch Start finalization epoch.
        * @param endEpoch End finalization epoch.
        * @param linkAction Link action.
        * @return Instance of VotingKeyLinkTransactionBodyBuilder.
        */
        public static  VotingKeyLinkTransactionBodyBuilder Create(VotingKeyDto linkedPublicKey, FinalizationEpochDto startEpoch, FinalizationEpochDto endEpoch, LinkActionDto linkAction) {
            return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
        }

        /*
        * Gets linked public key.
        *
        * @return Linked public key.
        */
        public VotingKeyDto GetLinkedPublicKey() {
            return linkedPublicKey;
        }

        /*
        * Gets start finalization epoch.
        *
        * @return Start finalization epoch.
        */
        public FinalizationEpochDto GetStartEpoch() {
            return startEpoch;
        }

        /*
        * Gets end finalization epoch.
        *
        * @return End finalization epoch.
        */
        public FinalizationEpochDto GetEndEpoch() {
            return endEpoch;
        }

        /*
        * Gets link action.
        *
        * @return Link action.
        */
        public LinkActionDto GetLinkAction() {
            return linkAction;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += linkedPublicKey.GetSize();
            size += startEpoch.GetSize();
            size += endEpoch.GetSize();
            size += linkAction.GetSize();
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
            var linkedPublicKeyEntityBytes = (linkedPublicKey).Serialize();
            bw.Write(linkedPublicKeyEntityBytes, 0, linkedPublicKeyEntityBytes.Length);
            var startEpochEntityBytes = (startEpoch).Serialize();
            bw.Write(startEpochEntityBytes, 0, startEpochEntityBytes.Length);
            var endEpochEntityBytes = (endEpoch).Serialize();
            bw.Write(endEpochEntityBytes, 0, endEpochEntityBytes.Length);
            var linkActionEntityBytes = (linkAction).Serialize();
            bw.Write(linkActionEntityBytes, 0, linkActionEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

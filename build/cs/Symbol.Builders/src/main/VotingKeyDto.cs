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

namespace Symbol.Builders {

    /* Voting key. */
    [Serializable]
    public struct VotingKeyDto : ISerializer
    {
        /* Voting key. */
        private readonly byte[] votingKey;

        /*
         * Constructor.
         *
         * @param votingKey Voting key.
         */
        public VotingKeyDto(byte[] votingKey)
        {
            this.votingKey = votingKey;
        }

        /*
         * Constructor - Creates an object from stream.
         *
         * @param stream Byte stream to use to serialize.
         */
        public VotingKeyDto(BinaryReader stream)
        {
            try
            {
                this.votingKey = stream.ReadBytes(32);
            }
            catch
            {
                throw new Exception("VotingKeyDto: ERROR");
            }
        }

        /*
         * Gets Voting key.
         *
         * @return Voting key.
         */
        public byte[] GetVotingKey()
        {
            return this.votingKey;
        }

        /*
         * Gets the size of the object.
         *
         * @return Size in bytes.
         */
        public int GetSize()
        {
            return 32;
        }

        /*
         * Creates an instance of VotingKeyDto from a stream.
         *
         * @param stream Byte stream to use to serialize the object.
         * @return Instance of VotingKeyDto.
         */
        public static VotingKeyDto LoadFromBinary(BinaryReader stream)
        {
            return new VotingKeyDto(stream);
        }

        /*
         * Serializes an object to bytes.
         *
         * @return Serialized bytes.
         */
        public byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            bw.Write(this.votingKey, 0, this.votingKey.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}


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

    /* Block duration. */
    [Serializable]
    public struct BlockDurationDto : ISerializer
    {
        /* Block duration. */
        private readonly long blockDuration;

        /*
         * Constructor.
         *
         * @param blockDuration Block duration.
         */
        public BlockDurationDto(long blockDuration)
        {
            this.blockDuration = blockDuration;
        }

        /*
         * Constructor - Creates an object from stream.
         *
         * @param stream Byte stream to use to serialize.
         */
        public BlockDurationDto(BinaryReader stream)
        {
            try
            {
                this.blockDuration = stream.ReadInt64();
            }
            catch
            {
                throw new Exception("BlockDurationDto: ERROR");
            }
        }

        /*
         * Gets Block duration.
         *
         * @return Block duration.
         */
        public long GetBlockDuration()
        {
            return this.blockDuration;
        }

        /*
         * Gets the size of the object.
         *
         * @return Size in bytes.
         */
        public int GetSize()
        {
            return 8;
        }

        /*
         * Creates an instance of BlockDurationDto from a stream.
         *
         * @param stream Byte stream to use to serialize the object.
         * @return Instance of BlockDurationDto.
         */
        public static BlockDurationDto LoadFromBinary(BinaryReader stream)
        {
            return new BlockDurationDto(stream);
        }

        /*
         * Serializes an object to bytes.
         *
         * @return Serialized bytes.
         */
        public byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            bw.Write(this.GetBlockDuration());
            var result = ms.ToArray();
            return result;
        }
    }
}


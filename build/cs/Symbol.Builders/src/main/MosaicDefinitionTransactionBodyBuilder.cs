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
    * Binary layout for a mosaic definition transaction
    */
    [Serializable]
    public class MosaicDefinitionTransactionBodyBuilder: ISerializer {

        /* Mosaic identifier. */
        public MosaicIdDto id;
        /* Mosaic duration. */
        public BlockDurationDto duration;
        /* Mosaic nonce. */
        public MosaicNonceDto nonce;
        /* Mosaic flags. */
        public List<MosaicFlagsDto> flags;
        /* Mosaic divisibility. */
        public byte divisibility;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal MosaicDefinitionTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                id = MosaicIdDto.LoadFromBinary(stream);
                duration = BlockDurationDto.LoadFromBinary(stream);
                nonce = MosaicNonceDto.LoadFromBinary(stream);
                flags = GeneratorUtils.ToSet<MosaicFlagsDto>(stream.ReadByte());
                divisibility = stream.ReadByte();
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of MosaicDefinitionTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of MosaicDefinitionTransactionBodyBuilder.
        */
        public static MosaicDefinitionTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new MosaicDefinitionTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param id Mosaic identifier.
        * @param duration Mosaic duration.
        * @param nonce Mosaic nonce.
        * @param flags Mosaic flags.
        * @param divisibility Mosaic divisibility.
        */
        internal MosaicDefinitionTransactionBodyBuilder(MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, List<MosaicFlagsDto> flags, byte divisibility)
        {
            GeneratorUtils.NotNull(id, "id is null");
            GeneratorUtils.NotNull(duration, "duration is null");
            GeneratorUtils.NotNull(nonce, "nonce is null");
            GeneratorUtils.NotNull(flags, "flags is null");
            GeneratorUtils.NotNull(divisibility, "divisibility is null");
            this.id = id;
            this.duration = duration;
            this.nonce = nonce;
            this.flags = flags;
            this.divisibility = divisibility;
        }
        
        /*
        * Creates an instance of MosaicDefinitionTransactionBodyBuilder.
        *
        * @param id Mosaic identifier.
        * @param duration Mosaic duration.
        * @param nonce Mosaic nonce.
        * @param flags Mosaic flags.
        * @param divisibility Mosaic divisibility.
        * @return Instance of MosaicDefinitionTransactionBodyBuilder.
        */
        public static  MosaicDefinitionTransactionBodyBuilder Create(MosaicIdDto id, BlockDurationDto duration, MosaicNonceDto nonce, List<MosaicFlagsDto> flags, byte divisibility) {
            return new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
        }

        /*
        * Gets mosaic identifier.
        *
        * @return Mosaic identifier.
        */
        public MosaicIdDto GetId() {
            return id;
        }

        /*
        * Gets mosaic duration.
        *
        * @return Mosaic duration.
        */
        public BlockDurationDto GetDuration() {
            return duration;
        }

        /*
        * Gets mosaic nonce.
        *
        * @return Mosaic nonce.
        */
        public MosaicNonceDto GetNonce() {
            return nonce;
        }

        /*
        * Gets mosaic flags.
        *
        * @return Mosaic flags.
        */
        public List<MosaicFlagsDto> GetFlags() {
            return flags;
        }

        /*
        * Gets mosaic divisibility.
        *
        * @return Mosaic divisibility.
        */
        public byte GetDivisibility() {
            return divisibility;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += id.GetSize();
            size += duration.GetSize();
            size += nonce.GetSize();
            size += 1; // flags
            size += 1; // divisibility
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
            var idEntityBytes = (id).Serialize();
            bw.Write(idEntityBytes, 0, idEntityBytes.Length);
            var durationEntityBytes = (duration).Serialize();
            bw.Write(durationEntityBytes, 0, durationEntityBytes.Length);
            var nonceEntityBytes = (nonce).Serialize();
            bw.Write(nonceEntityBytes, 0, nonceEntityBytes.Length);
            bw.Write((byte)GeneratorUtils.ToLong(flags));
            bw.Write(GetDivisibility());
            var result = ms.ToArray();
            return result;
        }
    }
}

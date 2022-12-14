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
    * Binary layout for a receipt entity
    */
    [Serializable]
    public class ReceiptBuilder: ISerializer {

        /* Entity size. */
        public int size;
        /* Receipt version. */
        public short version;
        /* Receipt type. */
        public ReceiptTypeDto type;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal ReceiptBuilder(BinaryReader stream)
        {
            try {
                size = stream.ReadInt32();
                version = stream.ReadInt16();
                type = (ReceiptTypeDto)Enum.ToObject(typeof(ReceiptTypeDto), (short)stream.ReadInt16());
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of ReceiptBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of ReceiptBuilder.
        */
        public static ReceiptBuilder LoadFromBinary(BinaryReader stream) {
            return new ReceiptBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param version Receipt version.
        * @param type Receipt type.
        */
        internal ReceiptBuilder(short version, ReceiptTypeDto type)
        {
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(type, "type is null");
            this.version = version;
            this.type = type;
        }
        
        /*
        * Creates an instance of ReceiptBuilder.
        *
        * @param version Receipt version.
        * @param type Receipt type.
        * @return Instance of ReceiptBuilder.
        */
        public static  ReceiptBuilder Create(short version, ReceiptTypeDto type) {
            return new ReceiptBuilder(version, type);
        }

        /*
        * Gets entity size.
        *
        * @return Entity size.
        */
        public int GetStreamSize() {
            return size;
        }

        /*
        * Gets receipt version.
        *
        * @return Receipt version.
        */
        public short GetVersion() {
            return version;
        }

        /*
        * Gets receipt type.
        *
        * @return Receipt type.
        */
        public new ReceiptTypeDto GetType() {
            return type;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += 4; // size
            size += 2; // version
            size += type.GetSize();
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
            // bw.Write((int)GetStreamSize());
            bw.Write((int)GetSize());
            bw.Write(GetVersion());
            var typeEntityBytes = (type).Serialize();
            bw.Write(typeEntityBytes, 0, typeEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

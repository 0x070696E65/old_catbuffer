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

/*
* Enumeration of receipt types
*/

namespace Symbol.Builders {

    [Serializable]
    public enum ReceiptTypeDto {
        /* reserved receipt type. */
        RESERVED = 0,
        /* mosaic rental fee receipt type. */
        MOSAIC_RENTAL_FEE = 4685,
        /* namespace rental fee receipt type. */
        NAMESPACE_RENTAL_FEE = 4942,
        /* harvest fee receipt type. */
        HARVEST_FEE = 8515,
        /* lock hash completed receipt type. */
        LOCK_HASH_COMPLETED = 8776,
        /* lock hash expired receipt type. */
        LOCK_HASH_EXPIRED = 9032,
        /* lock secret completed receipt type. */
        LOCK_SECRET_COMPLETED = 8786,
        /* lock secret expired receipt type. */
        LOCK_SECRET_EXPIRED = 9042,
        /* lock hash created receipt type. */
        LOCK_HASH_CREATED = 12616,
        /* lock secret created receipt type. */
        LOCK_SECRET_CREATED = 12626,
        /* mosaic expired receipt type. */
        MOSAIC_EXPIRED = 16717,
        /* namespace expired receipt type. */
        NAMESPACE_EXPIRED = 16718,
        /* namespace deleted receipt type. */
        NAMESPACE_DELETED = 16974,
        /* inflation receipt type. */
        INFLATION = 20803,
        /* transaction group receipt type. */
        TRANSACTION_GROUP = 57667,
        /* address alias resolution receipt type. */
        ADDRESS_ALIAS_RESOLUTION = 61763,
        /* mosaic alias resolution receipt type. */
        MOSAIC_ALIAS_RESOLUTION = 62019,
    }
    
    public static class ReceiptTypeDtoExtensions
    {
        /* Enum value. */
        private static short value(this ReceiptTypeDto self) {
            return (short)self;
        }

        /*
        * Gets enum value.
        *
        * @param value Raw value of the enum.
        * @return Enum value.
        */
        public static ReceiptTypeDto RawValueOf(this ReceiptTypeDto self, short value) {
            foreach (ReceiptTypeDto current in Enum.GetValues(typeof(ReceiptTypeDto))) {
                if (value == (current.value()) {
                    return current;
                }
            }
            throw new Exception(value + " was not a backing value for ReceiptTypeDto.");
        }

        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public static int GetSize(this ReceiptTypeDto type)
        {
            return 2;
        }

        /*
        * Creates an instance of ReceiptTypeDto from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of ReceiptTypeDto.
        */
        public static ReceiptTypeDto LoadFromBinary(this ReceiptTypeDto self, BinaryReader stream) {
            try {
                short streamValue = stream.ReadInt16();
                return RawValueOf(self, streamValue);
            } catch(Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public static byte[] Serialize(this ReceiptTypeDto self) {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            bw.Write(self.value());
            var result = ms.ToArray();
            return result;
        }
    }
}

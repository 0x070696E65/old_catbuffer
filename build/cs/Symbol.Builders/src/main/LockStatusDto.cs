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
* Lock status for lock transaction
*/

namespace Symbol.Builders {

    [Serializable]
    public enum LockStatusDto {
        /* lock is unused. */
        UNUSED = 0,
        /* lock was already used. */
        USED = 1,
    }
    
    public static class LockStatusDtoExtensions
    {
        /* Enum value. */
        private static byte value(this LockStatusDto self) {
            return (byte)self;
        }

        /*
        * Gets enum value.
        *
        * @param value Raw value of the enum.
        * @return Enum value.
        */
        public static LockStatusDto RawValueOf(this LockStatusDto self, byte value) {
            foreach (LockStatusDto current in Enum.GetValues(typeof(LockStatusDto))) {
                if (value == (current.value()) {
                    return current;
                }
            }
            throw new Exception(value + " was not a backing value for LockStatusDto.");
        }

        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public static int GetSize(this LockStatusDto type)
        {
            return 1;
        }

        /*
        * Creates an instance of LockStatusDto from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of LockStatusDto.
        */
        public static LockStatusDto LoadFromBinary(this LockStatusDto self, BinaryReader stream) {
            try {
                byte streamValue = stream.ReadByte();
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
        public static byte[] Serialize(this LockStatusDto self) {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            bw.Write(self.value());
            var result = ms.ToArray();
            return result;
        }
    }
}

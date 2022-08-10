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
    * Binary layout for an account address restriction transaction
    */
    [Serializable]
    public class AccountAddressRestrictionTransactionBodyBuilder: ISerializer {

        /* Account restriction flags. */
        public List<AccountRestrictionFlagsDto> restrictionFlags;
        /* Reserved padding to align restrictionAdditions on 8-byte boundary. */
        public int accountRestrictionTransactionBody_Reserved1;
        /* Account restriction additions. */
        public List<UnresolvedAddressDto> restrictionAdditions;
        /* Account restriction deletions. */
        public List<UnresolvedAddressDto> restrictionDeletions;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AccountAddressRestrictionTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                restrictionFlags = GeneratorUtils.ToSet<AccountRestrictionFlagsDto>(stream.ReadInt16());
                var restrictionAdditionsCount = stream.ReadByte();
                var restrictionDeletionsCount = stream.ReadByte();
                accountRestrictionTransactionBody_Reserved1 = stream.ReadInt32();
                restrictionAdditions = GeneratorUtils.LoadFromBinaryArray(UnresolvedAddressDto.LoadFromBinary, stream, restrictionAdditionsCount, 0);
                restrictionDeletions = GeneratorUtils.LoadFromBinaryArray(UnresolvedAddressDto.LoadFromBinary, stream, restrictionDeletionsCount, 0);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AccountAddressRestrictionTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AccountAddressRestrictionTransactionBodyBuilder.
        */
        public static AccountAddressRestrictionTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new AccountAddressRestrictionTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        */
        internal AccountAddressRestrictionTransactionBodyBuilder(List<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedAddressDto> restrictionAdditions, List<UnresolvedAddressDto> restrictionDeletions)
        {
            GeneratorUtils.NotNull(restrictionFlags, "restrictionFlags is null");
            GeneratorUtils.NotNull(restrictionAdditions, "restrictionAdditions is null");
            GeneratorUtils.NotNull(restrictionDeletions, "restrictionDeletions is null");
            this.restrictionFlags = restrictionFlags;
            this.accountRestrictionTransactionBody_Reserved1 = 0;
            this.restrictionAdditions = restrictionAdditions;
            this.restrictionDeletions = restrictionDeletions;
        }
        
        /*
        * Creates an instance of AccountAddressRestrictionTransactionBodyBuilder.
        *
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        * @return Instance of AccountAddressRestrictionTransactionBodyBuilder.
        */
        public static  AccountAddressRestrictionTransactionBodyBuilder Create(List<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedAddressDto> restrictionAdditions, List<UnresolvedAddressDto> restrictionDeletions) {
            return new AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        }

        /*
        * Gets account restriction flags.
        *
        * @return Account restriction flags.
        */
        public List<AccountRestrictionFlagsDto> GetRestrictionFlags() {
            return restrictionFlags;
        }

        /*
        * Gets reserved padding to align restrictionAdditions on 8-byte boundary.
        *
        * @return Reserved padding to align restrictionAdditions on 8-byte boundary.
        */
        private int GetAccountRestrictionTransactionBody_Reserved1() {
            return accountRestrictionTransactionBody_Reserved1;
        }

        /*
        * Gets account restriction additions.
        *
        * @return Account restriction additions.
        */
        public List<UnresolvedAddressDto> GetRestrictionAdditions() {
            return restrictionAdditions;
        }

        /*
        * Gets account restriction deletions.
        *
        * @return Account restriction deletions.
        */
        public List<UnresolvedAddressDto> GetRestrictionDeletions() {
            return restrictionDeletions;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += 2; // restrictionFlags
            size += 1; // restrictionAdditionsCount
            size += 1; // restrictionDeletionsCount
            size += 4; // accountRestrictionTransactionBody_Reserved1
            size +=  GeneratorUtils.GetSumSize(restrictionAdditions, 0);
            size +=  GeneratorUtils.GetSumSize(restrictionDeletions, 0);
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
            bw.Write((short)GeneratorUtils.ToLong(restrictionFlags));
            bw.Write((byte)GeneratorUtils.GetSize(GetRestrictionAdditions()));
            bw.Write((byte)GeneratorUtils.GetSize(GetRestrictionDeletions()));
            bw.Write(GetAccountRestrictionTransactionBody_Reserved1());
            GeneratorUtils.WriteList(bw, restrictionAdditions, 0);
            GeneratorUtils.WriteList(bw, restrictionDeletions, 0);
            var result = ms.ToArray();
            return result;
        }
    }
}

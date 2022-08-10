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
    * Binary layout for an account operation restriction transaction
    */
    [Serializable]
    public class AccountOperationRestrictionTransactionBodyBuilder: ISerializer {

        /* Account restriction flags. */
        public List<AccountRestrictionFlagsDto> restrictionFlags;
        /* Reserved padding to align restrictionAdditions on 8-byte boundary. */
        public int accountRestrictionTransactionBody_Reserved1;
        /* Account restriction additions. */
        public List<EntityTypeDto> restrictionAdditions;
        /* Account restriction deletions. */
        public List<EntityTypeDto> restrictionDeletions;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AccountOperationRestrictionTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                restrictionFlags = GeneratorUtils.ToSet<AccountRestrictionFlagsDto>(stream.ReadInt16());
                var restrictionAdditionsCount = stream.ReadByte();
                var restrictionDeletionsCount = stream.ReadByte();
                accountRestrictionTransactionBody_Reserved1 = stream.ReadInt32();
                restrictionAdditions = new List<EntityTypeDto>(){};
                for (var i = 0; i < restrictionAdditionsCount; i++)
                {
                    int restrictionAdditionsStream = stream.ReadInt16();
                    foreach (EntityTypeDto tt in Enum.GetValues(typeof(EntityTypeDto))) {
                        if ((int)(object)tt == restrictionAdditionsStream)
                        {
                            restrictionAdditions.Add(tt);
                            GeneratorUtils.SkipPadding(tt.GetSize(), stream, 0);
                            break;
                        }
                    }
                }
                restrictionDeletions = new List<EntityTypeDto>(){};
                for (var i = 0; i < restrictionDeletionsCount; i++)
                {
                    int restrictionDeletionsStream = stream.ReadInt16();
                    foreach (EntityTypeDto tt in Enum.GetValues(typeof(EntityTypeDto))) {
                        if ((int)(object)tt == restrictionDeletionsStream)
                        {
                            restrictionDeletions.Add(tt);
                            GeneratorUtils.SkipPadding(tt.GetSize(), stream, 0);
                            break;
                        }
                    }
                }
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AccountOperationRestrictionTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AccountOperationRestrictionTransactionBodyBuilder.
        */
        public static AccountOperationRestrictionTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new AccountOperationRestrictionTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        */
        internal AccountOperationRestrictionTransactionBodyBuilder(List<AccountRestrictionFlagsDto> restrictionFlags, List<EntityTypeDto> restrictionAdditions, List<EntityTypeDto> restrictionDeletions)
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
        * Creates an instance of AccountOperationRestrictionTransactionBodyBuilder.
        *
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        * @return Instance of AccountOperationRestrictionTransactionBodyBuilder.
        */
        public static  AccountOperationRestrictionTransactionBodyBuilder Create(List<AccountRestrictionFlagsDto> restrictionFlags, List<EntityTypeDto> restrictionAdditions, List<EntityTypeDto> restrictionDeletions) {
            return new AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
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
        public List<EntityTypeDto> GetRestrictionAdditions() {
            return restrictionAdditions;
        }

        /*
        * Gets account restriction deletions.
        *
        * @return Account restriction deletions.
        */
        public List<EntityTypeDto> GetRestrictionDeletions() {
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
            int restrictionAdditionsSize = 0;
            foreach (EntityTypeDto tt in restrictionAdditions)
            {
                restrictionAdditionsSize += tt.GetSize() + GeneratorUtils.GetPadding(restrictionAdditionsSize, 0);
            }
            size += restrictionAdditionsSize;
            int restrictionDeletionsSize = 0;
            foreach (EntityTypeDto tt in restrictionDeletions)
            {
                restrictionDeletionsSize += tt.GetSize() + GeneratorUtils.GetPadding(restrictionDeletionsSize, 0);
            }
            size += restrictionDeletionsSize;
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
            foreach (var entity in restrictionAdditions)
            {
                var entityBytes = entity.Serialize();
                bw.Write(entityBytes, 0, entityBytes.Length);
                GeneratorUtils.AddPadding(entityBytes.Length, bw, 0);
            }
            foreach (var entity in restrictionDeletions)
            {
                var entityBytes = entity.Serialize();
                bw.Write(entityBytes, 0, entityBytes.Length);
                GeneratorUtils.AddPadding(entityBytes.Length, bw, 0);
            }
            var result = ms.ToArray();
            return result;
        }
    }
}

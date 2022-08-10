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
    * Binary layout for a multisig account modification transaction
    */
    [Serializable]
    public class MultisigAccountModificationTransactionBodyBuilder: ISerializer {

        /* Relative change of the minimal number of cosignatories required when removing an account. */
        public byte minRemovalDelta;
        /* Relative change of the minimal number of cosignatories required when approving a transaction. */
        public byte minApprovalDelta;
        /* Reserved padding to align addressAdditions on 8-byte boundary. */
        public int multisigAccountModificationTransactionBody_Reserved1;
        /* Cosignatory address additions. */
        public List<UnresolvedAddressDto> addressAdditions;
        /* Cosignatory address deletions. */
        public List<UnresolvedAddressDto> addressDeletions;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal MultisigAccountModificationTransactionBodyBuilder(BinaryReader stream)
        {
            try {
                minRemovalDelta = stream.ReadByte();
                minApprovalDelta = stream.ReadByte();
                var addressAdditionsCount = stream.ReadByte();
                var addressDeletionsCount = stream.ReadByte();
                multisigAccountModificationTransactionBody_Reserved1 = stream.ReadInt32();
                addressAdditions = GeneratorUtils.LoadFromBinaryArray(UnresolvedAddressDto.LoadFromBinary, stream, addressAdditionsCount, 0);
                addressDeletions = GeneratorUtils.LoadFromBinaryArray(UnresolvedAddressDto.LoadFromBinary, stream, addressDeletionsCount, 0);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of MultisigAccountModificationTransactionBodyBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of MultisigAccountModificationTransactionBodyBuilder.
        */
        public static MultisigAccountModificationTransactionBodyBuilder LoadFromBinary(BinaryReader stream) {
            return new MultisigAccountModificationTransactionBodyBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
        * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
        * @param addressAdditions Cosignatory address additions.
        * @param addressDeletions Cosignatory address deletions.
        */
        internal MultisigAccountModificationTransactionBodyBuilder(byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions)
        {
            GeneratorUtils.NotNull(minRemovalDelta, "minRemovalDelta is null");
            GeneratorUtils.NotNull(minApprovalDelta, "minApprovalDelta is null");
            GeneratorUtils.NotNull(addressAdditions, "addressAdditions is null");
            GeneratorUtils.NotNull(addressDeletions, "addressDeletions is null");
            this.minRemovalDelta = minRemovalDelta;
            this.minApprovalDelta = minApprovalDelta;
            this.multisigAccountModificationTransactionBody_Reserved1 = 0;
            this.addressAdditions = addressAdditions;
            this.addressDeletions = addressDeletions;
        }
        
        /*
        * Creates an instance of MultisigAccountModificationTransactionBodyBuilder.
        *
        * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
        * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
        * @param addressAdditions Cosignatory address additions.
        * @param addressDeletions Cosignatory address deletions.
        * @return Instance of MultisigAccountModificationTransactionBodyBuilder.
        */
        public static  MultisigAccountModificationTransactionBodyBuilder Create(byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions) {
            return new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
        }

        /*
        * Gets relative change of the minimal number of cosignatories required when removing an account.
        *
        * @return Relative change of the minimal number of cosignatories required when removing an account.
        */
        public byte GetMinRemovalDelta() {
            return minRemovalDelta;
        }

        /*
        * Gets relative change of the minimal number of cosignatories required when approving a transaction.
        *
        * @return Relative change of the minimal number of cosignatories required when approving a transaction.
        */
        public byte GetMinApprovalDelta() {
            return minApprovalDelta;
        }

        /*
        * Gets reserved padding to align addressAdditions on 8-byte boundary.
        *
        * @return Reserved padding to align addressAdditions on 8-byte boundary.
        */
        private int GetMultisigAccountModificationTransactionBody_Reserved1() {
            return multisigAccountModificationTransactionBody_Reserved1;
        }

        /*
        * Gets cosignatory address additions.
        *
        * @return Cosignatory address additions.
        */
        public List<UnresolvedAddressDto> GetAddressAdditions() {
            return addressAdditions;
        }

        /*
        * Gets cosignatory address deletions.
        *
        * @return Cosignatory address deletions.
        */
        public List<UnresolvedAddressDto> GetAddressDeletions() {
            return addressDeletions;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += 1; // minRemovalDelta
            size += 1; // minApprovalDelta
            size += 1; // addressAdditionsCount
            size += 1; // addressDeletionsCount
            size += 4; // multisigAccountModificationTransactionBody_Reserved1
            size +=  GeneratorUtils.GetSumSize(addressAdditions, 0);
            size +=  GeneratorUtils.GetSumSize(addressDeletions, 0);
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
            bw.Write(GetMinRemovalDelta());
            bw.Write(GetMinApprovalDelta());
            bw.Write((byte)GeneratorUtils.GetSize(GetAddressAdditions()));
            bw.Write((byte)GeneratorUtils.GetSize(GetAddressDeletions()));
            bw.Write(GetMultisigAccountModificationTransactionBody_Reserved1());
            GeneratorUtils.WriteList(bw, addressAdditions, 0);
            GeneratorUtils.WriteList(bw, addressDeletions, 0);
            var result = ms.ToArray();
            return result;
        }
    }
}

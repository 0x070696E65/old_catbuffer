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
    * Binary layout for an embedded account address restriction transaction
    */
    [Serializable]
    public class EmbeddedAccountAddressRestrictionTransactionBuilder: EmbeddedTransactionBuilder {

        /* Account address restriction transaction body. */
        public AccountAddressRestrictionTransactionBodyBuilder accountAddressRestrictionTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedAccountAddressRestrictionTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedAccountAddressRestrictionTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
        */
        public new static EmbeddedAccountAddressRestrictionTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedAccountAddressRestrictionTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        */
        internal EmbeddedAccountAddressRestrictionTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, List<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedAddressDto> restrictionAdditions, List<UnresolvedAddressDto> restrictionDeletions)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(restrictionFlags, "restrictionFlags is null");
            GeneratorUtils.NotNull(restrictionAdditions, "restrictionAdditions is null");
            GeneratorUtils.NotNull(restrictionDeletions, "restrictionDeletions is null");
            this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        }
        
        /*
        * Creates an instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        * @return Instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
        */
        public static  EmbeddedAccountAddressRestrictionTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, List<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedAddressDto> restrictionAdditions, List<UnresolvedAddressDto> restrictionDeletions) {
            return new EmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions);
        }

        /*
        * Gets account restriction flags.
        *
        * @return Account restriction flags.
        */
        public List<AccountRestrictionFlagsDto> GetRestrictionFlags() {
            return accountAddressRestrictionTransactionBody.GetRestrictionFlags();
        }

        /*
        * Gets account restriction additions.
        *
        * @return Account restriction additions.
        */
        public List<UnresolvedAddressDto> GetRestrictionAdditions() {
            return accountAddressRestrictionTransactionBody.GetRestrictionAdditions();
        }

        /*
        * Gets account restriction deletions.
        *
        * @return Account restriction deletions.
        */
        public List<UnresolvedAddressDto> GetRestrictionDeletions() {
            return accountAddressRestrictionTransactionBody.GetRestrictionDeletions();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += accountAddressRestrictionTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AccountAddressRestrictionTransactionBodyBuilder GetBody() {
            return accountAddressRestrictionTransactionBody;
        }


    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public override byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var superBytes = base.Serialize();
            bw.Write(superBytes, 0, superBytes.Length);
            var accountAddressRestrictionTransactionBodyEntityBytes = (accountAddressRestrictionTransactionBody).Serialize();
            bw.Write(accountAddressRestrictionTransactionBodyEntityBytes, 0, accountAddressRestrictionTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

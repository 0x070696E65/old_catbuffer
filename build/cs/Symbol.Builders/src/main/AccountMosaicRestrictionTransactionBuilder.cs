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
    * Binary layout for a non-embedded account mosaic restriction transaction
    */
    [Serializable]
    public class AccountMosaicRestrictionTransactionBuilder: TransactionBuilder {

        /* Account mosaic restriction transaction body. */
        public AccountMosaicRestrictionTransactionBodyBuilder accountMosaicRestrictionTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AccountMosaicRestrictionTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AccountMosaicRestrictionTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AccountMosaicRestrictionTransactionBuilder.
        */
        public new static AccountMosaicRestrictionTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new AccountMosaicRestrictionTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        */
        internal AccountMosaicRestrictionTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, List<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedMosaicIdDto> restrictionAdditions, List<UnresolvedMosaicIdDto> restrictionDeletions)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(restrictionFlags, "restrictionFlags is null");
            GeneratorUtils.NotNull(restrictionAdditions, "restrictionAdditions is null");
            GeneratorUtils.NotNull(restrictionDeletions, "restrictionDeletions is null");
            this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        }
        
        /*
        * Creates an instance of AccountMosaicRestrictionTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param restrictionFlags Account restriction flags.
        * @param restrictionAdditions Account restriction additions.
        * @param restrictionDeletions Account restriction deletions.
        * @return Instance of AccountMosaicRestrictionTransactionBuilder.
        */
        public static  AccountMosaicRestrictionTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, List<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedMosaicIdDto> restrictionAdditions, List<UnresolvedMosaicIdDto> restrictionDeletions) {
            return new AccountMosaicRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions);
        }

        /*
        * Gets account restriction flags.
        *
        * @return Account restriction flags.
        */
        public List<AccountRestrictionFlagsDto> GetRestrictionFlags() {
            return accountMosaicRestrictionTransactionBody.GetRestrictionFlags();
        }

        /*
        * Gets account restriction additions.
        *
        * @return Account restriction additions.
        */
        public List<UnresolvedMosaicIdDto> GetRestrictionAdditions() {
            return accountMosaicRestrictionTransactionBody.GetRestrictionAdditions();
        }

        /*
        * Gets account restriction deletions.
        *
        * @return Account restriction deletions.
        */
        public List<UnresolvedMosaicIdDto> GetRestrictionDeletions() {
            return accountMosaicRestrictionTransactionBody.GetRestrictionDeletions();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += accountMosaicRestrictionTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AccountMosaicRestrictionTransactionBodyBuilder GetBody() {
            return accountMosaicRestrictionTransactionBody;
        }


    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public new byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var superBytes = base.Serialize();
            bw.Write(superBytes, 0, superBytes.Length);
            var accountMosaicRestrictionTransactionBodyEntityBytes = (accountMosaicRestrictionTransactionBody).Serialize();
            bw.Write(accountMosaicRestrictionTransactionBodyEntityBytes, 0, accountMosaicRestrictionTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for a non-embedded account operation restriction transaction
    */
    [Serializable]
    public class AccountOperationRestrictionTransactionBuilder: TransactionBuilder {

        /* Account operation restriction transaction body. */
        public AccountOperationRestrictionTransactionBodyBuilder accountOperationRestrictionTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AccountOperationRestrictionTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AccountOperationRestrictionTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AccountOperationRestrictionTransactionBuilder.
        */
        public new static AccountOperationRestrictionTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new AccountOperationRestrictionTransactionBuilder(stream);
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
        internal AccountOperationRestrictionTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, List<AccountRestrictionFlagsDto> restrictionFlags, List<EntityTypeDto> restrictionAdditions, List<EntityTypeDto> restrictionDeletions)
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
            this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        }
        
        /*
        * Creates an instance of AccountOperationRestrictionTransactionBuilder.
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
        * @return Instance of AccountOperationRestrictionTransactionBuilder.
        */
        public static  AccountOperationRestrictionTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, List<AccountRestrictionFlagsDto> restrictionFlags, List<EntityTypeDto> restrictionAdditions, List<EntityTypeDto> restrictionDeletions) {
            return new AccountOperationRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions);
        }

        /*
        * Gets account restriction flags.
        *
        * @return Account restriction flags.
        */
        public List<AccountRestrictionFlagsDto> GetRestrictionFlags() {
            return accountOperationRestrictionTransactionBody.GetRestrictionFlags();
        }

        /*
        * Gets account restriction additions.
        *
        * @return Account restriction additions.
        */
        public List<EntityTypeDto> GetRestrictionAdditions() {
            return accountOperationRestrictionTransactionBody.GetRestrictionAdditions();
        }

        /*
        * Gets account restriction deletions.
        *
        * @return Account restriction deletions.
        */
        public List<EntityTypeDto> GetRestrictionDeletions() {
            return accountOperationRestrictionTransactionBody.GetRestrictionDeletions();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += accountOperationRestrictionTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AccountOperationRestrictionTransactionBodyBuilder GetBody() {
            return accountOperationRestrictionTransactionBody;
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
            var accountOperationRestrictionTransactionBodyEntityBytes = (accountOperationRestrictionTransactionBody).Serialize();
            bw.Write(accountOperationRestrictionTransactionBodyEntityBytes, 0, accountOperationRestrictionTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for a non-embedded account metadata transaction
    */
    [Serializable]
    public class AccountMetadataTransactionBuilder: TransactionBuilder {

        /* Account metadata transaction body. */
        public AccountMetadataTransactionBodyBuilder accountMetadataTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AccountMetadataTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AccountMetadataTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AccountMetadataTransactionBuilder.
        */
        public new static AccountMetadataTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new AccountMetadataTransactionBuilder(stream);
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
        * @param targetAddress Metadata target address.
        * @param scopedMetadataKey Metadata key scoped to source, target and type.
        * @param valueSizeDelta Change in value size in bytes.
        * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        */
        internal AccountMetadataTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto targetAddress, long scopedMetadataKey, short valueSizeDelta, byte[] value)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(targetAddress, "targetAddress is null");
            GeneratorUtils.NotNull(scopedMetadataKey, "scopedMetadataKey is null");
            GeneratorUtils.NotNull(valueSizeDelta, "valueSizeDelta is null");
            GeneratorUtils.NotNull(value, "value is null");
            this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, valueSizeDelta, value);
        }
        
        /*
        * Creates an instance of AccountMetadataTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param targetAddress Metadata target address.
        * @param scopedMetadataKey Metadata key scoped to source, target and type.
        * @param valueSizeDelta Change in value size in bytes.
        * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        * @return Instance of AccountMetadataTransactionBuilder.
        */
        public static  AccountMetadataTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto targetAddress, long scopedMetadataKey, short valueSizeDelta, byte[] value) {
            return new AccountMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value);
        }

        /*
        * Gets metadata target address.
        *
        * @return Metadata target address.
        */
        public UnresolvedAddressDto GetTargetAddress() {
            return accountMetadataTransactionBody.GetTargetAddress();
        }

        /*
        * Gets metadata key scoped to source, target and type.
        *
        * @return Metadata key scoped to source, target and type.
        */
        public long GetScopedMetadataKey() {
            return accountMetadataTransactionBody.GetScopedMetadataKey();
        }

        /*
        * Gets change in value size in bytes.
        *
        * @return Change in value size in bytes.
        */
        public short GetValueSizeDelta() {
            return accountMetadataTransactionBody.GetValueSizeDelta();
        }

        /*
        * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        *
        * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        */
        public byte[] GetValue() {
            return accountMetadataTransactionBody.GetValue();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += accountMetadataTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AccountMetadataTransactionBodyBuilder GetBody() {
            return accountMetadataTransactionBody;
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
            var accountMetadataTransactionBodyEntityBytes = (accountMetadataTransactionBody).Serialize();
            bw.Write(accountMetadataTransactionBodyEntityBytes, 0, accountMetadataTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

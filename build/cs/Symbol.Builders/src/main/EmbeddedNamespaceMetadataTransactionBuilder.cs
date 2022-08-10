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
    * Binary layout for an embedded namespace metadata transaction
    */
    [Serializable]
    public class EmbeddedNamespaceMetadataTransactionBuilder: EmbeddedTransactionBuilder {

        /* Namespace metadata transaction body. */
        public NamespaceMetadataTransactionBodyBuilder namespaceMetadataTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedNamespaceMetadataTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedNamespaceMetadataTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedNamespaceMetadataTransactionBuilder.
        */
        public new static EmbeddedNamespaceMetadataTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedNamespaceMetadataTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param targetAddress Metadata target address.
        * @param scopedMetadataKey Metadata key scoped to source, target and type.
        * @param targetNamespaceId Target namespace identifier.
        * @param valueSizeDelta Change in value size in bytes.
        * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        */
        internal EmbeddedNamespaceMetadataTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedAddressDto targetAddress, long scopedMetadataKey, NamespaceIdDto targetNamespaceId, short valueSizeDelta, byte[] value)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(targetAddress, "targetAddress is null");
            GeneratorUtils.NotNull(scopedMetadataKey, "scopedMetadataKey is null");
            GeneratorUtils.NotNull(targetNamespaceId, "targetNamespaceId is null");
            GeneratorUtils.NotNull(valueSizeDelta, "valueSizeDelta is null");
            GeneratorUtils.NotNull(value, "value is null");
            this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
        }
        
        /*
        * Creates an instance of EmbeddedNamespaceMetadataTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param targetAddress Metadata target address.
        * @param scopedMetadataKey Metadata key scoped to source, target and type.
        * @param targetNamespaceId Target namespace identifier.
        * @param valueSizeDelta Change in value size in bytes.
        * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        * @return Instance of EmbeddedNamespaceMetadataTransactionBuilder.
        */
        public static  EmbeddedNamespaceMetadataTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedAddressDto targetAddress, long scopedMetadataKey, NamespaceIdDto targetNamespaceId, short valueSizeDelta, byte[] value) {
            return new EmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
        }

        /*
        * Gets metadata target address.
        *
        * @return Metadata target address.
        */
        public UnresolvedAddressDto GetTargetAddress() {
            return namespaceMetadataTransactionBody.GetTargetAddress();
        }

        /*
        * Gets metadata key scoped to source, target and type.
        *
        * @return Metadata key scoped to source, target and type.
        */
        public long GetScopedMetadataKey() {
            return namespaceMetadataTransactionBody.GetScopedMetadataKey();
        }

        /*
        * Gets target namespace identifier.
        *
        * @return Target namespace identifier.
        */
        public NamespaceIdDto GetTargetNamespaceId() {
            return namespaceMetadataTransactionBody.GetTargetNamespaceId();
        }

        /*
        * Gets change in value size in bytes.
        *
        * @return Change in value size in bytes.
        */
        public short GetValueSizeDelta() {
            return namespaceMetadataTransactionBody.GetValueSizeDelta();
        }

        /*
        * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        *
        * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
        */
        public byte[] GetValue() {
            return namespaceMetadataTransactionBody.GetValue();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += namespaceMetadataTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new NamespaceMetadataTransactionBodyBuilder GetBody() {
            return namespaceMetadataTransactionBody;
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
            var namespaceMetadataTransactionBodyEntityBytes = (namespaceMetadataTransactionBody).Serialize();
            bw.Write(namespaceMetadataTransactionBodyEntityBytes, 0, namespaceMetadataTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

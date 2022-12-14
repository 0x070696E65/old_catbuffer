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
    * Binary layout for a non-embedded address alias transaction
    */
    [Serializable]
    public class AddressAliasTransactionBuilder: TransactionBuilder {

        /* Address alias transaction body. */
        public AddressAliasTransactionBodyBuilder addressAliasTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal AddressAliasTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                addressAliasTransactionBody = AddressAliasTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of AddressAliasTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of AddressAliasTransactionBuilder.
        */
        public new static AddressAliasTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new AddressAliasTransactionBuilder(stream);
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
        * @param namespaceId Identifier of the namespace that will become an alias.
        * @param address Aliased address.
        * @param aliasAction Alias action.
        */
        internal AddressAliasTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, AddressDto address, AliasActionDto aliasAction)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(namespaceId, "namespaceId is null");
            GeneratorUtils.NotNull(address, "address is null");
            GeneratorUtils.NotNull(aliasAction, "aliasAction is null");
            this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
        }
        
        /*
        * Creates an instance of AddressAliasTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param namespaceId Identifier of the namespace that will become an alias.
        * @param address Aliased address.
        * @param aliasAction Alias action.
        * @return Instance of AddressAliasTransactionBuilder.
        */
        public static  AddressAliasTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, AddressDto address, AliasActionDto aliasAction) {
            return new AddressAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction);
        }

        /*
        * Gets identifier of the namespace that will become an alias.
        *
        * @return Identifier of the namespace that will become an alias.
        */
        public NamespaceIdDto GetNamespaceId() {
            return addressAliasTransactionBody.GetNamespaceId();
        }

        /*
        * Gets aliased address.
        *
        * @return Aliased address.
        */
        public AddressDto GetAddress() {
            return addressAliasTransactionBody.GetAddress();
        }

        /*
        * Gets alias action.
        *
        * @return Alias action.
        */
        public AliasActionDto GetAliasAction() {
            return addressAliasTransactionBody.GetAliasAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += addressAliasTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new AddressAliasTransactionBodyBuilder GetBody() {
            return addressAliasTransactionBody;
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
            var addressAliasTransactionBodyEntityBytes = (addressAliasTransactionBody).Serialize();
            bw.Write(addressAliasTransactionBodyEntityBytes, 0, addressAliasTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

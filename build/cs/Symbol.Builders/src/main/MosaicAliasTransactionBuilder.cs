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
    * Binary layout for a non-embedded mosaic alias transaction
    */
    [Serializable]
    public class MosaicAliasTransactionBuilder: TransactionBuilder {

        /* Mosaic alias transaction body. */
        public MosaicAliasTransactionBodyBuilder mosaicAliasTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal MosaicAliasTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of MosaicAliasTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of MosaicAliasTransactionBuilder.
        */
        public new static MosaicAliasTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new MosaicAliasTransactionBuilder(stream);
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
        * @param mosaicId Aliased mosaic identifier.
        * @param aliasAction Alias action.
        */
        internal MosaicAliasTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, MosaicIdDto mosaicId, AliasActionDto aliasAction)
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
            GeneratorUtils.NotNull(mosaicId, "mosaicId is null");
            GeneratorUtils.NotNull(aliasAction, "aliasAction is null");
            this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
        }
        
        /*
        * Creates an instance of MosaicAliasTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param namespaceId Identifier of the namespace that will become an alias.
        * @param mosaicId Aliased mosaic identifier.
        * @param aliasAction Alias action.
        * @return Instance of MosaicAliasTransactionBuilder.
        */
        public static  MosaicAliasTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, MosaicIdDto mosaicId, AliasActionDto aliasAction) {
            return new MosaicAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction);
        }

        /*
        * Gets identifier of the namespace that will become an alias.
        *
        * @return Identifier of the namespace that will become an alias.
        */
        public NamespaceIdDto GetNamespaceId() {
            return mosaicAliasTransactionBody.GetNamespaceId();
        }

        /*
        * Gets aliased mosaic identifier.
        *
        * @return Aliased mosaic identifier.
        */
        public MosaicIdDto GetMosaicId() {
            return mosaicAliasTransactionBody.GetMosaicId();
        }

        /*
        * Gets alias action.
        *
        * @return Alias action.
        */
        public AliasActionDto GetAliasAction() {
            return mosaicAliasTransactionBody.GetAliasAction();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += mosaicAliasTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new MosaicAliasTransactionBodyBuilder GetBody() {
            return mosaicAliasTransactionBody;
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
            var mosaicAliasTransactionBodyEntityBytes = (mosaicAliasTransactionBody).Serialize();
            bw.Write(mosaicAliasTransactionBodyEntityBytes, 0, mosaicAliasTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

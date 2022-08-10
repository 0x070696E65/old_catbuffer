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
    * Binary layout for an embedded multisig account modification transaction
    */
    [Serializable]
    public class EmbeddedMultisigAccountModificationTransactionBuilder: EmbeddedTransactionBuilder {

        /* Multisig account modification transaction body. */
        public MultisigAccountModificationTransactionBodyBuilder multisigAccountModificationTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedMultisigAccountModificationTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedMultisigAccountModificationTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedMultisigAccountModificationTransactionBuilder.
        */
        public new static EmbeddedMultisigAccountModificationTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedMultisigAccountModificationTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
        * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
        * @param addressAdditions Cosignatory address additions.
        * @param addressDeletions Cosignatory address deletions.
        */
        internal EmbeddedMultisigAccountModificationTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(minRemovalDelta, "minRemovalDelta is null");
            GeneratorUtils.NotNull(minApprovalDelta, "minApprovalDelta is null");
            GeneratorUtils.NotNull(addressAdditions, "addressAdditions is null");
            GeneratorUtils.NotNull(addressDeletions, "addressDeletions is null");
            this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
        }
        
        /*
        * Creates an instance of EmbeddedMultisigAccountModificationTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
        * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
        * @param addressAdditions Cosignatory address additions.
        * @param addressDeletions Cosignatory address deletions.
        * @return Instance of EmbeddedMultisigAccountModificationTransactionBuilder.
        */
        public static  EmbeddedMultisigAccountModificationTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions) {
            return new EmbeddedMultisigAccountModificationTransactionBuilder(signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
        }

        /*
        * Gets relative change of the minimal number of cosignatories required when removing an account.
        *
        * @return Relative change of the minimal number of cosignatories required when removing an account.
        */
        public byte GetMinRemovalDelta() {
            return multisigAccountModificationTransactionBody.GetMinRemovalDelta();
        }

        /*
        * Gets relative change of the minimal number of cosignatories required when approving a transaction.
        *
        * @return Relative change of the minimal number of cosignatories required when approving a transaction.
        */
        public byte GetMinApprovalDelta() {
            return multisigAccountModificationTransactionBody.GetMinApprovalDelta();
        }

        /*
        * Gets cosignatory address additions.
        *
        * @return Cosignatory address additions.
        */
        public List<UnresolvedAddressDto> GetAddressAdditions() {
            return multisigAccountModificationTransactionBody.GetAddressAdditions();
        }

        /*
        * Gets cosignatory address deletions.
        *
        * @return Cosignatory address deletions.
        */
        public List<UnresolvedAddressDto> GetAddressDeletions() {
            return multisigAccountModificationTransactionBody.GetAddressDeletions();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += multisigAccountModificationTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new MultisigAccountModificationTransactionBodyBuilder GetBody() {
            return multisigAccountModificationTransactionBody;
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
            var multisigAccountModificationTransactionBodyEntityBytes = (multisigAccountModificationTransactionBody).Serialize();
            bw.Write(multisigAccountModificationTransactionBodyEntityBytes, 0, multisigAccountModificationTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for a non-embedded transfer transaction
    */
    [Serializable]
    public class TransferTransactionBuilder: TransactionBuilder {

        /* Transfer transaction body. */
        public TransferTransactionBodyBuilder transferTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal TransferTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                transferTransactionBody = TransferTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of TransferTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of TransferTransactionBuilder.
        */
        public new static TransferTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new TransferTransactionBuilder(stream);
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
        * @param recipientAddress Recipient address.
        * @param mosaics Attached mosaics.
        * @param message Attached message.
        */
        internal TransferTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto recipientAddress, List<UnresolvedMosaicBuilder> mosaics, byte[] message)
            : base(signature, signerPublicKey, version, network, type, fee, deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            GeneratorUtils.NotNull(recipientAddress, "recipientAddress is null");
            GeneratorUtils.NotNull(mosaics, "mosaics is null");
            GeneratorUtils.NotNull(message, "message is null");
            this.transferTransactionBody = new TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
        }
        
        /*
        * Creates an instance of TransferTransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @param recipientAddress Recipient address.
        * @param mosaics Attached mosaics.
        * @param message Attached message.
        * @return Instance of TransferTransactionBuilder.
        */
        public static  TransferTransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto recipientAddress, List<UnresolvedMosaicBuilder> mosaics, byte[] message) {
            return new TransferTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message);
        }

        /*
        * Gets recipient address.
        *
        * @return Recipient address.
        */
        public UnresolvedAddressDto GetRecipientAddress() {
            return transferTransactionBody.GetRecipientAddress();
        }

        /*
        * Gets attached mosaics.
        *
        * @return Attached mosaics.
        */
        public List<UnresolvedMosaicBuilder> GetMosaics() {
            return transferTransactionBody.GetMosaics();
        }

        /*
        * Gets attached message.
        *
        * @return Attached message.
        */
        public byte[] GetMessage() {
            return transferTransactionBody.GetMessage();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //Transaction
        public override int GetSize() {
            var size = base.GetSize();
            size += transferTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new TransferTransactionBodyBuilder GetBody() {
            return transferTransactionBody;
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
            var transferTransactionBodyEntityBytes = (transferTransactionBody).Serialize();
            bw.Write(transferTransactionBodyEntityBytes, 0, transferTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for a transaction
    */
    [Serializable]
    public class TransactionBuilder: ISerializer {

        /* Entity size. */
        public int size;
        /* Reserved padding to align Signature on 8-byte boundary. */
        public int verifiableEntityHeader_Reserved1;
        /* Entity signature. */
        public SignatureDto signature;
        /* Entity signer's public key. */
        public KeyDto signerPublicKey;
        /* Reserved padding to align end of EntityBody on 8-byte boundary. */
        public int entityBody_Reserved1;
        /* Entity version. */
        public byte version;
        /* Entity network. */
        public NetworkTypeDto network;
        /* Entity type. */
        public EntityTypeDto type;
        /* Transaction fee. */
        public AmountDto fee;
        /* Transaction deadline. */
        public TimestampDto deadline;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal TransactionBuilder(BinaryReader stream)
        {
            try {
                size = stream.ReadInt32();
                verifiableEntityHeader_Reserved1 = stream.ReadInt32();
                signature = SignatureDto.LoadFromBinary(stream);
                signerPublicKey = KeyDto.LoadFromBinary(stream);
                entityBody_Reserved1 = stream.ReadInt32();
                version = stream.ReadByte();
                network = (NetworkTypeDto)Enum.ToObject(typeof(NetworkTypeDto), (byte)stream.ReadByte());
                type = (EntityTypeDto)Enum.ToObject(typeof(EntityTypeDto), (short)stream.ReadInt16());
                fee = AmountDto.LoadFromBinary(stream);
                deadline = TimestampDto.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of TransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of TransactionBuilder.
        */
        public static TransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new TransactionBuilder(stream);
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
        */
        internal TransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(fee, "fee is null");
            GeneratorUtils.NotNull(deadline, "deadline is null");
            this.verifiableEntityHeader_Reserved1 = 0;
            this.signature = signature;
            this.signerPublicKey = signerPublicKey;
            this.entityBody_Reserved1 = 0;
            this.version = version;
            this.network = network;
            this.type = type;
            this.fee = fee;
            this.deadline = deadline;
        }
        
        /*
        * Creates an instance of TransactionBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param fee Transaction fee.
        * @param deadline Transaction deadline.
        * @return Instance of TransactionBuilder.
        */
        public static  TransactionBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline) {
            return new TransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline);
        }

        /*
        * Gets entity size.
        *
        * @return Entity size.
        */
        public int GetStreamSize() {
            return size;
        }

        /*
        * Gets reserved padding to align Signature on 8-byte boundary.
        *
        * @return Reserved padding to align Signature on 8-byte boundary.
        */
        private int GetVerifiableEntityHeader_Reserved1() {
            return verifiableEntityHeader_Reserved1;
        }

        /*
        * Gets entity signature.
        *
        * @return Entity signature.
        */
        public SignatureDto GetSignature() {
            return signature;
        }

        /*
        * Gets entity signer's public key.
        *
        * @return Entity signer's public key.
        */
        public KeyDto GetSignerPublicKey() {
            return signerPublicKey;
        }

        /*
        * Gets reserved padding to align end of EntityBody on 8-byte boundary.
        *
        * @return Reserved padding to align end of EntityBody on 8-byte boundary.
        */
        private int GetEntityBody_Reserved1() {
            return entityBody_Reserved1;
        }

        /*
        * Gets entity version.
        *
        * @return Entity version.
        */
        public byte GetVersion() {
            return version;
        }

        /*
        * Gets entity network.
        *
        * @return Entity network.
        */
        public NetworkTypeDto GetNetwork() {
            return network;
        }

        /*
        * Gets entity type.
        *
        * @return Entity type.
        */
        public new EntityTypeDto GetType() {
            return type;
        }

        /*
        * Gets transaction fee.
        *
        * @return Transaction fee.
        */
        public AmountDto GetFee() {
            return fee;
        }

        /*
        * Gets transaction deadline.
        *
        * @return Transaction deadline.
        */
        public TimestampDto GetDeadline() {
            return deadline;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //TransactionBuilder
        public virtual int GetSize() {
            var size = 0;
            size += 4; // size
            size += 4; // verifiableEntityHeader_Reserved1
            size += signature.GetSize();
            size += signerPublicKey.GetSize();
            size += 4; // entityBody_Reserved1
            size += 1; // version
            size += network.GetSize();
            size += type.GetSize();
            size += fee.GetSize();
            size += deadline.GetSize();
            return size;
        }


        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public ISerializer GetBody() {
            return null;
        }

    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            // bw.Write((int)GetStreamSize());
            bw.Write((int)GetSize());
            bw.Write(GetVerifiableEntityHeader_Reserved1());
            var signatureEntityBytes = (signature).Serialize();
            bw.Write(signatureEntityBytes, 0, signatureEntityBytes.Length);
            var signerPublicKeyEntityBytes = (signerPublicKey).Serialize();
            bw.Write(signerPublicKeyEntityBytes, 0, signerPublicKeyEntityBytes.Length);
            bw.Write(GetEntityBody_Reserved1());
            bw.Write(GetVersion());
            var networkEntityBytes = (network).Serialize();
            bw.Write(networkEntityBytes, 0, networkEntityBytes.Length);
            var typeEntityBytes = (type).Serialize();
            bw.Write(typeEntityBytes, 0, typeEntityBytes.Length);
            var feeEntityBytes = (fee).Serialize();
            bw.Write(feeEntityBytes, 0, feeEntityBytes.Length);
            var deadlineEntityBytes = (deadline).Serialize();
            bw.Write(deadlineEntityBytes, 0, deadlineEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

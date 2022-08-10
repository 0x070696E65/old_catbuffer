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
    * Binary layout for an embedded transaction
    */
    [Serializable]
    public class EmbeddedTransactionBuilder: ISerializer {

        /* Entity size. */
        public int size;
        /* Reserved padding to align end of EmbeddedTransactionHeader on 8-byte boundary. */
        public int embeddedTransactionHeader_Reserved1;
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
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedTransactionBuilder(BinaryReader stream)
        {
            try {
                size = stream.ReadInt32();
                embeddedTransactionHeader_Reserved1 = stream.ReadInt32();
                signerPublicKey = KeyDto.LoadFromBinary(stream);
                entityBody_Reserved1 = stream.ReadInt32();
                version = stream.ReadByte();
                network = (NetworkTypeDto)Enum.ToObject(typeof(NetworkTypeDto), (byte)stream.ReadByte());
                type = (EntityTypeDto)Enum.ToObject(typeof(EntityTypeDto), (short)stream.ReadInt16());
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedTransactionBuilder.
        */
        public static EmbeddedTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        */
        internal EmbeddedTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            this.embeddedTransactionHeader_Reserved1 = 0;
            this.signerPublicKey = signerPublicKey;
            this.entityBody_Reserved1 = 0;
            this.version = version;
            this.network = network;
            this.type = type;
        }
        
        /*
        * Creates an instance of EmbeddedTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @return Instance of EmbeddedTransactionBuilder.
        */
        public static  EmbeddedTransactionBuilder Create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type) {
            return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
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
        * Gets reserved padding to align end of EmbeddedTransactionHeader on 8-byte boundary.
        *
        * @return Reserved padding to align end of EmbeddedTransactionHeader on 8-byte boundary.
        */
        private int GetEmbeddedTransactionHeader_Reserved1() {
            return embeddedTransactionHeader_Reserved1;
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
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransactionBuilder
        public virtual int GetSize() {
            var size = 0;
            size += 4; // size
            size += 4; // embeddedTransactionHeader_Reserved1
            size += signerPublicKey.GetSize();
            size += 4; // entityBody_Reserved1
            size += 1; // version
            size += network.GetSize();
            size += type.GetSize();
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
        public virtual byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            // bw.Write((int)GetStreamSize());
            bw.Write((int)GetSize());
            bw.Write(GetEmbeddedTransactionHeader_Reserved1());
            var signerPublicKeyEntityBytes = (signerPublicKey).Serialize();
            bw.Write(signerPublicKeyEntityBytes, 0, signerPublicKeyEntityBytes.Length);
            bw.Write(GetEntityBody_Reserved1());
            bw.Write(GetVersion());
            var networkEntityBytes = (network).Serialize();
            bw.Write(networkEntityBytes, 0, networkEntityBytes.Length);
            var typeEntityBytes = (type).Serialize();
            bw.Write(typeEntityBytes, 0, typeEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

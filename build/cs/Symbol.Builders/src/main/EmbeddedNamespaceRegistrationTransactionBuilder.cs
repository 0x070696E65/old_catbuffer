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
    * Binary layout for an embedded namespace registration transaction
    */
    [Serializable]
    public class EmbeddedNamespaceRegistrationTransactionBuilder: EmbeddedTransactionBuilder {

        /* Namespace registration transaction body. */
        public NamespaceRegistrationTransactionBodyBuilder namespaceRegistrationTransactionBody;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal EmbeddedNamespaceRegistrationTransactionBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
        */
        public new static EmbeddedNamespaceRegistrationTransactionBuilder LoadFromBinary(BinaryReader stream) {
            return new EmbeddedNamespaceRegistrationTransactionBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param duration Namespace duration.
        * @param parentId Parent namespace identifier.
        * @param id Namespace identifier.
        * @param registrationType Namespace registration type.
        * @param name Namespace name.
        */
        internal EmbeddedNamespaceRegistrationTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, BlockDurationDto? duration, NamespaceIdDto? parentId, NamespaceIdDto id, NamespaceRegistrationTypeDto registrationType, byte[] name)
            : base(signerPublicKey, version, network, type)
        {
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            if (registrationType == NamespaceRegistrationTypeDto.ROOT) {
                GeneratorUtils.NotNull(duration, "duration is null");
            }
            if (registrationType == NamespaceRegistrationTypeDto.CHILD) {
                GeneratorUtils.NotNull(parentId, "parentId is null");
            }
            GeneratorUtils.NotNull(id, "id is null");
            GeneratorUtils.NotNull(registrationType, "registrationType is null");
            GeneratorUtils.NotNull(name, "name is null");
            this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder(duration, parentId, id, registrationType, name);
        }
        
        /*
        * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param parentId Parent namespace identifier.
        * @param id Namespace identifier.
        * @param name Namespace name.
        * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
        */
        public static  EmbeddedNamespaceRegistrationTransactionBuilder CreateChild(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, NamespaceIdDto parentId, NamespaceIdDto id, byte[] name) {
            NamespaceRegistrationTypeDto registrationType = NamespaceRegistrationTypeDto.CHILD;
            return new EmbeddedNamespaceRegistrationTransactionBuilder(signerPublicKey, version, network, type, null, parentId, id, registrationType, name);
        }
        
        /*
        * Creates an instance of EmbeddedNamespaceRegistrationTransactionBuilder.
        *
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param duration Namespace duration.
        * @param id Namespace identifier.
        * @param name Namespace name.
        * @return Instance of EmbeddedNamespaceRegistrationTransactionBuilder.
        */
        public static  EmbeddedNamespaceRegistrationTransactionBuilder CreateRoot(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, BlockDurationDto duration, NamespaceIdDto id, byte[] name) {
            NamespaceRegistrationTypeDto registrationType = NamespaceRegistrationTypeDto.ROOT;
            return new EmbeddedNamespaceRegistrationTransactionBuilder(signerPublicKey, version, network, type, duration, null, id, registrationType, name);
        }

        /*
        * Gets namespace duration.
        *
        * @return Namespace duration.
        */
        public BlockDurationDto? GetDuration() {
            return namespaceRegistrationTransactionBody.GetDuration();
        }

        /*
        * Gets parent namespace identifier.
        *
        * @return Parent namespace identifier.
        */
        public NamespaceIdDto? GetParentId() {
            return namespaceRegistrationTransactionBody.GetParentId();
        }

        /*
        * Gets namespace identifier.
        *
        * @return Namespace identifier.
        */
        public NamespaceIdDto GetId() {
            return namespaceRegistrationTransactionBody.GetId();
        }

        /*
        * Gets namespace registration type.
        *
        * @return Namespace registration type.
        */
        public NamespaceRegistrationTypeDto GetRegistrationType() {
            return namespaceRegistrationTransactionBody.GetRegistrationType();
        }

        /*
        * Gets namespace name.
        *
        * @return Namespace name.
        */
        public byte[] GetName() {
            return namespaceRegistrationTransactionBody.GetName();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    //EmbeddedTransaction
        public override int GetSize() {
            var size = base.GetSize();
            size += namespaceRegistrationTransactionBody.GetSize();
            return size;
        }

        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public new NamespaceRegistrationTransactionBodyBuilder GetBody() {
            return namespaceRegistrationTransactionBody;
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
            var namespaceRegistrationTransactionBodyEntityBytes = (namespaceRegistrationTransactionBody).Serialize();
            bw.Write(namespaceRegistrationTransactionBodyEntityBytes, 0, namespaceRegistrationTransactionBodyEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for a block header
    */
    [Serializable]
    public class BlockHeaderBuilder: ISerializer {

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
        /* Block height. */
        public HeightDto height;
        /* Number of milliseconds elapsed since creation of nemesis block. */
        public TimestampDto timestamp;
        /* Block difficulty. */
        public DifficultyDto difficulty;
        /* Generation hash proof. */
        public VrfProofBuilder generationHashProof;
        /* Previous block hash. */
        public Hash256Dto previousBlockHash;
        /* Hash of the transactions in this block. */
        public Hash256Dto transactionsHash;
        /* Hash of the receipts generated by this block. */
        public Hash256Dto receiptsHash;
        /* Hash of the global chain state at this block. */
        public Hash256Dto stateHash;
        /* Beneficiary address designated by harvester. */
        public AddressDto beneficiaryAddress;
        /* Fee multiplier applied to block transactions. */
        public BlockFeeMultiplierDto feeMultiplier;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal BlockHeaderBuilder(BinaryReader stream)
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
                height = HeightDto.LoadFromBinary(stream);
                timestamp = TimestampDto.LoadFromBinary(stream);
                difficulty = DifficultyDto.LoadFromBinary(stream);
                generationHashProof = VrfProofBuilder.LoadFromBinary(stream);
                previousBlockHash = Hash256Dto.LoadFromBinary(stream);
                transactionsHash = Hash256Dto.LoadFromBinary(stream);
                receiptsHash = Hash256Dto.LoadFromBinary(stream);
                stateHash = Hash256Dto.LoadFromBinary(stream);
                beneficiaryAddress = AddressDto.LoadFromBinary(stream);
                feeMultiplier = BlockFeeMultiplierDto.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of BlockHeaderBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of BlockHeaderBuilder.
        */
        public static BlockHeaderBuilder LoadFromBinary(BinaryReader stream) {
            return new BlockHeaderBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param height Block height.
        * @param timestamp Number of milliseconds elapsed since creation of nemesis block.
        * @param difficulty Block difficulty.
        * @param generationHashProof Generation hash proof.
        * @param previousBlockHash Previous block hash.
        * @param transactionsHash Hash of the transactions in this block.
        * @param receiptsHash Hash of the receipts generated by this block.
        * @param stateHash Hash of the global chain state at this block.
        * @param beneficiaryAddress Beneficiary address designated by harvester.
        * @param feeMultiplier Fee multiplier applied to block transactions.
        */
        internal BlockHeaderBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, HeightDto height, TimestampDto timestamp, DifficultyDto difficulty, VrfProofBuilder generationHashProof, Hash256Dto previousBlockHash, Hash256Dto transactionsHash, Hash256Dto receiptsHash, Hash256Dto stateHash, AddressDto beneficiaryAddress, BlockFeeMultiplierDto feeMultiplier)
        {
            GeneratorUtils.NotNull(signature, "signature is null");
            GeneratorUtils.NotNull(signerPublicKey, "signerPublicKey is null");
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(network, "network is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(height, "height is null");
            GeneratorUtils.NotNull(timestamp, "timestamp is null");
            GeneratorUtils.NotNull(difficulty, "difficulty is null");
            GeneratorUtils.NotNull(generationHashProof, "generationHashProof is null");
            GeneratorUtils.NotNull(previousBlockHash, "previousBlockHash is null");
            GeneratorUtils.NotNull(transactionsHash, "transactionsHash is null");
            GeneratorUtils.NotNull(receiptsHash, "receiptsHash is null");
            GeneratorUtils.NotNull(stateHash, "stateHash is null");
            GeneratorUtils.NotNull(beneficiaryAddress, "beneficiaryAddress is null");
            GeneratorUtils.NotNull(feeMultiplier, "feeMultiplier is null");
            this.verifiableEntityHeader_Reserved1 = 0;
            this.signature = signature;
            this.signerPublicKey = signerPublicKey;
            this.entityBody_Reserved1 = 0;
            this.version = version;
            this.network = network;
            this.type = type;
            this.height = height;
            this.timestamp = timestamp;
            this.difficulty = difficulty;
            this.generationHashProof = generationHashProof;
            this.previousBlockHash = previousBlockHash;
            this.transactionsHash = transactionsHash;
            this.receiptsHash = receiptsHash;
            this.stateHash = stateHash;
            this.beneficiaryAddress = beneficiaryAddress;
            this.feeMultiplier = feeMultiplier;
        }
        
        /*
        * Creates an instance of BlockHeaderBuilder.
        *
        * @param signature Entity signature.
        * @param signerPublicKey Entity signer's public key.
        * @param version Entity version.
        * @param network Entity network.
        * @param type Entity type.
        * @param height Block height.
        * @param timestamp Number of milliseconds elapsed since creation of nemesis block.
        * @param difficulty Block difficulty.
        * @param generationHashProof Generation hash proof.
        * @param previousBlockHash Previous block hash.
        * @param transactionsHash Hash of the transactions in this block.
        * @param receiptsHash Hash of the receipts generated by this block.
        * @param stateHash Hash of the global chain state at this block.
        * @param beneficiaryAddress Beneficiary address designated by harvester.
        * @param feeMultiplier Fee multiplier applied to block transactions.
        * @return Instance of BlockHeaderBuilder.
        */
        public static  BlockHeaderBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, HeightDto height, TimestampDto timestamp, DifficultyDto difficulty, VrfProofBuilder generationHashProof, Hash256Dto previousBlockHash, Hash256Dto transactionsHash, Hash256Dto receiptsHash, Hash256Dto stateHash, AddressDto beneficiaryAddress, BlockFeeMultiplierDto feeMultiplier) {
            return new BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
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
        * Gets block height.
        *
        * @return Block height.
        */
        public HeightDto GetHeight() {
            return height;
        }

        /*
        * Gets number of milliseconds elapsed since creation of nemesis block.
        *
        * @return Number of milliseconds elapsed since creation of nemesis block.
        */
        public TimestampDto GetTimestamp() {
            return timestamp;
        }

        /*
        * Gets block difficulty.
        *
        * @return Block difficulty.
        */
        public DifficultyDto GetDifficulty() {
            return difficulty;
        }

        /*
        * Gets generation hash proof.
        *
        * @return Generation hash proof.
        */
        public VrfProofBuilder GetGenerationHashProof() {
            return generationHashProof;
        }

        /*
        * Gets previous block hash.
        *
        * @return Previous block hash.
        */
        public Hash256Dto GetPreviousBlockHash() {
            return previousBlockHash;
        }

        /*
        * Gets hash of the transactions in this block.
        *
        * @return Hash of the transactions in this block.
        */
        public Hash256Dto GetTransactionsHash() {
            return transactionsHash;
        }

        /*
        * Gets hash of the receipts generated by this block.
        *
        * @return Hash of the receipts generated by this block.
        */
        public Hash256Dto GetReceiptsHash() {
            return receiptsHash;
        }

        /*
        * Gets hash of the global chain state at this block.
        *
        * @return Hash of the global chain state at this block.
        */
        public Hash256Dto GetStateHash() {
            return stateHash;
        }

        /*
        * Gets beneficiary address designated by harvester.
        *
        * @return Beneficiary address designated by harvester.
        */
        public AddressDto GetBeneficiaryAddress() {
            return beneficiaryAddress;
        }

        /*
        * Gets fee multiplier applied to block transactions.
        *
        * @return Fee multiplier applied to block transactions.
        */
        public BlockFeeMultiplierDto GetFeeMultiplier() {
            return feeMultiplier;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += 4; // size
            size += 4; // verifiableEntityHeader_Reserved1
            size += signature.GetSize();
            size += signerPublicKey.GetSize();
            size += 4; // entityBody_Reserved1
            size += 1; // version
            size += network.GetSize();
            size += type.GetSize();
            size += height.GetSize();
            size += timestamp.GetSize();
            size += difficulty.GetSize();
            size += generationHashProof.GetSize();
            size += previousBlockHash.GetSize();
            size += transactionsHash.GetSize();
            size += receiptsHash.GetSize();
            size += stateHash.GetSize();
            size += beneficiaryAddress.GetSize();
            size += feeMultiplier.GetSize();
            return size;
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
            var heightEntityBytes = (height).Serialize();
            bw.Write(heightEntityBytes, 0, heightEntityBytes.Length);
            var timestampEntityBytes = (timestamp).Serialize();
            bw.Write(timestampEntityBytes, 0, timestampEntityBytes.Length);
            var difficultyEntityBytes = (difficulty).Serialize();
            bw.Write(difficultyEntityBytes, 0, difficultyEntityBytes.Length);
            var generationHashProofEntityBytes = (generationHashProof).Serialize();
            bw.Write(generationHashProofEntityBytes, 0, generationHashProofEntityBytes.Length);
            var previousBlockHashEntityBytes = (previousBlockHash).Serialize();
            bw.Write(previousBlockHashEntityBytes, 0, previousBlockHashEntityBytes.Length);
            var transactionsHashEntityBytes = (transactionsHash).Serialize();
            bw.Write(transactionsHashEntityBytes, 0, transactionsHashEntityBytes.Length);
            var receiptsHashEntityBytes = (receiptsHash).Serialize();
            bw.Write(receiptsHashEntityBytes, 0, receiptsHashEntityBytes.Length);
            var stateHashEntityBytes = (stateHash).Serialize();
            bw.Write(stateHashEntityBytes, 0, stateHashEntityBytes.Length);
            var beneficiaryAddressEntityBytes = (beneficiaryAddress).Serialize();
            bw.Write(beneficiaryAddressEntityBytes, 0, beneficiaryAddressEntityBytes.Length);
            var feeMultiplierEntityBytes = (feeMultiplier).Serialize();
            bw.Write(feeMultiplierEntityBytes, 0, feeMultiplierEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}
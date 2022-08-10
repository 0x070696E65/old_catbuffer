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
    * Binary layout for a normal block header
    */
    [Serializable]
    public class NormalBlockHeaderBuilder: BlockHeaderBuilder {

        /* Reserved padding to align end of BlockHeader on 8-byte boundary. */
        public int blockHeader_Reserved1;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal NormalBlockHeaderBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                blockHeader_Reserved1 = stream.ReadInt32();
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of NormalBlockHeaderBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of NormalBlockHeaderBuilder.
        */
        public new static NormalBlockHeaderBuilder LoadFromBinary(BinaryReader stream) {
            return new NormalBlockHeaderBuilder(stream);
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
        internal NormalBlockHeaderBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, HeightDto height, TimestampDto timestamp, DifficultyDto difficulty, VrfProofBuilder generationHashProof, Hash256Dto previousBlockHash, Hash256Dto transactionsHash, Hash256Dto receiptsHash, Hash256Dto stateHash, AddressDto beneficiaryAddress, BlockFeeMultiplierDto feeMultiplier)
            : base(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier)
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
            this.blockHeader_Reserved1 = 0;
        }
        
        /*
        * Creates an instance of NormalBlockHeaderBuilder.
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
        * @return Instance of NormalBlockHeaderBuilder.
        */
        public static new NormalBlockHeaderBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, HeightDto height, TimestampDto timestamp, DifficultyDto difficulty, VrfProofBuilder generationHashProof, Hash256Dto previousBlockHash, Hash256Dto transactionsHash, Hash256Dto receiptsHash, Hash256Dto stateHash, AddressDto beneficiaryAddress, BlockFeeMultiplierDto feeMultiplier) {
            return new NormalBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier);
        }

        /*
        * Gets reserved padding to align end of BlockHeader on 8-byte boundary.
        *
        * @return Reserved padding to align end of BlockHeader on 8-byte boundary.
        */
        private int GetBlockHeader_Reserved1() {
            return blockHeader_Reserved1;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public new int GetSize() {
            var size = base.GetSize();
            size += 4; // blockHeader_Reserved1
            return size;
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
            bw.Write(GetBlockHeader_Reserved1());
            var result = ms.ToArray();
            return result;
        }
    }
}

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
    * Binary layout for an importance block header
    */
    [Serializable]
    public class ImportanceBlockHeaderBuilder: BlockHeaderBuilder {

        /* Importance block footer. */
        public ImportanceBlockFooterBuilder importanceBlockFooter;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal ImportanceBlockHeaderBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                importanceBlockFooter = ImportanceBlockFooterBuilder.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of ImportanceBlockHeaderBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of ImportanceBlockHeaderBuilder.
        */
        public new static ImportanceBlockHeaderBuilder LoadFromBinary(BinaryReader stream) {
            return new ImportanceBlockHeaderBuilder(stream);
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
        * @param votingEligibleAccountsCount Number of voting eligible accounts.
        * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
        * @param totalVotingBalance Total balance eligible for voting.
        * @param previousImportanceBlockHash Previous importance block hash.
        */
        internal ImportanceBlockHeaderBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, HeightDto height, TimestampDto timestamp, DifficultyDto difficulty, VrfProofBuilder generationHashProof, Hash256Dto previousBlockHash, Hash256Dto transactionsHash, Hash256Dto receiptsHash, Hash256Dto stateHash, AddressDto beneficiaryAddress, BlockFeeMultiplierDto feeMultiplier, int votingEligibleAccountsCount, long harvestingEligibleAccountsCount, AmountDto totalVotingBalance, Hash256Dto previousImportanceBlockHash)
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
            GeneratorUtils.NotNull(votingEligibleAccountsCount, "votingEligibleAccountsCount is null");
            GeneratorUtils.NotNull(harvestingEligibleAccountsCount, "harvestingEligibleAccountsCount is null");
            GeneratorUtils.NotNull(totalVotingBalance, "totalVotingBalance is null");
            GeneratorUtils.NotNull(previousImportanceBlockHash, "previousImportanceBlockHash is null");
            this.importanceBlockFooter = new ImportanceBlockFooterBuilder(votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash);
        }
        
        /*
        * Creates an instance of ImportanceBlockHeaderBuilder.
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
        * @param votingEligibleAccountsCount Number of voting eligible accounts.
        * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
        * @param totalVotingBalance Total balance eligible for voting.
        * @param previousImportanceBlockHash Previous importance block hash.
        * @return Instance of ImportanceBlockHeaderBuilder.
        */
        public static  ImportanceBlockHeaderBuilder Create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, HeightDto height, TimestampDto timestamp, DifficultyDto difficulty, VrfProofBuilder generationHashProof, Hash256Dto previousBlockHash, Hash256Dto transactionsHash, Hash256Dto receiptsHash, Hash256Dto stateHash, AddressDto beneficiaryAddress, BlockFeeMultiplierDto feeMultiplier, int votingEligibleAccountsCount, long harvestingEligibleAccountsCount, AmountDto totalVotingBalance, Hash256Dto previousImportanceBlockHash) {
            return new ImportanceBlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash);
        }

        /*
        * Gets number of voting eligible accounts.
        *
        * @return Number of voting eligible accounts.
        */
        public int GetVotingEligibleAccountsCount() {
            return importanceBlockFooter.GetVotingEligibleAccountsCount();
        }

        /*
        * Gets number of harvesting eligible accounts.
        *
        * @return Number of harvesting eligible accounts.
        */
        public long GetHarvestingEligibleAccountsCount() {
            return importanceBlockFooter.GetHarvestingEligibleAccountsCount();
        }

        /*
        * Gets total balance eligible for voting.
        *
        * @return Total balance eligible for voting.
        */
        public AmountDto GetTotalVotingBalance() {
            return importanceBlockFooter.GetTotalVotingBalance();
        }

        /*
        * Gets previous importance block hash.
        *
        * @return Previous importance block hash.
        */
        public Hash256Dto GetPreviousImportanceBlockHash() {
            return importanceBlockFooter.GetPreviousImportanceBlockHash();
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public new int GetSize() {
            var size = base.GetSize();
            size += importanceBlockFooter.GetSize();
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
            var importanceBlockFooterEntityBytes = (importanceBlockFooter).Serialize();
            bw.Write(importanceBlockFooterEntityBytes, 0, importanceBlockFooterEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}

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

import { AddressDto } from './AddressDto';
import { AmountDto } from './AmountDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder, BlockHeaderBuilderParams } from './BlockHeaderBuilder';
import { DifficultyDto } from './DifficultyDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { ImportanceBlockFooterBuilder } from './ImportanceBlockFooterBuilder';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';

/**
 *  Interface to create instances of ImportanceBlockHeaderBuilder.
 */
export interface ImportanceBlockHeaderBuilderParams extends BlockHeaderBuilderParams {
    /** Number of voting eligible accounts. **/
    votingEligibleAccountsCount: number;
    /** Number of harvesting eligible accounts. **/
    harvestingEligibleAccountsCount: bigint;
    /** Total balance eligible for voting. **/
    totalVotingBalance: AmountDto;
    /** Previous importance block hash. **/
    previousImportanceBlockHash: Hash256Dto;
}

/**
 * Binary layout for an importance block header
 **/
export class ImportanceBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.IMPORTANCE_BLOCK_HEADER;

    /** Importance block footer. **/
    public readonly importanceBlockFooter: ImportanceBlockFooterBuilder;

    /**
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
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        height,
        timestamp,
        difficulty,
        generationHashProof,
        previousBlockHash,
        transactionsHash,
        receiptsHash,
        stateHash,
        beneficiaryAddress,
        feeMultiplier,
        votingEligibleAccountsCount,
        harvestingEligibleAccountsCount,
        totalVotingBalance,
        previousImportanceBlockHash,
    }: ImportanceBlockHeaderBuilderParams) {
        super({
            signature,
            signerPublicKey,
            version,
            network,
            type,
            height,
            timestamp,
            difficulty,
            generationHashProof,
            previousBlockHash,
            transactionsHash,
            receiptsHash,
            stateHash,
            beneficiaryAddress,
            feeMultiplier,
        });
        this.importanceBlockFooter = new ImportanceBlockFooterBuilder({
            votingEligibleAccountsCount,
            harvestingEligibleAccountsCount,
            totalVotingBalance,
            previousImportanceBlockHash,
        });
        if (version !== ImportanceBlockHeaderBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + ImportanceBlockHeaderBuilder.VERSION,
            );
        if (type !== ImportanceBlockHeaderBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + ImportanceBlockHeaderBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ImportanceBlockHeaderBuilder {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const importanceBlockFooter: ImportanceBlockFooterBuilder = ImportanceBlockFooterBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importanceBlockFooter.size);
        return new ImportanceBlockHeaderBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            height: superObject.height,
            timestamp: superObject.timestamp,
            difficulty: superObject.difficulty,
            generationHashProof: superObject.generationHashProof,
            previousBlockHash: superObject.previousBlockHash,
            transactionsHash: superObject.transactionsHash,
            receiptsHash: superObject.receiptsHash,
            stateHash: superObject.stateHash,
            beneficiaryAddress: superObject.beneficiaryAddress,
            feeMultiplier: superObject.feeMultiplier,
            votingEligibleAccountsCount: importanceBlockFooter.votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: importanceBlockFooter.harvestingEligibleAccountsCount,
            totalVotingBalance: importanceBlockFooter.totalVotingBalance,
            previousImportanceBlockHash: importanceBlockFooter.previousImportanceBlockHash,
        });
    }

    /**
     * Creates an instance of ImportanceBlockHeaderBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
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
    public static createImportanceBlockHeaderBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        height: HeightDto,
        timestamp: TimestampDto,
        difficulty: DifficultyDto,
        generationHashProof: VrfProofBuilder,
        previousBlockHash: Hash256Dto,
        transactionsHash: Hash256Dto,
        receiptsHash: Hash256Dto,
        stateHash: Hash256Dto,
        beneficiaryAddress: AddressDto,
        feeMultiplier: BlockFeeMultiplierDto,
        votingEligibleAccountsCount: number,
        harvestingEligibleAccountsCount: bigint,
        totalVotingBalance: AmountDto,
        previousImportanceBlockHash: Hash256Dto,
    ): ImportanceBlockHeaderBuilder {
        const version = ImportanceBlockHeaderBuilder.VERSION;
        const type = ImportanceBlockHeaderBuilder.ENTITY_TYPE;
        return new ImportanceBlockHeaderBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            height: height,
            timestamp: timestamp,
            difficulty: difficulty,
            generationHashProof: generationHashProof,
            previousBlockHash: previousBlockHash,
            transactionsHash: transactionsHash,
            receiptsHash: receiptsHash,
            stateHash: stateHash,
            beneficiaryAddress: beneficiaryAddress,
            feeMultiplier: feeMultiplier,
            votingEligibleAccountsCount: votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: harvestingEligibleAccountsCount,
            totalVotingBalance: totalVotingBalance,
            previousImportanceBlockHash: previousImportanceBlockHash,
        });
    }

    /**
     * Gets number of voting eligible accounts.
     *
     * @return Number of voting eligible accounts.
     */
    public get votingEligibleAccountsCount(): number {
        return this.importanceBlockFooter.votingEligibleAccountsCount;
    }

    /**
     * Gets number of harvesting eligible accounts.
     *
     * @return Number of harvesting eligible accounts.
     */
    public get harvestingEligibleAccountsCount(): bigint {
        return this.importanceBlockFooter.harvestingEligibleAccountsCount;
    }

    /**
     * Gets total balance eligible for voting.
     *
     * @return Total balance eligible for voting.
     */
    public get totalVotingBalance(): AmountDto {
        return this.importanceBlockFooter.totalVotingBalance;
    }

    /**
     * Gets previous importance block hash.
     *
     * @return Previous importance block hash.
     */
    public get previousImportanceBlockHash(): Hash256Dto {
        return this.importanceBlockFooter.previousImportanceBlockHash;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.importanceBlockFooter.size; // importanceBlockFooter
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const importanceBlockFooterBytes = this.importanceBlockFooter.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, importanceBlockFooterBytes);
        return newArray;
    }
}
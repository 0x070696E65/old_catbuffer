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

import { AmountDto } from './AmountDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of ImportanceBlockFooterBuilder.
 */
export interface ImportanceBlockFooterBuilderParams {
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
 * Binary layout for an importance block footer
 **/
export class ImportanceBlockFooterBuilder implements Serializer {
    /** Number of voting eligible accounts. **/
    public readonly votingEligibleAccountsCount: number;

    /** Number of harvesting eligible accounts. **/
    public readonly harvestingEligibleAccountsCount: bigint;

    /** Total balance eligible for voting. **/
    public readonly totalVotingBalance: AmountDto;

    /** Previous importance block hash. **/
    public readonly previousImportanceBlockHash: Hash256Dto;

    /**
     * Constructor.
     *
     * @param votingEligibleAccountsCount Number of voting eligible accounts.
     * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
     * @param totalVotingBalance Total balance eligible for voting.
     * @param previousImportanceBlockHash Previous importance block hash.
     */
    public constructor({
        votingEligibleAccountsCount,
        harvestingEligibleAccountsCount,
        totalVotingBalance,
        previousImportanceBlockHash,
    }: ImportanceBlockFooterBuilderParams) {
        GeneratorUtils.notNull(votingEligibleAccountsCount, 'votingEligibleAccountsCount is null or undefined');
        GeneratorUtils.notNull(harvestingEligibleAccountsCount, 'harvestingEligibleAccountsCount is null or undefined');
        GeneratorUtils.notNull(totalVotingBalance, 'totalVotingBalance is null or undefined');
        GeneratorUtils.notNull(previousImportanceBlockHash, 'previousImportanceBlockHash is null or undefined');
        this.votingEligibleAccountsCount = votingEligibleAccountsCount;
        this.harvestingEligibleAccountsCount = harvestingEligibleAccountsCount;
        this.totalVotingBalance = totalVotingBalance;
        this.previousImportanceBlockHash = previousImportanceBlockHash;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ImportanceBlockFooterBuilder {
        const byteArray = Array.from(payload);
        const votingEligibleAccountsCount: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const harvestingEligibleAccountsCount: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const totalVotingBalance: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalVotingBalance.size);
        const previousImportanceBlockHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousImportanceBlockHash.size);
        return new ImportanceBlockFooterBuilder({
            votingEligibleAccountsCount: votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: harvestingEligibleAccountsCount,
            totalVotingBalance: totalVotingBalance,
            previousImportanceBlockHash: previousImportanceBlockHash,
        });
    }

    /**
     * Creates an instance of ImportanceBlockFooterBuilder.
     *
     * @param votingEligibleAccountsCount Number of voting eligible accounts.
     * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
     * @param totalVotingBalance Total balance eligible for voting.
     * @param previousImportanceBlockHash Previous importance block hash.
     * @return Instance of ImportanceBlockFooterBuilder.
     */
    public static createImportanceBlockFooterBuilder(
        votingEligibleAccountsCount: number,
        harvestingEligibleAccountsCount: bigint,
        totalVotingBalance: AmountDto,
        previousImportanceBlockHash: Hash256Dto,
    ): ImportanceBlockFooterBuilder {
        return new ImportanceBlockFooterBuilder({
            votingEligibleAccountsCount: votingEligibleAccountsCount,
            harvestingEligibleAccountsCount: harvestingEligibleAccountsCount,
            totalVotingBalance: totalVotingBalance,
            previousImportanceBlockHash: previousImportanceBlockHash,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 4; // votingEligibleAccountsCount
        size += 8; // harvestingEligibleAccountsCount
        size += this.totalVotingBalance.size; // totalVotingBalance
        size += this.previousImportanceBlockHash.size; // previousImportanceBlockHash
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const votingEligibleAccountsCountBytes = GeneratorUtils.uint32ToBuffer(this.votingEligibleAccountsCount);
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingEligibleAccountsCountBytes);
        const harvestingEligibleAccountsCountBytes = GeneratorUtils.bigIntToBuffer(this.harvestingEligibleAccountsCount);
        newArray = GeneratorUtils.concatTypedArrays(newArray, harvestingEligibleAccountsCountBytes);
        const totalVotingBalanceBytes = this.totalVotingBalance.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, totalVotingBalanceBytes);
        const previousImportanceBlockHashBytes = this.previousImportanceBlockHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousImportanceBlockHashBytes);
        return newArray;
    }
}

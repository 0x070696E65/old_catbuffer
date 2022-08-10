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

package io.nem.symbol.catapult.builders;

import java.io.DataInputStream;
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;

/**
* Binary layout for an importance block footer
**/
public class ImportanceBlockFooterBuilder implements Serializer {

    /** Number of voting eligible accounts. **/
    private final int votingEligibleAccountsCount;

    /** Number of harvesting eligible accounts. **/
    private final long harvestingEligibleAccountsCount;

    /** Total balance eligible for voting. **/
    private final AmountDto totalVotingBalance;

    /** Previous importance block hash. **/
    private final Hash256Dto previousImportanceBlockHash;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected ImportanceBlockFooterBuilder(DataInputStream stream) {
        try {
            this.votingEligibleAccountsCount = Integer.reverseBytes(stream.readInt());
            this.harvestingEligibleAccountsCount = Long.reverseBytes(stream.readLong());
            this.totalVotingBalance = AmountDto.loadFromBinary(stream);
            this.previousImportanceBlockHash = Hash256Dto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of ImportanceBlockFooterBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of ImportanceBlockFooterBuilder.
     */
    public static ImportanceBlockFooterBuilder loadFromBinary(DataInputStream stream) {
        return new ImportanceBlockFooterBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param votingEligibleAccountsCount Number of voting eligible accounts.
    * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
    * @param totalVotingBalance Total balance eligible for voting.
    * @param previousImportanceBlockHash Previous importance block hash.
    */
    protected ImportanceBlockFooterBuilder(int votingEligibleAccountsCount, long harvestingEligibleAccountsCount, AmountDto totalVotingBalance, Hash256Dto previousImportanceBlockHash) {
        GeneratorUtils.notNull(votingEligibleAccountsCount, "votingEligibleAccountsCount is null");
        GeneratorUtils.notNull(harvestingEligibleAccountsCount, "harvestingEligibleAccountsCount is null");
        GeneratorUtils.notNull(totalVotingBalance, "totalVotingBalance is null");
        GeneratorUtils.notNull(previousImportanceBlockHash, "previousImportanceBlockHash is null");
        this.votingEligibleAccountsCount = votingEligibleAccountsCount;
        this.harvestingEligibleAccountsCount = harvestingEligibleAccountsCount;
        this.totalVotingBalance = totalVotingBalance;
        this.previousImportanceBlockHash = previousImportanceBlockHash;
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
    public static ImportanceBlockFooterBuilder create(int votingEligibleAccountsCount, long harvestingEligibleAccountsCount, AmountDto totalVotingBalance, Hash256Dto previousImportanceBlockHash) {
        return new ImportanceBlockFooterBuilder(votingEligibleAccountsCount, harvestingEligibleAccountsCount, totalVotingBalance, previousImportanceBlockHash);
    }

    /**
     * Gets number of voting eligible accounts.
     *
     * @return Number of voting eligible accounts.
     */
    public int getVotingEligibleAccountsCount() {
        return this.votingEligibleAccountsCount;
    }

    /**
     * Gets number of harvesting eligible accounts.
     *
     * @return Number of harvesting eligible accounts.
     */
    public long getHarvestingEligibleAccountsCount() {
        return this.harvestingEligibleAccountsCount;
    }

    /**
     * Gets total balance eligible for voting.
     *
     * @return Total balance eligible for voting.
     */
    public AmountDto getTotalVotingBalance() {
        return this.totalVotingBalance;
    }

    /**
     * Gets previous importance block hash.
     *
     * @return Previous importance block hash.
     */
    public Hash256Dto getPreviousImportanceBlockHash() {
        return this.previousImportanceBlockHash;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 4; // votingEligibleAccountsCount
        size += 8; // harvestingEligibleAccountsCount
        size += this.totalVotingBalance.getSize();
        size += this.previousImportanceBlockHash.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getVotingEligibleAccountsCount()));
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getHarvestingEligibleAccountsCount()));
            GeneratorUtils.writeEntity(dataOutputStream, this.totalVotingBalance);
            GeneratorUtils.writeEntity(dataOutputStream, this.previousImportanceBlockHash);
        });
    }
}


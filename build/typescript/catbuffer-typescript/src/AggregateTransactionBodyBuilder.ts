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

import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { EmbeddedTransactionHelper } from './EmbeddedTransactionHelper';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of AggregateTransactionBodyBuilder.
 */
export interface AggregateTransactionBodyBuilderParams {
    /** Aggregate hash of an aggregate's transactions. **/
    transactionsHash: Hash256Dto;
    /** Sub-transaction data (transactions are variable sized and payload size is in bytes). **/
    transactions: EmbeddedTransactionBuilder[];
    /** Cosignatures data (fills remaining body space after transactions). **/
    cosignatures: CosignatureBuilder[];
}

/**
 * Binary layout for an aggregate transaction
 **/
export class AggregateTransactionBodyBuilder implements Serializer {
    /** Aggregate hash of an aggregate's transactions. **/
    public readonly transactionsHash: Hash256Dto;

    /** Sub-transaction data (transactions are variable sized and payload size is in bytes). **/
    public readonly transactions: EmbeddedTransactionBuilder[];

    /** Cosignatures data (fills remaining body space after transactions). **/
    public readonly cosignatures: CosignatureBuilder[];

    /**
     * Constructor.
     *
     * @param transactionsHash Aggregate hash of an aggregate's transactions.
     * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
     * @param cosignatures Cosignatures data (fills remaining body space after transactions).
     */
    public constructor({ transactionsHash, transactions, cosignatures }: AggregateTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(transactionsHash, 'transactionsHash is null or undefined');
        GeneratorUtils.notNull(transactions, 'transactions is null or undefined');
        GeneratorUtils.notNull(cosignatures, 'cosignatures is null or undefined');
        this.transactionsHash = transactionsHash;
        this.transactions = transactions;
        this.cosignatures = cosignatures;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AggregateTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const transactionsHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.size);
        const payloadSize: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const transactions: EmbeddedTransactionBuilder[] = GeneratorUtils.loadFromBinaryRemaining(
            EmbeddedTransactionHelper.loadFromBinary,
            Uint8Array.from(byteArray),
            payloadSize,
            8,
        );
        byteArray.splice(
            0,
            transactions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 8), 0),
        );
        const cosignatures: CosignatureBuilder[] = GeneratorUtils.loadFromBinaryRemaining(
            CosignatureBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            byteArray.length,
            0,
        );
        byteArray.splice(
            0,
            cosignatures.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0),
        );
        return new AggregateTransactionBodyBuilder({
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }

    /**
     * Creates an instance of AggregateTransactionBodyBuilder.
     *
     * @param transactionsHash Aggregate hash of an aggregate's transactions.
     * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
     * @param cosignatures Cosignatures data (fills remaining body space after transactions).
     * @return Instance of AggregateTransactionBodyBuilder.
     */
    public static createAggregateTransactionBodyBuilder(
        transactionsHash: Hash256Dto,
        transactions: EmbeddedTransactionBuilder[],
        cosignatures: CosignatureBuilder[],
    ): AggregateTransactionBodyBuilder {
        return new AggregateTransactionBodyBuilder({
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.transactionsHash.size; // transactionsHash
        size += 4; // payloadSize
        size += 4; // aggregateTransactionHeader_Reserved1
        size += this.transactions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 8), 0); // transactions
        size += this.cosignatures.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // cosignatures
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const payloadSize = this.transactions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 8), 0);
        const payloadSizeBytes = GeneratorUtils.uint32ToBuffer(payloadSize);
        newArray = GeneratorUtils.concatTypedArrays(newArray, payloadSizeBytes);
        const aggregateTransactionHeader_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionHeader_Reserved1Bytes);
        const transactionsBytes = GeneratorUtils.writeList(this.transactions, 8);
        newArray = GeneratorUtils.concatTypedArrays(newArray, transactionsBytes);
        const cosignaturesBytes = GeneratorUtils.writeList(this.cosignatures, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, cosignaturesBytes);
        return newArray;
    }
}

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

import { AggregateTransactionBodyBuilder } from './AggregateTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';

/**
 *  Interface to create instances of AggregateCompleteTransactionBuilder.
 */
export interface AggregateCompleteTransactionBuilderParams extends TransactionBuilderParams {
    /** Aggregate hash of an aggregate's transactions. **/
    transactionsHash: Hash256Dto;
    /** Sub-transaction data (transactions are variable sized and payload size is in bytes). **/
    transactions: EmbeddedTransactionBuilder[];
    /** Cosignatures data (fills remaining body space after transactions). **/
    cosignatures: CosignatureBuilder[];
}

/**
 * Binary layout for an aggregate complete transaction
 **/
export class AggregateCompleteTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.AGGREGATE_COMPLETE_TRANSACTION;

    /** Aggregate transaction body. **/
    public readonly aggregateTransactionBody: AggregateTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param transactionsHash Aggregate hash of an aggregate's transactions.
     * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
     * @param cosignatures Cosignatures data (fills remaining body space after transactions).
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        transactionsHash,
        transactions,
        cosignatures,
    }: AggregateCompleteTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder({ transactionsHash, transactions, cosignatures });
        if (version !== AggregateCompleteTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + AggregateCompleteTransactionBuilder.VERSION,
            );
        if (type !== AggregateCompleteTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + AggregateCompleteTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AggregateCompleteTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const aggregateTransactionBody: AggregateTransactionBodyBuilder = AggregateTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, aggregateTransactionBody.size);
        return new AggregateCompleteTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            transactionsHash: aggregateTransactionBody.transactionsHash,
            transactions: aggregateTransactionBody.transactions,
            cosignatures: aggregateTransactionBody.cosignatures,
        });
    }

    /**
     * Creates an instance of AggregateCompleteTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param transactionsHash Aggregate hash of an aggregate's transactions.
     * @param transactions Sub-transaction data (transactions are variable sized and payload size is in bytes).
     * @param cosignatures Cosignatures data (fills remaining body space after transactions).
     * @return Instance of AggregateCompleteTransactionBuilder.
     */
    public static createAggregateCompleteTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        transactionsHash: Hash256Dto,
        transactions: EmbeddedTransactionBuilder[],
        cosignatures: CosignatureBuilder[],
    ): AggregateCompleteTransactionBuilder {
        const version = AggregateCompleteTransactionBuilder.VERSION;
        const type = AggregateCompleteTransactionBuilder.ENTITY_TYPE;
        return new AggregateCompleteTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }

    /**
     * Gets aggregate hash of an aggregate's transactions.
     *
     * @return Aggregate hash of an aggregate's transactions.
     */
    public get transactionsHash(): Hash256Dto {
        return this.aggregateTransactionBody.transactionsHash;
    }

    /**
     * Gets sub-transaction data (transactions are variable sized and payload size is in bytes).
     *
     * @return Sub-transaction data (transactions are variable sized and payload size is in bytes).
     */
    public get transactions(): EmbeddedTransactionBuilder[] {
        return this.aggregateTransactionBody.transactions;
    }

    /**
     * Gets cosignatures data (fills remaining body space after transactions).
     *
     * @return Cosignatures data (fills remaining body space after transactions).
     */
    public get cosignatures(): CosignatureBuilder[] {
        return this.aggregateTransactionBody.cosignatures;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.aggregateTransactionBody.size; // aggregateTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AggregateTransactionBodyBuilder {
        return this.aggregateTransactionBody;
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
        const aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    }
}

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

import { AccountMetadataTransactionBodyBuilder } from './AccountMetadataTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of AccountMetadataTransactionBuilder.
 */
export interface AccountMetadataTransactionBuilderParams extends TransactionBuilderParams {
    /** Metadata target address. **/
    targetAddress: UnresolvedAddressDto;
    /** Metadata key scoped to source, target and type. **/
    scopedMetadataKey: bigint;
    /** Change in value size in bytes. **/
    valueSizeDelta: number;
    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). **/
    value: Uint8Array;
}

/**
 * Binary layout for a non-embedded account metadata transaction
 **/
export class AccountMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_METADATA_TRANSACTION;

    /** Account metadata transaction body. **/
    public readonly accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder;

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
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        targetAddress,
        scopedMetadataKey,
        valueSizeDelta,
        value,
    }: AccountMetadataTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder({
            targetAddress,
            scopedMetadataKey,
            valueSizeDelta,
            value,
        });
        if (version !== AccountMetadataTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + AccountMetadataTransactionBuilder.VERSION,
            );
        if (type !== AccountMetadataTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + AccountMetadataTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountMetadataTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder = AccountMetadataTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, accountMetadataTransactionBody.size);
        return new AccountMetadataTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            targetAddress: accountMetadataTransactionBody.targetAddress,
            scopedMetadataKey: accountMetadataTransactionBody.scopedMetadataKey,
            valueSizeDelta: accountMetadataTransactionBody.valueSizeDelta,
            value: accountMetadataTransactionBody.value,
        });
    }

    /**
     * Creates an instance of AccountMetadataTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of AccountMetadataTransactionBuilder.
     */
    public static createAccountMetadataTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: bigint,
        valueSizeDelta: number,
        value: Uint8Array,
    ): AccountMetadataTransactionBuilder {
        const version = AccountMetadataTransactionBuilder.VERSION;
        const type = AccountMetadataTransactionBuilder.ENTITY_TYPE;
        return new AccountMetadataTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            valueSizeDelta: valueSizeDelta,
            value: value,
        });
    }

    /**
     * Gets metadata target address.
     *
     * @return Metadata target address.
     */
    public get targetAddress(): UnresolvedAddressDto {
        return this.accountMetadataTransactionBody.targetAddress;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public get scopedMetadataKey(): bigint {
        return this.accountMetadataTransactionBody.scopedMetadataKey;
    }

    /**
     * Gets change in value size in bytes.
     *
     * @return Change in value size in bytes.
     */
    public get valueSizeDelta(): number {
        return this.accountMetadataTransactionBody.valueSizeDelta;
    }

    /**
     * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     *
     * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public get value(): Uint8Array {
        return this.accountMetadataTransactionBody.value;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.accountMetadataTransactionBody.size; // accountMetadataTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AccountMetadataTransactionBodyBuilder {
        return this.accountMetadataTransactionBody;
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
        const accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    }
}

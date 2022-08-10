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
import { BlockDurationDto } from './BlockDurationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { HashLockTransactionBodyBuilder } from './HashLockTransactionBodyBuilder';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 *  Interface to create instances of HashLockTransactionBuilder.
 */
export interface HashLockTransactionBuilderParams extends TransactionBuilderParams {
    /** Lock mosaic. **/
    mosaic: UnresolvedMosaicBuilder;
    /** Number of blocks for which a lock should be valid. **/
    duration: BlockDurationDto;
    /** Lock hash. **/
    hash: Hash256Dto;
}

/**
 * Binary layout for a non-embedded hash lock transaction
 **/
export class HashLockTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.HASH_LOCK_TRANSACTION;

    /** Hash lock transaction body. **/
    public readonly hashLockTransactionBody: HashLockTransactionBodyBuilder;

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
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        mosaic,
        duration,
        hash,
    }: HashLockTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder({ mosaic, duration, hash });
        if (version !== HashLockTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + HashLockTransactionBuilder.VERSION,
            );
        if (type !== HashLockTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + HashLockTransactionBuilder.ENTITY_TYPE);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): HashLockTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const hashLockTransactionBody: HashLockTransactionBodyBuilder = HashLockTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, hashLockTransactionBody.size);
        return new HashLockTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            mosaic: hashLockTransactionBody.mosaic,
            duration: hashLockTransactionBody.duration,
            hash: hashLockTransactionBody.hash,
        });
    }

    /**
     * Creates an instance of HashLockTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param mosaic Lock mosaic.
     * @param duration Number of blocks for which a lock should be valid.
     * @param hash Lock hash.
     * @return Instance of HashLockTransactionBuilder.
     */
    public static createHashLockTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        mosaic: UnresolvedMosaicBuilder,
        duration: BlockDurationDto,
        hash: Hash256Dto,
    ): HashLockTransactionBuilder {
        const version = HashLockTransactionBuilder.VERSION;
        const type = HashLockTransactionBuilder.ENTITY_TYPE;
        return new HashLockTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            mosaic: mosaic,
            duration: duration,
            hash: hash,
        });
    }

    /**
     * Gets lock mosaic.
     *
     * @return Lock mosaic.
     */
    public get mosaic(): UnresolvedMosaicBuilder {
        return this.hashLockTransactionBody.mosaic;
    }

    /**
     * Gets number of blocks for which a lock should be valid.
     *
     * @return Number of blocks for which a lock should be valid.
     */
    public get duration(): BlockDurationDto {
        return this.hashLockTransactionBody.duration;
    }

    /**
     * Gets lock hash.
     *
     * @return Lock hash.
     */
    public get hash(): Hash256Dto {
        return this.hashLockTransactionBody.hash;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.hashLockTransactionBody.size; // hashLockTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): HashLockTransactionBodyBuilder {
        return this.hashLockTransactionBody;
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
        const hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    }
}

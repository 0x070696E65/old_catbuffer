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

import { AliasActionDto } from './AliasActionDto';
import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { MosaicAliasTransactionBodyBuilder } from './MosaicAliasTransactionBodyBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';

/**
 *  Interface to create instances of MosaicAliasTransactionBuilder.
 */
export interface MosaicAliasTransactionBuilderParams extends TransactionBuilderParams {
    /** Identifier of the namespace that will become an alias. **/
    namespaceId: NamespaceIdDto;
    /** Aliased mosaic identifier. **/
    mosaicId: MosaicIdDto;
    /** Alias action. **/
    aliasAction: AliasActionDto;
}

/**
 * Binary layout for a non-embedded mosaic alias transaction
 **/
export class MosaicAliasTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.MOSAIC_ALIAS_TRANSACTION;

    /** Mosaic alias transaction body. **/
    public readonly mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder;

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
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param mosaicId Aliased mosaic identifier.
     * @param aliasAction Alias action.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        namespaceId,
        mosaicId,
        aliasAction,
    }: MosaicAliasTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder({ namespaceId, mosaicId, aliasAction });
        if (version !== MosaicAliasTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' + version + ' is invalid. Expected value is ' + MosaicAliasTransactionBuilder.VERSION,
            );
        if (type !== MosaicAliasTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + MosaicAliasTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicAliasTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder = MosaicAliasTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, mosaicAliasTransactionBody.size);
        return new MosaicAliasTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            namespaceId: mosaicAliasTransactionBody.namespaceId,
            mosaicId: mosaicAliasTransactionBody.mosaicId,
            aliasAction: mosaicAliasTransactionBody.aliasAction,
        });
    }

    /**
     * Creates an instance of MosaicAliasTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param mosaicId Aliased mosaic identifier.
     * @param aliasAction Alias action.
     * @return Instance of MosaicAliasTransactionBuilder.
     */
    public static createMosaicAliasTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        namespaceId: NamespaceIdDto,
        mosaicId: MosaicIdDto,
        aliasAction: AliasActionDto,
    ): MosaicAliasTransactionBuilder {
        const version = MosaicAliasTransactionBuilder.VERSION;
        const type = MosaicAliasTransactionBuilder.ENTITY_TYPE;
        return new MosaicAliasTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            namespaceId: namespaceId,
            mosaicId: mosaicId,
            aliasAction: aliasAction,
        });
    }

    /**
     * Gets identifier of the namespace that will become an alias.
     *
     * @return Identifier of the namespace that will become an alias.
     */
    public get namespaceId(): NamespaceIdDto {
        return this.mosaicAliasTransactionBody.namespaceId;
    }

    /**
     * Gets aliased mosaic identifier.
     *
     * @return Aliased mosaic identifier.
     */
    public get mosaicId(): MosaicIdDto {
        return this.mosaicAliasTransactionBody.mosaicId;
    }

    /**
     * Gets alias action.
     *
     * @return Alias action.
     */
    public get aliasAction(): AliasActionDto {
        return this.mosaicAliasTransactionBody.aliasAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.mosaicAliasTransactionBody.size; // mosaicAliasTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MosaicAliasTransactionBodyBuilder {
        return this.mosaicAliasTransactionBody;
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
        const mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    }
}

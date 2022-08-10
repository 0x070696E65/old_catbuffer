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

import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of EmbeddedAccountOperationRestrictionTransactionBuilder.
 */
export interface EmbeddedAccountOperationRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Account restriction flags. **/
    restrictionFlags: AccountRestrictionFlagsDto[];
    /** Account restriction additions. **/
    restrictionAdditions: EntityTypeDto[];
    /** Account restriction deletions. **/
    restrictionDeletions: EntityTypeDto[];
}

/**
 * Binary layout for an embedded account operation restriction transaction
 **/
export class EmbeddedAccountOperationRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_ACCOUNT_OPERATION_RESTRICTION_TRANSACTION;

    /** Account operation restriction transaction body. **/
    public readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        restrictionFlags,
        restrictionAdditions,
        restrictionDeletions,
    }: EmbeddedAccountOperationRestrictionTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountOperationRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder =
            AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.size);
        return new EmbeddedAccountOperationRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            restrictionFlags: accountOperationRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountOperationRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountOperationRestrictionTransactionBody.restrictionDeletions,
        });
    }

    /**
     * Creates an instance of EmbeddedAccountOperationRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of EmbeddedAccountOperationRestrictionTransactionBuilder.
     */
    public static createEmbeddedAccountOperationRestrictionTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: EntityTypeDto[],
        restrictionDeletions: EntityTypeDto[],
    ): EmbeddedAccountOperationRestrictionTransactionBuilder {
        const version = EmbeddedAccountOperationRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedAccountOperationRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountOperationRestrictionTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }

    /**
     * Gets account restriction flags.
     *
     * @return Account restriction flags.
     */
    public get restrictionFlags(): AccountRestrictionFlagsDto[] {
        return this.accountOperationRestrictionTransactionBody.restrictionFlags;
    }

    /**
     * Gets account restriction additions.
     *
     * @return Account restriction additions.
     */
    public get restrictionAdditions(): EntityTypeDto[] {
        return this.accountOperationRestrictionTransactionBody.restrictionAdditions;
    }

    /**
     * Gets account restriction deletions.
     *
     * @return Account restriction deletions.
     */
    public get restrictionDeletions(): EntityTypeDto[] {
        return this.accountOperationRestrictionTransactionBody.restrictionDeletions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.accountOperationRestrictionTransactionBody.size; // accountOperationRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AccountOperationRestrictionTransactionBodyBuilder {
        return this.accountOperationRestrictionTransactionBody;
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
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}

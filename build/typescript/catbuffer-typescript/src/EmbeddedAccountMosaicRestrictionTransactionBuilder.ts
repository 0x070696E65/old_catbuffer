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

import { AccountMosaicRestrictionTransactionBodyBuilder } from './AccountMosaicRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 *  Interface to create instances of EmbeddedAccountMosaicRestrictionTransactionBuilder.
 */
export interface EmbeddedAccountMosaicRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Account restriction flags. **/
    restrictionFlags: AccountRestrictionFlagsDto[];
    /** Account restriction additions. **/
    restrictionAdditions: UnresolvedMosaicIdDto[];
    /** Account restriction deletions. **/
    restrictionDeletions: UnresolvedMosaicIdDto[];
}

/**
 * Binary layout for an embedded account mosaic restriction transaction
 **/
export class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION;

    /** Account mosaic restriction transaction body. **/
    public readonly accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder;

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
    }: EmbeddedAccountMosaicRestrictionTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountMosaicRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountMosaicRestrictionTransactionBody: AccountMosaicRestrictionTransactionBodyBuilder =
            AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.size);
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            restrictionFlags: accountMosaicRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountMosaicRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountMosaicRestrictionTransactionBody.restrictionDeletions,
        });
    }

    /**
     * Creates an instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     */
    public static createEmbeddedAccountMosaicRestrictionTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedMosaicIdDto[],
        restrictionDeletions: UnresolvedMosaicIdDto[],
    ): EmbeddedAccountMosaicRestrictionTransactionBuilder {
        const version = EmbeddedAccountMosaicRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedAccountMosaicRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder({
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
        return this.accountMosaicRestrictionTransactionBody.restrictionFlags;
    }

    /**
     * Gets account restriction additions.
     *
     * @return Account restriction additions.
     */
    public get restrictionAdditions(): UnresolvedMosaicIdDto[] {
        return this.accountMosaicRestrictionTransactionBody.restrictionAdditions;
    }

    /**
     * Gets account restriction deletions.
     *
     * @return Account restriction deletions.
     */
    public get restrictionDeletions(): UnresolvedMosaicIdDto[] {
        return this.accountMosaicRestrictionTransactionBody.restrictionDeletions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.accountMosaicRestrictionTransactionBody.size; // accountMosaicRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AccountMosaicRestrictionTransactionBodyBuilder {
        return this.accountMosaicRestrictionTransactionBody;
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
        const accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    }
}

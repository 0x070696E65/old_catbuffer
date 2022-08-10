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

import { AccountAddressRestrictionTransactionBodyBuilder } from './AccountAddressRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of EmbeddedAccountAddressRestrictionTransactionBuilder.
 */
export interface EmbeddedAccountAddressRestrictionTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Account restriction flags. **/
    restrictionFlags: AccountRestrictionFlagsDto[];
    /** Account restriction additions. **/
    restrictionAdditions: UnresolvedAddressDto[];
    /** Account restriction deletions. **/
    restrictionDeletions: UnresolvedAddressDto[];
}

/**
 * Binary layout for an embedded account address restriction transaction
 **/
export class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION;

    /** Account address restriction transaction body. **/
    public readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;

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
    }: EmbeddedAccountAddressRestrictionTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountAddressRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder =
            AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.size);
        return new EmbeddedAccountAddressRestrictionTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            restrictionFlags: accountAddressRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountAddressRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountAddressRestrictionTransactionBody.restrictionDeletions,
        });
    }

    /**
     * Creates an instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of EmbeddedAccountAddressRestrictionTransactionBuilder.
     */
    public static createEmbeddedAccountAddressRestrictionTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedAddressDto[],
        restrictionDeletions: UnresolvedAddressDto[],
    ): EmbeddedAccountAddressRestrictionTransactionBuilder {
        const version = EmbeddedAccountAddressRestrictionTransactionBuilder.VERSION;
        const type = EmbeddedAccountAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAccountAddressRestrictionTransactionBuilder({
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
        return this.accountAddressRestrictionTransactionBody.restrictionFlags;
    }

    /**
     * Gets account restriction additions.
     *
     * @return Account restriction additions.
     */
    public get restrictionAdditions(): UnresolvedAddressDto[] {
        return this.accountAddressRestrictionTransactionBody.restrictionAdditions;
    }

    /**
     * Gets account restriction deletions.
     *
     * @return Account restriction deletions.
     */
    public get restrictionDeletions(): UnresolvedAddressDto[] {
        return this.accountAddressRestrictionTransactionBody.restrictionDeletions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.accountAddressRestrictionTransactionBody.size; // accountAddressRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AccountAddressRestrictionTransactionBodyBuilder {
        return this.accountAddressRestrictionTransactionBody;
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
        const accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}

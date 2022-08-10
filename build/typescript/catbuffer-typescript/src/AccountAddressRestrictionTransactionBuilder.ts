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
 *  Interface to create instances of AccountAddressRestrictionTransactionBuilder.
 */
export interface AccountAddressRestrictionTransactionBuilderParams extends TransactionBuilderParams {
    /** Account restriction flags. **/
    restrictionFlags: AccountRestrictionFlagsDto[];
    /** Account restriction additions. **/
    restrictionAdditions: UnresolvedAddressDto[];
    /** Account restriction deletions. **/
    restrictionDeletions: UnresolvedAddressDto[];
}

/**
 * Binary layout for a non-embedded account address restriction transaction
 **/
export class AccountAddressRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION;

    /** Account address restriction transaction body. **/
    public readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;

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
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     */
    public constructor({
        signature,
        signerPublicKey,
        version,
        network,
        type,
        fee,
        deadline,
        restrictionFlags,
        restrictionAdditions,
        restrictionDeletions,
    }: AccountAddressRestrictionTransactionBuilderParams) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder({
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        });
        if (version !== AccountAddressRestrictionTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    AccountAddressRestrictionTransactionBuilder.VERSION,
            );
        if (type !== AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountAddressRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder =
            AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.size);
        return new AccountAddressRestrictionTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            restrictionFlags: accountAddressRestrictionTransactionBody.restrictionFlags,
            restrictionAdditions: accountAddressRestrictionTransactionBody.restrictionAdditions,
            restrictionDeletions: accountAddressRestrictionTransactionBody.restrictionDeletions,
        });
    }

    /**
     * Creates an instance of AccountAddressRestrictionTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of AccountAddressRestrictionTransactionBuilder.
     */
    public static createAccountAddressRestrictionTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: UnresolvedAddressDto[],
        restrictionDeletions: UnresolvedAddressDto[],
    ): AccountAddressRestrictionTransactionBuilder {
        const version = AccountAddressRestrictionTransactionBuilder.VERSION;
        const type = AccountAddressRestrictionTransactionBuilder.ENTITY_TYPE;
        return new AccountAddressRestrictionTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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

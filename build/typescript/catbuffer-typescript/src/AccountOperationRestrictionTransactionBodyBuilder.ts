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

import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of AccountOperationRestrictionTransactionBodyBuilder.
 */
export interface AccountOperationRestrictionTransactionBodyBuilderParams {
    /** Account restriction flags. **/
    restrictionFlags: AccountRestrictionFlagsDto[];
    /** Account restriction additions. **/
    restrictionAdditions: EntityTypeDto[];
    /** Account restriction deletions. **/
    restrictionDeletions: EntityTypeDto[];
}

/**
 * Binary layout for an account operation restriction transaction
 **/
export class AccountOperationRestrictionTransactionBodyBuilder implements Serializer {
    /** Account restriction flags. **/
    public readonly restrictionFlags: AccountRestrictionFlagsDto[];

    /** Account restriction additions. **/
    public readonly restrictionAdditions: EntityTypeDto[];

    /** Account restriction deletions. **/
    public readonly restrictionDeletions: EntityTypeDto[];

    /**
     * Constructor.
     *
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     */
    public constructor({
        restrictionFlags,
        restrictionAdditions,
        restrictionDeletions,
    }: AccountOperationRestrictionTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(restrictionFlags, 'restrictionFlags is null or undefined');
        GeneratorUtils.notNull(restrictionAdditions, 'restrictionAdditions is null or undefined');
        GeneratorUtils.notNull(restrictionDeletions, 'restrictionDeletions is null or undefined');
        this.restrictionFlags = restrictionFlags;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountOperationRestrictionTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const restrictionFlags: AccountRestrictionFlagsDto[] = GeneratorUtils.toFlags(
            AccountRestrictionFlagsDto,
            GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray)),
        );
        byteArray.splice(0, 2);
        const restrictionAdditionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const restrictionAdditions: EntityTypeDto[] = GeneratorUtils.loadFromBinaryEnums(
            Uint8Array.from(byteArray),
            restrictionAdditionsCount,
            2,
        );
        byteArray.splice(
            0,
            restrictionAdditions.reduce((sum) => sum + 2, 0),
        );
        const restrictionDeletions: EntityTypeDto[] = GeneratorUtils.loadFromBinaryEnums(
            Uint8Array.from(byteArray),
            restrictionDeletionsCount,
            2,
        );
        byteArray.splice(
            0,
            restrictionDeletions.reduce((sum) => sum + 2, 0),
        );
        return new AccountOperationRestrictionTransactionBodyBuilder({
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }

    /**
     * Creates an instance of AccountOperationRestrictionTransactionBodyBuilder.
     *
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of AccountOperationRestrictionTransactionBodyBuilder.
     */
    public static createAccountOperationRestrictionTransactionBodyBuilder(
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: EntityTypeDto[],
        restrictionDeletions: EntityTypeDto[],
    ): AccountOperationRestrictionTransactionBodyBuilder {
        return new AccountOperationRestrictionTransactionBodyBuilder({
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 2; // restrictionFlags
        size += 1; // restrictionAdditionsCount
        size += 1; // restrictionDeletionsCount
        size += 4; // accountRestrictionTransactionBody_Reserved1
        size += this.restrictionAdditions.reduce((sum) => sum + 2, 0);
        size += this.restrictionDeletions.reduce((sum) => sum + 2, 0);
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils.uint16ToBuffer(
            GeneratorUtils.fromFlags(AccountRestrictionFlagsDto, this.restrictionFlags),
        );
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = GeneratorUtils.uint8ToBuffer(this.restrictionAdditions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = GeneratorUtils.uint8ToBuffer(this.restrictionDeletions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        const restrictionAdditionsBytes = GeneratorUtils.writeListEnum(this.restrictionAdditions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        const restrictionDeletionsBytes = GeneratorUtils.writeListEnum(this.restrictionDeletions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        return newArray;
    }
}

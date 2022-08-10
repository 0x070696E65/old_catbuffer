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

import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of MultisigAccountModificationTransactionBodyBuilder.
 */
export interface MultisigAccountModificationTransactionBodyBuilderParams {
    /** Relative change of the minimal number of cosignatories required when removing an account. **/
    minRemovalDelta: number;
    /** Relative change of the minimal number of cosignatories required when approving a transaction. **/
    minApprovalDelta: number;
    /** Cosignatory address additions. **/
    addressAdditions: UnresolvedAddressDto[];
    /** Cosignatory address deletions. **/
    addressDeletions: UnresolvedAddressDto[];
}

/**
 * Binary layout for a multisig account modification transaction
 **/
export class MultisigAccountModificationTransactionBodyBuilder implements Serializer {
    /** Relative change of the minimal number of cosignatories required when removing an account. **/
    public readonly minRemovalDelta: number;

    /** Relative change of the minimal number of cosignatories required when approving a transaction. **/
    public readonly minApprovalDelta: number;

    /** Cosignatory address additions. **/
    public readonly addressAdditions: UnresolvedAddressDto[];

    /** Cosignatory address deletions. **/
    public readonly addressDeletions: UnresolvedAddressDto[];

    /**
     * Constructor.
     *
     * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
     * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
     * @param addressAdditions Cosignatory address additions.
     * @param addressDeletions Cosignatory address deletions.
     */
    public constructor({
        minRemovalDelta,
        minApprovalDelta,
        addressAdditions,
        addressDeletions,
    }: MultisigAccountModificationTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(minRemovalDelta, 'minRemovalDelta is null or undefined');
        GeneratorUtils.notNull(minApprovalDelta, 'minApprovalDelta is null or undefined');
        GeneratorUtils.notNull(addressAdditions, 'addressAdditions is null or undefined');
        GeneratorUtils.notNull(addressDeletions, 'addressDeletions is null or undefined');
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MultisigAccountModificationTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const minRemovalDelta: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const minApprovalDelta: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressAdditionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressDeletionsCount: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressAdditions: UnresolvedAddressDto[] = GeneratorUtils.loadFromBinary(
            UnresolvedAddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            addressAdditionsCount,
        );
        byteArray.splice(
            0,
            addressAdditions.reduce((sum, c) => sum + c.size, 0),
        );
        const addressDeletions: UnresolvedAddressDto[] = GeneratorUtils.loadFromBinary(
            UnresolvedAddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            addressDeletionsCount,
        );
        byteArray.splice(
            0,
            addressDeletions.reduce((sum, c) => sum + c.size, 0),
        );
        return new MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
        });
    }

    /**
     * Creates an instance of MultisigAccountModificationTransactionBodyBuilder.
     *
     * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
     * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
     * @param addressAdditions Cosignatory address additions.
     * @param addressDeletions Cosignatory address deletions.
     * @return Instance of MultisigAccountModificationTransactionBodyBuilder.
     */
    public static createMultisigAccountModificationTransactionBodyBuilder(
        minRemovalDelta: number,
        minApprovalDelta: number,
        addressAdditions: UnresolvedAddressDto[],
        addressDeletions: UnresolvedAddressDto[],
    ): MultisigAccountModificationTransactionBodyBuilder {
        return new MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 1; // minRemovalDelta
        size += 1; // minApprovalDelta
        size += 1; // addressAdditionsCount
        size += 1; // addressDeletionsCount
        size += 4; // multisigAccountModificationTransactionBody_Reserved1
        size += this.addressAdditions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // addressAdditions
        size += this.addressDeletions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // addressDeletions
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const minRemovalDeltaBytes = GeneratorUtils.uint8ToBuffer(this.minRemovalDelta);
        newArray = GeneratorUtils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        const minApprovalDeltaBytes = GeneratorUtils.uint8ToBuffer(this.minApprovalDelta);
        newArray = GeneratorUtils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        const addressAdditionsCountBytes = GeneratorUtils.uint8ToBuffer(this.addressAdditions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressAdditionsCountBytes);
        const addressDeletionsCountBytes = GeneratorUtils.uint8ToBuffer(this.addressDeletions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressDeletionsCountBytes);
        const multisigAccountModificationTransactionBody_Reserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBody_Reserved1Bytes);
        const addressAdditionsBytes = GeneratorUtils.writeList(this.addressAdditions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressAdditionsBytes);
        const addressDeletionsBytes = GeneratorUtils.writeList(this.addressDeletions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressDeletionsBytes);
        return newArray;
    }
}

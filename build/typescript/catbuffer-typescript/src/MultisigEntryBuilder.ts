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

import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';

/**
 *  Interface to create instances of MultisigEntryBuilder.
 */
export interface MultisigEntryBuilderParams extends StateHeaderBuilderParams {
    /** Minimum approval for modifications. **/
    minApproval: number;
    /** Minimum approval for removal. **/
    minRemoval: number;
    /** Account address. **/
    accountAddress: AddressDto;
    /** Cosignatories for account. **/
    cosignatoryAddresses: AddressDto[];
    /** Accounts for which the entry is cosignatory. **/
    multisigAddresses: AddressDto[];
}

/**
 * Binary layout for a multisig entry
 **/
export class MultisigEntryBuilder extends StateHeaderBuilder implements Serializer {
    /** Minimum approval for modifications. **/
    public readonly minApproval: number;

    /** Minimum approval for removal. **/
    public readonly minRemoval: number;

    /** Account address. **/
    public readonly accountAddress: AddressDto;

    /** Cosignatories for account. **/
    public readonly cosignatoryAddresses: AddressDto[];

    /** Accounts for which the entry is cosignatory. **/
    public readonly multisigAddresses: AddressDto[];

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param minApproval Minimum approval for modifications.
     * @param minRemoval Minimum approval for removal.
     * @param accountAddress Account address.
     * @param cosignatoryAddresses Cosignatories for account.
     * @param multisigAddresses Accounts for which the entry is cosignatory.
     */
    public constructor({
        version,
        minApproval,
        minRemoval,
        accountAddress,
        cosignatoryAddresses,
        multisigAddresses,
    }: MultisigEntryBuilderParams) {
        super({ version });
        GeneratorUtils.notNull(minApproval, 'minApproval is null or undefined');
        GeneratorUtils.notNull(minRemoval, 'minRemoval is null or undefined');
        GeneratorUtils.notNull(accountAddress, 'accountAddress is null or undefined');
        GeneratorUtils.notNull(cosignatoryAddresses, 'cosignatoryAddresses is null or undefined');
        GeneratorUtils.notNull(multisigAddresses, 'multisigAddresses is null or undefined');
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountAddress = accountAddress;
        this.cosignatoryAddresses = cosignatoryAddresses;
        this.multisigAddresses = multisigAddresses;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MultisigEntryBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const minApproval: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const minRemoval: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const accountAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddress.size);
        const cosignatoryAddressesCount: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const cosignatoryAddresses: AddressDto[] = GeneratorUtils.loadFromBinary(
            AddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            cosignatoryAddressesCount,
        );
        byteArray.splice(
            0,
            cosignatoryAddresses.reduce((sum, c) => sum + c.size, 0),
        );
        const multisigAddressesCount: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const multisigAddresses: AddressDto[] = GeneratorUtils.loadFromBinary(
            AddressDto.loadFromBinary,
            Uint8Array.from(byteArray),
            multisigAddressesCount,
        );
        byteArray.splice(
            0,
            multisigAddresses.reduce((sum, c) => sum + c.size, 0),
        );
        return new MultisigEntryBuilder({
            version: superObject.version,
            minApproval: minApproval,
            minRemoval: minRemoval,
            accountAddress: accountAddress,
            cosignatoryAddresses: cosignatoryAddresses,
            multisigAddresses: multisigAddresses,
        });
    }

    /**
     * Creates an instance of MultisigEntryBuilder.
     *
     * @param version Serialization version.
     * @param minApproval Minimum approval for modifications.
     * @param minRemoval Minimum approval for removal.
     * @param accountAddress Account address.
     * @param cosignatoryAddresses Cosignatories for account.
     * @param multisigAddresses Accounts for which the entry is cosignatory.
     * @return Instance of MultisigEntryBuilder.
     */
    public static createMultisigEntryBuilder(
        version: number,
        minApproval: number,
        minRemoval: number,
        accountAddress: AddressDto,
        cosignatoryAddresses: AddressDto[],
        multisigAddresses: AddressDto[],
    ): MultisigEntryBuilder {
        return new MultisigEntryBuilder({
            version: version,
            minApproval: minApproval,
            minRemoval: minRemoval,
            accountAddress: accountAddress,
            cosignatoryAddresses: cosignatoryAddresses,
            multisigAddresses: multisigAddresses,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += 4; // minApproval
        size += 4; // minRemoval
        size += this.accountAddress.size; // accountAddress
        size += 8; // cosignatoryAddressesCount
        size += this.cosignatoryAddresses.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // cosignatoryAddresses
        size += 8; // multisigAddressesCount
        size += this.multisigAddresses.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // multisigAddresses
        return size;
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
        const minApprovalBytes = GeneratorUtils.uint32ToBuffer(this.minApproval);
        newArray = GeneratorUtils.concatTypedArrays(newArray, minApprovalBytes);
        const minRemovalBytes = GeneratorUtils.uint32ToBuffer(this.minRemoval);
        newArray = GeneratorUtils.concatTypedArrays(newArray, minRemovalBytes);
        const accountAddressBytes = this.accountAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountAddressBytes);
        const cosignatoryAddressesCountBytes = GeneratorUtils.bigIntToBuffer(this.cosignatoryAddresses.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, cosignatoryAddressesCountBytes);
        const cosignatoryAddressesBytes = GeneratorUtils.writeList(this.cosignatoryAddresses, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, cosignatoryAddressesBytes);
        const multisigAddressesCountBytes = GeneratorUtils.bigIntToBuffer(this.multisigAddresses.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, multisigAddressesCountBytes);
        const multisigAddressesBytes = GeneratorUtils.writeList(this.multisigAddresses, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, multisigAddressesBytes);
        return newArray;
    }
}

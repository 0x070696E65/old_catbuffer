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
import { AliasActionDto } from './AliasActionDto';
import { GeneratorUtils } from './GeneratorUtils';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of AddressAliasTransactionBodyBuilder.
 */
export interface AddressAliasTransactionBodyBuilderParams {
    /** Identifier of the namespace that will become an alias. **/
    namespaceId: NamespaceIdDto;
    /** Aliased address. **/
    address: AddressDto;
    /** Alias action. **/
    aliasAction: AliasActionDto;
}

/**
 * Binary layout for an address alias transaction
 **/
export class AddressAliasTransactionBodyBuilder implements Serializer {
    /** Identifier of the namespace that will become an alias. **/
    public readonly namespaceId: NamespaceIdDto;

    /** Aliased address. **/
    public readonly address: AddressDto;

    /** Alias action. **/
    public readonly aliasAction: AliasActionDto;

    /**
     * Constructor.
     *
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param address Aliased address.
     * @param aliasAction Alias action.
     */
    public constructor({ namespaceId, address, aliasAction }: AddressAliasTransactionBodyBuilderParams) {
        GeneratorUtils.notNull(namespaceId, 'namespaceId is null or undefined');
        GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils.notNull(aliasAction, 'aliasAction is null or undefined');
        this.namespaceId = namespaceId;
        this.address = address;
        this.aliasAction = aliasAction;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AddressAliasTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const namespaceId: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.size);
        const address: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const aliasAction: AliasActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new AddressAliasTransactionBodyBuilder({ namespaceId: namespaceId, address: address, aliasAction: aliasAction });
    }

    /**
     * Creates an instance of AddressAliasTransactionBodyBuilder.
     *
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param address Aliased address.
     * @param aliasAction Alias action.
     * @return Instance of AddressAliasTransactionBodyBuilder.
     */
    public static createAddressAliasTransactionBodyBuilder(
        namespaceId: NamespaceIdDto,
        address: AddressDto,
        aliasAction: AliasActionDto,
    ): AddressAliasTransactionBodyBuilder {
        return new AddressAliasTransactionBodyBuilder({ namespaceId: namespaceId, address: address, aliasAction: aliasAction });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.namespaceId.size; // namespaceId
        size += this.address.size; // address
        size += 1; // aliasAction
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const aliasActionBytes = GeneratorUtils.uint8ToBuffer(this.aliasAction);
        newArray = GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}

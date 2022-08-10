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

import { AccountRestrictionsInfoBuilder } from './AccountRestrictionsInfoBuilder';
import { AddressDto } from './AddressDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';

/**
 *  Interface to create instances of AccountRestrictionsBuilder.
 */
export interface AccountRestrictionsBuilderParams extends StateHeaderBuilderParams {
    /** Address on which restrictions are placed. **/
    address: AddressDto;
    /** Account restrictions. **/
    restrictions: AccountRestrictionsInfoBuilder[];
}

/**
 * Binary layout for account restrictions
 **/
export class AccountRestrictionsBuilder extends StateHeaderBuilder implements Serializer {
    /** Address on which restrictions are placed. **/
    public readonly address: AddressDto;

    /** Account restrictions. **/
    public readonly restrictions: AccountRestrictionsInfoBuilder[];

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param address Address on which restrictions are placed.
     * @param restrictions Account restrictions.
     */
    public constructor({ version, address, restrictions }: AccountRestrictionsBuilderParams) {
        super({ version });
        GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils.notNull(restrictions, 'restrictions is null or undefined');
        this.address = address;
        this.restrictions = restrictions;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountRestrictionsBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const address: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const restrictionsCount: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictions: AccountRestrictionsInfoBuilder[] = GeneratorUtils.loadFromBinary(
            AccountRestrictionsInfoBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            restrictionsCount,
        );
        byteArray.splice(
            0,
            restrictions.reduce((sum, c) => sum + c.size, 0),
        );
        return new AccountRestrictionsBuilder({ version: superObject.version, address: address, restrictions: restrictions });
    }

    /**
     * Creates an instance of AccountRestrictionsBuilder.
     *
     * @param version Serialization version.
     * @param address Address on which restrictions are placed.
     * @param restrictions Account restrictions.
     * @return Instance of AccountRestrictionsBuilder.
     */
    public static createAccountRestrictionsBuilder(
        version: number,
        address: AddressDto,
        restrictions: AccountRestrictionsInfoBuilder[],
    ): AccountRestrictionsBuilder {
        return new AccountRestrictionsBuilder({ version: version, address: address, restrictions: restrictions });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.address.size; // address
        size += 8; // restrictionsCount
        size += this.restrictions.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // restrictions
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
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const restrictionsCountBytes = GeneratorUtils.bigIntToBuffer(this.restrictions.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionsCountBytes);
        const restrictionsBytes = GeneratorUtils.writeList(this.restrictions, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionsBytes);
        return newArray;
    }
}

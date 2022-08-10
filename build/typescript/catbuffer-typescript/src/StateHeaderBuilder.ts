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

/**
 *  Interface to create instances of StateHeaderBuilder.
 */
export interface StateHeaderBuilderParams {
    /** Serialization version. **/
    version: number;
}

/**
 * Header common to all serialized states
 **/
export class StateHeaderBuilder implements Serializer {
    /** Serialization version. **/
    public readonly version: number;

    /**
     * Constructor.
     *
     * @param version Serialization version.
     */
    public constructor({ version }: StateHeaderBuilderParams) {
        GeneratorUtils.notNull(version, 'version is null or undefined');
        this.version = version;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): StateHeaderBuilder {
        const byteArray = Array.from(payload);
        const version: number = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        return new StateHeaderBuilder({ version: version });
    }

    /**
     * Creates an instance of StateHeaderBuilder.
     *
     * @param version Serialization version.
     * @return Instance of StateHeaderBuilder.
     */
    public static createStateHeaderBuilder(version: number): StateHeaderBuilder {
        return new StateHeaderBuilder({ version: version });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 2; // version
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const versionBytes = GeneratorUtils.uint16ToBuffer(this.version);
        newArray = GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        return newArray;
    }
}

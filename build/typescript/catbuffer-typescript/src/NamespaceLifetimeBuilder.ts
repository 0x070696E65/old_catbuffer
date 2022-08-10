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
import { HeightDto } from './HeightDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of NamespaceLifetimeBuilder.
 */
export interface NamespaceLifetimeBuilderParams {
    /** Start height. **/
    lifetimeStart: HeightDto;
    /** End height. **/
    lifetimeEnd: HeightDto;
}

/**
 * Binary layout for namespace lifetime
 **/
export class NamespaceLifetimeBuilder implements Serializer {
    /** Start height. **/
    public readonly lifetimeStart: HeightDto;

    /** End height. **/
    public readonly lifetimeEnd: HeightDto;

    /**
     * Constructor.
     *
     * @param lifetimeStart Start height.
     * @param lifetimeEnd End height.
     */
    public constructor({ lifetimeStart, lifetimeEnd }: NamespaceLifetimeBuilderParams) {
        GeneratorUtils.notNull(lifetimeStart, 'lifetimeStart is null or undefined');
        GeneratorUtils.notNull(lifetimeEnd, 'lifetimeEnd is null or undefined');
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespaceLifetimeBuilder {
        const byteArray = Array.from(payload);
        const lifetimeStart: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.size);
        const lifetimeEnd: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.size);
        return new NamespaceLifetimeBuilder({ lifetimeStart: lifetimeStart, lifetimeEnd: lifetimeEnd });
    }

    /**
     * Creates an instance of NamespaceLifetimeBuilder.
     *
     * @param lifetimeStart Start height.
     * @param lifetimeEnd End height.
     * @return Instance of NamespaceLifetimeBuilder.
     */
    public static createNamespaceLifetimeBuilder(lifetimeStart: HeightDto, lifetimeEnd: HeightDto): NamespaceLifetimeBuilder {
        return new NamespaceLifetimeBuilder({ lifetimeStart: lifetimeStart, lifetimeEnd: lifetimeEnd });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.lifetimeStart.size; // lifetimeStart
        size += this.lifetimeEnd.size; // lifetimeEnd
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, lifetimeStartBytes);
        const lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    }
}

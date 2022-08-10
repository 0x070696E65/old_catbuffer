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
import { HeightDto } from './HeightDto';
import { MosaicPropertiesBuilder } from './MosaicPropertiesBuilder';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of MosaicDefinitionBuilder.
 */
export interface MosaicDefinitionBuilderParams {
    /** Block height. **/
    startHeight: HeightDto;
    /** Mosaic owner. **/
    ownerAddress: AddressDto;
    /** Revision. **/
    revision: number;
    /** Properties. **/
    properties: MosaicPropertiesBuilder;
}

/**
 * Binary layout for mosaic definition
 **/
export class MosaicDefinitionBuilder implements Serializer {
    /** Block height. **/
    public readonly startHeight: HeightDto;

    /** Mosaic owner. **/
    public readonly ownerAddress: AddressDto;

    /** Revision. **/
    public readonly revision: number;

    /** Properties. **/
    public readonly properties: MosaicPropertiesBuilder;

    /**
     * Constructor.
     *
     * @param startHeight Block height.
     * @param ownerAddress Mosaic owner.
     * @param revision Revision.
     * @param properties Properties.
     */
    public constructor({ startHeight, ownerAddress, revision, properties }: MosaicDefinitionBuilderParams) {
        GeneratorUtils.notNull(startHeight, 'startHeight is null or undefined');
        GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils.notNull(revision, 'revision is null or undefined');
        GeneratorUtils.notNull(properties, 'properties is null or undefined');
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.properties = properties;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicDefinitionBuilder {
        const byteArray = Array.from(payload);
        const startHeight: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const ownerAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const revision: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const properties: MosaicPropertiesBuilder = MosaicPropertiesBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.size);
        return new MosaicDefinitionBuilder({
            startHeight: startHeight,
            ownerAddress: ownerAddress,
            revision: revision,
            properties: properties,
        });
    }

    /**
     * Creates an instance of MosaicDefinitionBuilder.
     *
     * @param startHeight Block height.
     * @param ownerAddress Mosaic owner.
     * @param revision Revision.
     * @param properties Properties.
     * @return Instance of MosaicDefinitionBuilder.
     */
    public static createMosaicDefinitionBuilder(
        startHeight: HeightDto,
        ownerAddress: AddressDto,
        revision: number,
        properties: MosaicPropertiesBuilder,
    ): MosaicDefinitionBuilder {
        return new MosaicDefinitionBuilder({
            startHeight: startHeight,
            ownerAddress: ownerAddress,
            revision: revision,
            properties: properties,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.startHeight.size; // startHeight
        size += this.ownerAddress.size; // ownerAddress
        size += 4; // revision
        size += this.properties.size; // properties
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const revisionBytes = GeneratorUtils.uint32ToBuffer(this.revision);
        newArray = GeneratorUtils.concatTypedArrays(newArray, revisionBytes);
        const propertiesBytes = this.properties.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    }
}

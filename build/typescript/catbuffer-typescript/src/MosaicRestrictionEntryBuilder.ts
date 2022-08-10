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
import { MosaicAddressRestrictionEntryBuilder } from './MosaicAddressRestrictionEntryBuilder';
import { MosaicGlobalRestrictionEntryBuilder } from './MosaicGlobalRestrictionEntryBuilder';
import { MosaicRestrictionEntryTypeDto } from './MosaicRestrictionEntryTypeDto';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';

/**
 *  Interface to create instances of MosaicRestrictionEntryBuilder.
 */
export interface MosaicRestrictionEntryBuilderParams extends StateHeaderBuilderParams {
    /** Type of restriction being placed upon the entity. **/
    entryType: MosaicRestrictionEntryTypeDto;
    /** Address restriction rule. **/
    addressEntry?: MosaicAddressRestrictionEntryBuilder;
    /** Global mosaic rule. **/
    globalEntry?: MosaicGlobalRestrictionEntryBuilder;
}

/**
 * Binary layout for a mosaic restriction
 **/
export class MosaicRestrictionEntryBuilder extends StateHeaderBuilder implements Serializer {
    /** Type of restriction being placed upon the entity. **/
    public readonly entryType: MosaicRestrictionEntryTypeDto;

    /** Address restriction rule. **/
    public readonly addressEntry?: MosaicAddressRestrictionEntryBuilder;

    /** Global mosaic rule. **/
    public readonly globalEntry?: MosaicGlobalRestrictionEntryBuilder;

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param entryType Type of restriction being placed upon the entity.
     * @param addressEntry Address restriction rule.
     * @param globalEntry Global mosaic rule.
     */
    public constructor({ version, entryType, addressEntry, globalEntry }: MosaicRestrictionEntryBuilderParams) {
        super({ version });
        GeneratorUtils.notNull(entryType, 'entryType is null or undefined');
        if (entryType === MosaicRestrictionEntryTypeDto.ADDRESS) {
            GeneratorUtils.notNull(addressEntry, 'addressEntry is null or undefined');
        }
        if (entryType === MosaicRestrictionEntryTypeDto.GLOBAL) {
            GeneratorUtils.notNull(globalEntry, 'globalEntry is null or undefined');
        }
        this.entryType = entryType;
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicRestrictionEntryBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const entryType: MosaicRestrictionEntryTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let addressEntry: MosaicAddressRestrictionEntryBuilder | undefined = undefined;
        if (entryType === MosaicRestrictionEntryTypeDto.ADDRESS) {
            addressEntry = MosaicAddressRestrictionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, addressEntry.size);
        }
        let globalEntry: MosaicGlobalRestrictionEntryBuilder | undefined = undefined;
        if (entryType === MosaicRestrictionEntryTypeDto.GLOBAL) {
            globalEntry = MosaicGlobalRestrictionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, globalEntry.size);
        }
        return new MosaicRestrictionEntryBuilder({
            version: superObject.version,
            entryType: entryType,
            addressEntry: addressEntry,
            globalEntry: globalEntry,
        });
    }

    /**
     * Creates an instance of MosaicRestrictionEntryBuilder.
     *
     * @param version Serialization version.
     * @param globalEntry Global mosaic rule.
     * @return Instance of MosaicRestrictionEntryBuilder.
     */
    public static createMosaicRestrictionEntryBuilderGlobal(
        version: number,
        globalEntry: MosaicGlobalRestrictionEntryBuilder,
    ): MosaicRestrictionEntryBuilder {
        const entryType = MosaicRestrictionEntryTypeDto.GLOBAL;
        return new MosaicRestrictionEntryBuilder({ version: version, entryType: entryType, globalEntry: globalEntry });
    }

    /**
     * Creates an instance of MosaicRestrictionEntryBuilder.
     *
     * @param version Serialization version.
     * @param addressEntry Address restriction rule.
     * @return Instance of MosaicRestrictionEntryBuilder.
     */
    public static createMosaicRestrictionEntryBuilderAddress(
        version: number,
        addressEntry: MosaicAddressRestrictionEntryBuilder,
    ): MosaicRestrictionEntryBuilder {
        const entryType = MosaicRestrictionEntryTypeDto.ADDRESS;
        return new MosaicRestrictionEntryBuilder({ version: version, entryType: entryType, addressEntry: addressEntry });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += 1; // entryType
        if (this.entryType === MosaicRestrictionEntryTypeDto.ADDRESS) {
            size += this.addressEntry!.size; // addressEntry
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto.GLOBAL) {
            size += this.globalEntry!.size; // globalEntry
        }
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
        const entryTypeBytes = GeneratorUtils.uint8ToBuffer(this.entryType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, entryTypeBytes);
        if (this.entryType === MosaicRestrictionEntryTypeDto.ADDRESS) {
            const addressEntryBytes = this.addressEntry!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, addressEntryBytes);
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto.GLOBAL) {
            const globalEntryBytes = this.globalEntry!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, globalEntryBytes);
        }
        return newArray;
    }
}

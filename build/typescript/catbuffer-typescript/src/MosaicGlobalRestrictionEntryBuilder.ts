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
import { GlobalKeyValueSetBuilder } from './GlobalKeyValueSetBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of MosaicGlobalRestrictionEntryBuilder.
 */
export interface MosaicGlobalRestrictionEntryBuilderParams {
    /** Identifier of the mosaic to which the restriction applies. **/
    mosaicId: MosaicIdDto;
    /** Global key value restriction set. **/
    keyPairs: GlobalKeyValueSetBuilder;
}

/**
 * Binary layout for a mosaic restriction
 **/
export class MosaicGlobalRestrictionEntryBuilder implements Serializer {
    /** Identifier of the mosaic to which the restriction applies. **/
    public readonly mosaicId: MosaicIdDto;

    /** Global key value restriction set. **/
    public readonly keyPairs: GlobalKeyValueSetBuilder;

    /**
     * Constructor.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param keyPairs Global key value restriction set.
     */
    public constructor({ mosaicId, keyPairs }: MosaicGlobalRestrictionEntryBuilderParams) {
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(keyPairs, 'keyPairs is null or undefined');
        this.mosaicId = mosaicId;
        this.keyPairs = keyPairs;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionEntryBuilder {
        const byteArray = Array.from(payload);
        const mosaicId: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const keyPairs: GlobalKeyValueSetBuilder = GlobalKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.size);
        return new MosaicGlobalRestrictionEntryBuilder({ mosaicId: mosaicId, keyPairs: keyPairs });
    }

    /**
     * Creates an instance of MosaicGlobalRestrictionEntryBuilder.
     *
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param keyPairs Global key value restriction set.
     * @return Instance of MosaicGlobalRestrictionEntryBuilder.
     */
    public static createMosaicGlobalRestrictionEntryBuilder(
        mosaicId: MosaicIdDto,
        keyPairs: GlobalKeyValueSetBuilder,
    ): MosaicGlobalRestrictionEntryBuilder {
        return new MosaicGlobalRestrictionEntryBuilder({ mosaicId: mosaicId, keyPairs: keyPairs });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.mosaicId.size; // mosaicId
        size += this.keyPairs.size; // keyPairs
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}

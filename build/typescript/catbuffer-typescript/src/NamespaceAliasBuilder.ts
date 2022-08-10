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
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceAliasTypeDto } from './NamespaceAliasTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of NamespaceAliasBuilder.
 */
export interface NamespaceAliasBuilderParams {
    /** Namespace alias type. **/
    namespaceAliasType: NamespaceAliasTypeDto;
    /** Mosaic alias. **/
    mosaicAlias?: MosaicIdDto;
    /** Address alias. **/
    addressAlias?: AddressDto;
}

/**
 * Binary layout for alias
 **/
export class NamespaceAliasBuilder implements Serializer {
    /** Namespace alias type. **/
    public readonly namespaceAliasType: NamespaceAliasTypeDto;

    /** Mosaic alias. **/
    public readonly mosaicAlias?: MosaicIdDto;

    /** Address alias. **/
    public readonly addressAlias?: AddressDto;

    /**
     * Constructor.
     *
     * @param namespaceAliasType Namespace alias type.
     * @param mosaicAlias Mosaic alias.
     * @param addressAlias Address alias.
     */
    public constructor({ namespaceAliasType, mosaicAlias, addressAlias }: NamespaceAliasBuilderParams) {
        GeneratorUtils.notNull(namespaceAliasType, 'namespaceAliasType is null or undefined');
        if (namespaceAliasType === NamespaceAliasTypeDto.MOSAIC_ID) {
            GeneratorUtils.notNull(mosaicAlias, 'mosaicAlias is null or undefined');
        }
        if (namespaceAliasType === NamespaceAliasTypeDto.ADDRESS) {
            GeneratorUtils.notNull(addressAlias, 'addressAlias is null or undefined');
        }
        this.namespaceAliasType = namespaceAliasType;
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespaceAliasBuilder {
        const byteArray = Array.from(payload);
        const namespaceAliasType: NamespaceAliasTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let mosaicAlias: MosaicIdDto | undefined = undefined;
        if (namespaceAliasType === NamespaceAliasTypeDto.MOSAIC_ID) {
            mosaicAlias = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicAlias.size);
        }
        let addressAlias: AddressDto | undefined = undefined;
        if (namespaceAliasType === NamespaceAliasTypeDto.ADDRESS) {
            addressAlias = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
            byteArray.splice(0, addressAlias.size);
        }
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType, mosaicAlias: mosaicAlias, addressAlias: addressAlias });
    }

    /**
     * Creates an instance of NamespaceAliasBuilder.
     *
     * @return Instance of NamespaceAliasBuilder.
     */
    public static createNamespaceAliasBuilderNone(): NamespaceAliasBuilder {
        const namespaceAliasType = NamespaceAliasTypeDto.NONE;
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType });
    }

    /**
     * Creates an instance of NamespaceAliasBuilder.
     *
     * @param addressAlias Address alias.
     * @return Instance of NamespaceAliasBuilder.
     */
    public static createNamespaceAliasBuilderAddress(addressAlias: AddressDto): NamespaceAliasBuilder {
        const namespaceAliasType = NamespaceAliasTypeDto.ADDRESS;
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType, addressAlias: addressAlias });
    }

    /**
     * Creates an instance of NamespaceAliasBuilder.
     *
     * @param mosaicAlias Mosaic alias.
     * @return Instance of NamespaceAliasBuilder.
     */
    public static createNamespaceAliasBuilderMosaicId(mosaicAlias: MosaicIdDto): NamespaceAliasBuilder {
        const namespaceAliasType = NamespaceAliasTypeDto.MOSAIC_ID;
        return new NamespaceAliasBuilder({ namespaceAliasType: namespaceAliasType, mosaicAlias: mosaicAlias });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 1; // namespaceAliasType
        if (this.namespaceAliasType === NamespaceAliasTypeDto.MOSAIC_ID) {
            size += this.mosaicAlias!.size; // mosaicAlias
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto.ADDRESS) {
            size += this.addressAlias!.size; // addressAlias
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
        const namespaceAliasTypeBytes = GeneratorUtils.uint8ToBuffer(this.namespaceAliasType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceAliasTypeBytes);
        if (this.namespaceAliasType === NamespaceAliasTypeDto.MOSAIC_ID) {
            const mosaicAliasBytes = this.mosaicAlias!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicAliasBytes);
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto.ADDRESS) {
            const addressAliasBytes = this.addressAlias!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, addressAliasBytes);
        }
        return newArray;
    }
}

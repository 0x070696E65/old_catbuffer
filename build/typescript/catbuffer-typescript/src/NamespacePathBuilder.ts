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
import { NamespaceAliasBuilder } from './NamespaceAliasBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of NamespacePathBuilder.
 */
export interface NamespacePathBuilderParams {
    /** Namespace path (excluding root id). **/
    path: NamespaceIdDto[];
    /** Namespace alias. **/
    alias: NamespaceAliasBuilder;
}

/**
 * Binary layout for a namespace path
 **/
export class NamespacePathBuilder implements Serializer {
    /** Namespace path (excluding root id). **/
    public readonly path: NamespaceIdDto[];

    /** Namespace alias. **/
    public readonly alias: NamespaceAliasBuilder;

    /**
     * Constructor.
     *
     * @param path Namespace path (excluding root id).
     * @param alias Namespace alias.
     */
    public constructor({ path, alias }: NamespacePathBuilderParams) {
        GeneratorUtils.notNull(path, 'path is null or undefined');
        GeneratorUtils.notNull(alias, 'alias is null or undefined');
        this.path = path;
        this.alias = alias;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespacePathBuilder {
        const byteArray = Array.from(payload);
        const pathSize: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const path: NamespaceIdDto[] = GeneratorUtils.loadFromBinary(NamespaceIdDto.loadFromBinary, Uint8Array.from(byteArray), pathSize);
        byteArray.splice(
            0,
            path.reduce((sum, c) => sum + c.size, 0),
        );
        const alias: NamespaceAliasBuilder = NamespaceAliasBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, alias.size);
        return new NamespacePathBuilder({ path: path, alias: alias });
    }

    /**
     * Creates an instance of NamespacePathBuilder.
     *
     * @param path Namespace path (excluding root id).
     * @param alias Namespace alias.
     * @return Instance of NamespacePathBuilder.
     */
    public static createNamespacePathBuilder(path: NamespaceIdDto[], alias: NamespaceAliasBuilder): NamespacePathBuilder {
        return new NamespacePathBuilder({ path: path, alias: alias });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += 1; // pathSize
        size += this.path.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // path
        size += this.alias.size; // alias
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const pathSizeBytes = GeneratorUtils.uint8ToBuffer(this.path.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, pathSizeBytes);
        const pathBytes = GeneratorUtils.writeList(this.path, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, pathBytes);
        const aliasBytes = this.alias.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, aliasBytes);
        return newArray;
    }
}

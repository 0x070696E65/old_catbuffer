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
import { NamespaceAliasBuilder } from './NamespaceAliasBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceLifetimeBuilder } from './NamespaceLifetimeBuilder';
import { NamespacePathBuilder } from './NamespacePathBuilder';
import { Serializer } from './Serializer';
import { StateHeaderBuilder, StateHeaderBuilderParams } from './StateHeaderBuilder';

/**
 *  Interface to create instances of RootNamespaceHistoryBuilder.
 */
export interface RootNamespaceHistoryBuilderParams extends StateHeaderBuilderParams {
    /** Id of the root namespace history. **/
    id: NamespaceIdDto;
    /** Namespace owner address. **/
    ownerAddress: AddressDto;
    /** Lifetime in blocks. **/
    lifetime: NamespaceLifetimeBuilder;
    /** Root namespace alias. **/
    rootAlias: NamespaceAliasBuilder;
    /** Save child sub-namespace paths. **/
    paths: NamespacePathBuilder[];
}

/**
 * Binary layout for non-historical root namespace history
 **/
export class RootNamespaceHistoryBuilder extends StateHeaderBuilder implements Serializer {
    /** Id of the root namespace history. **/
    public readonly id: NamespaceIdDto;

    /** Namespace owner address. **/
    public readonly ownerAddress: AddressDto;

    /** Lifetime in blocks. **/
    public readonly lifetime: NamespaceLifetimeBuilder;

    /** Root namespace alias. **/
    public readonly rootAlias: NamespaceAliasBuilder;

    /** Save child sub-namespace paths. **/
    public readonly paths: NamespacePathBuilder[];

    /**
     * Constructor.
     *
     * @param version Serialization version.
     * @param id Id of the root namespace history.
     * @param ownerAddress Namespace owner address.
     * @param lifetime Lifetime in blocks.
     * @param rootAlias Root namespace alias.
     * @param paths Save child sub-namespace paths.
     */
    public constructor({ version, id, ownerAddress, lifetime, rootAlias, paths }: RootNamespaceHistoryBuilderParams) {
        super({ version });
        GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils.notNull(lifetime, 'lifetime is null or undefined');
        GeneratorUtils.notNull(rootAlias, 'rootAlias is null or undefined');
        GeneratorUtils.notNull(paths, 'paths is null or undefined');
        this.id = id;
        this.ownerAddress = ownerAddress;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): RootNamespaceHistoryBuilder {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const id: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const ownerAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const lifetime: NamespaceLifetimeBuilder = NamespaceLifetimeBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetime.size);
        const rootAlias: NamespaceAliasBuilder = NamespaceAliasBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, rootAlias.size);
        const childrenCount: bigint = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const paths: NamespacePathBuilder[] = GeneratorUtils.loadFromBinary(
            NamespacePathBuilder.loadFromBinary,
            Uint8Array.from(byteArray),
            childrenCount,
        );
        byteArray.splice(
            0,
            paths.reduce((sum, c) => sum + c.size, 0),
        );
        return new RootNamespaceHistoryBuilder({
            version: superObject.version,
            id: id,
            ownerAddress: ownerAddress,
            lifetime: lifetime,
            rootAlias: rootAlias,
            paths: paths,
        });
    }

    /**
     * Creates an instance of RootNamespaceHistoryBuilder.
     *
     * @param version Serialization version.
     * @param id Id of the root namespace history.
     * @param ownerAddress Namespace owner address.
     * @param lifetime Lifetime in blocks.
     * @param rootAlias Root namespace alias.
     * @param paths Save child sub-namespace paths.
     * @return Instance of RootNamespaceHistoryBuilder.
     */
    public static createRootNamespaceHistoryBuilder(
        version: number,
        id: NamespaceIdDto,
        ownerAddress: AddressDto,
        lifetime: NamespaceLifetimeBuilder,
        rootAlias: NamespaceAliasBuilder,
        paths: NamespacePathBuilder[],
    ): RootNamespaceHistoryBuilder {
        return new RootNamespaceHistoryBuilder({
            version: version,
            id: id,
            ownerAddress: ownerAddress,
            lifetime: lifetime,
            rootAlias: rootAlias,
            paths: paths,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.id.size; // id
        size += this.ownerAddress.size; // ownerAddress
        size += this.lifetime.size; // lifetime
        size += this.rootAlias.size; // rootAlias
        size += 8; // childrenCount
        size += this.paths.reduce((sum, c) => sum + GeneratorUtils.getSizeWithPadding(c.size, 0), 0); // paths
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
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const lifetimeBytes = this.lifetime.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, lifetimeBytes);
        const rootAliasBytes = this.rootAlias.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, rootAliasBytes);
        const childrenCountBytes = GeneratorUtils.bigIntToBuffer(this.paths.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, childrenCountBytes);
        const pathsBytes = GeneratorUtils.writeList(this.paths, 0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, pathsBytes);
        return newArray;
    }
}

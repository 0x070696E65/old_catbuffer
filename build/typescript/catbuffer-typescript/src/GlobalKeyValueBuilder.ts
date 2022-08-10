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
import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { RestrictionRuleBuilder } from './RestrictionRuleBuilder';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of GlobalKeyValueBuilder.
 */
export interface GlobalKeyValueBuilderParams {
    /** Key associated with a restriction rule. **/
    key: MosaicRestrictionKeyDto;
    /** Restriction rule (the value) associated with a key. **/
    restrictionRule: RestrictionRuleBuilder;
}

/**
 * Binary layout for a global key-value
 **/
export class GlobalKeyValueBuilder implements Serializer {
    /** Key associated with a restriction rule. **/
    public readonly key: MosaicRestrictionKeyDto;

    /** Restriction rule (the value) associated with a key. **/
    public readonly restrictionRule: RestrictionRuleBuilder;

    /**
     * Constructor.
     *
     * @param key Key associated with a restriction rule.
     * @param restrictionRule Restriction rule (the value) associated with a key.
     */
    public constructor({ key, restrictionRule }: GlobalKeyValueBuilderParams) {
        GeneratorUtils.notNull(key, 'key is null or undefined');
        GeneratorUtils.notNull(restrictionRule, 'restrictionRule is null or undefined');
        this.key = key;
        this.restrictionRule = restrictionRule;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): GlobalKeyValueBuilder {
        const byteArray = Array.from(payload);
        const key: MosaicRestrictionKeyDto = MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const restrictionRule: RestrictionRuleBuilder = RestrictionRuleBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.size);
        return new GlobalKeyValueBuilder({ key: key, restrictionRule: restrictionRule });
    }

    /**
     * Creates an instance of GlobalKeyValueBuilder.
     *
     * @param key Key associated with a restriction rule.
     * @param restrictionRule Restriction rule (the value) associated with a key.
     * @return Instance of GlobalKeyValueBuilder.
     */
    public static createGlobalKeyValueBuilder(
        key: MosaicRestrictionKeyDto,
        restrictionRule: RestrictionRuleBuilder,
    ): GlobalKeyValueBuilder {
        return new GlobalKeyValueBuilder({ key: key, restrictionRule: restrictionRule });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        size += this.key.size; // key
        size += this.restrictionRule.size; // restrictionRule
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    }
}

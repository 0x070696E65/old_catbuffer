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

package io.nem.symbol.catapult.builders;

import java.io.DataInputStream;
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;

/**
* Binary layout for a global key-value
**/
public class GlobalKeyValueBuilder implements Serializer {

    /** Key associated with a restriction rule. **/
    private final MosaicRestrictionKeyDto key;

    /** Restriction rule (the value) associated with a key. **/
    private final RestrictionRuleBuilder restrictionRule;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected GlobalKeyValueBuilder(DataInputStream stream) {
        try {
            this.key = MosaicRestrictionKeyDto.loadFromBinary(stream);
            this.restrictionRule = RestrictionRuleBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of GlobalKeyValueBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of GlobalKeyValueBuilder.
     */
    public static GlobalKeyValueBuilder loadFromBinary(DataInputStream stream) {
        return new GlobalKeyValueBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param key Key associated with a restriction rule.
    * @param restrictionRule Restriction rule (the value) associated with a key.
    */
    protected GlobalKeyValueBuilder(MosaicRestrictionKeyDto key, RestrictionRuleBuilder restrictionRule) {
        GeneratorUtils.notNull(key, "key is null");
        GeneratorUtils.notNull(restrictionRule, "restrictionRule is null");
        this.key = key;
        this.restrictionRule = restrictionRule;
    }
    
    /**
     * Creates an instance of GlobalKeyValueBuilder.
     *
     * @param key Key associated with a restriction rule.
     * @param restrictionRule Restriction rule (the value) associated with a key.
     * @return Instance of GlobalKeyValueBuilder.
     */
    public static GlobalKeyValueBuilder create(MosaicRestrictionKeyDto key, RestrictionRuleBuilder restrictionRule) {
        return new GlobalKeyValueBuilder(key, restrictionRule);
    }

    /**
     * Gets key associated with a restriction rule.
     *
     * @return Key associated with a restriction rule.
     */
    public MosaicRestrictionKeyDto getKey() {
        return this.key;
    }

    /**
     * Gets restriction rule (the value) associated with a key.
     *
     * @return Restriction rule (the value) associated with a key.
     */
    public RestrictionRuleBuilder getRestrictionRule() {
        return this.restrictionRule;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += this.key.getSize();
        size += this.restrictionRule.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            GeneratorUtils.writeEntity(dataOutputStream, this.key);
            GeneratorUtils.writeEntity(dataOutputStream, this.restrictionRule);
        });
    }
}


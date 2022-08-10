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
* Binary layout for an account address restriction transaction
**/
public class AccountAddressRestrictionTransactionBodyBuilder implements Serializer {

    /** Account restriction flags. **/
    private final EnumSet<AccountRestrictionFlagsDto> restrictionFlags;

    /** Reserved padding to align restrictionAdditions on 8-byte boundary. **/
    private final int accountRestrictionTransactionBody_Reserved1;

    /** Account restriction additions. **/
    private final List<UnresolvedAddressDto> restrictionAdditions;

    /** Account restriction deletions. **/
    private final List<UnresolvedAddressDto> restrictionDeletions;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountAddressRestrictionTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.restrictionFlags = GeneratorUtils.toSet(AccountRestrictionFlagsDto.class, Short.reverseBytes(stream.readShort()));
            final byte restrictionAdditionsCount = stream.readByte();
            final byte restrictionDeletionsCount = stream.readByte();
            this.accountRestrictionTransactionBody_Reserved1 = Integer.reverseBytes(stream.readInt());
            this.restrictionAdditions = GeneratorUtils.loadFromBinaryArray(UnresolvedAddressDto::loadFromBinary, stream, restrictionAdditionsCount, 0);
            this.restrictionDeletions = GeneratorUtils.loadFromBinaryArray(UnresolvedAddressDto::loadFromBinary, stream, restrictionDeletionsCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountAddressRestrictionTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountAddressRestrictionTransactionBodyBuilder.
     */
    public static AccountAddressRestrictionTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new AccountAddressRestrictionTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param restrictionFlags Account restriction flags.
    * @param restrictionAdditions Account restriction additions.
    * @param restrictionDeletions Account restriction deletions.
    */
    protected AccountAddressRestrictionTransactionBodyBuilder(EnumSet<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedAddressDto> restrictionAdditions, List<UnresolvedAddressDto> restrictionDeletions) {
        GeneratorUtils.notNull(restrictionFlags, "restrictionFlags is null");
        GeneratorUtils.notNull(restrictionAdditions, "restrictionAdditions is null");
        GeneratorUtils.notNull(restrictionDeletions, "restrictionDeletions is null");
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    
    /**
     * Creates an instance of AccountAddressRestrictionTransactionBodyBuilder.
     *
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of AccountAddressRestrictionTransactionBodyBuilder.
     */
    public static AccountAddressRestrictionTransactionBodyBuilder create(EnumSet<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedAddressDto> restrictionAdditions, List<UnresolvedAddressDto> restrictionDeletions) {
        return new AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }

    /**
     * Gets account restriction flags.
     *
     * @return Account restriction flags.
     */
    public EnumSet<AccountRestrictionFlagsDto> getRestrictionFlags() {
        return this.restrictionFlags;
    }

    /**
     * Gets reserved padding to align restrictionAdditions on 8-byte boundary.
     *
     * @return Reserved padding to align restrictionAdditions on 8-byte boundary.
     */
    private int getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountRestrictionTransactionBody_Reserved1;
    }

    /**
     * Gets account restriction additions.
     *
     * @return Account restriction additions.
     */
    public List<UnresolvedAddressDto> getRestrictionAdditions() {
        return this.restrictionAdditions;
    }

    /**
     * Gets account restriction deletions.
     *
     * @return Account restriction deletions.
     */
    public List<UnresolvedAddressDto> getRestrictionDeletions() {
        return this.restrictionDeletions;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += AccountRestrictionFlagsDto.values()[0].getSize();
        size += 1; // restrictionAdditionsCount
        size += 1; // restrictionDeletionsCount
        size += 4; // accountRestrictionTransactionBody_Reserved1
        size +=  GeneratorUtils.getSumSize(this.restrictionAdditions, 0);
        size +=  GeneratorUtils.getSumSize(this.restrictionDeletions, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.toLong(AccountRestrictionFlagsDto.class, this.restrictionFlags)));
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getRestrictionAdditions()));
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getRestrictionDeletions()));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getAccountRestrictionTransactionBody_Reserved1()));
            GeneratorUtils.writeList(dataOutputStream, this.restrictionAdditions, 0);
            GeneratorUtils.writeList(dataOutputStream, this.restrictionDeletions, 0);
        });
    }
}


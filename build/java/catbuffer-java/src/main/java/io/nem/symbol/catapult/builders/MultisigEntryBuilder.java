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
* Binary layout for a multisig entry
**/
public class MultisigEntryBuilder extends StateHeaderBuilder implements Serializer {

    /** Minimum approval for modifications. **/
    private final int minApproval;

    /** Minimum approval for removal. **/
    private final int minRemoval;

    /** Account address. **/
    private final AddressDto accountAddress;

    /** Cosignatories for account. **/
    private final List<AddressDto> cosignatoryAddresses;

    /** Accounts for which the entry is cosignatory. **/
    private final List<AddressDto> multisigAddresses;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MultisigEntryBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.minApproval = Integer.reverseBytes(stream.readInt());
            this.minRemoval = Integer.reverseBytes(stream.readInt());
            this.accountAddress = AddressDto.loadFromBinary(stream);
            final long cosignatoryAddressesCount = Long.reverseBytes(stream.readLong());
            this.cosignatoryAddresses = GeneratorUtils.loadFromBinaryArray(AddressDto::loadFromBinary, stream, cosignatoryAddressesCount, 0);
            final long multisigAddressesCount = Long.reverseBytes(stream.readLong());
            this.multisigAddresses = GeneratorUtils.loadFromBinaryArray(AddressDto::loadFromBinary, stream, multisigAddressesCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MultisigEntryBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MultisigEntryBuilder.
     */
    public static MultisigEntryBuilder loadFromBinary(DataInputStream stream) {
        return new MultisigEntryBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param minApproval Minimum approval for modifications.
    * @param minRemoval Minimum approval for removal.
    * @param accountAddress Account address.
    * @param cosignatoryAddresses Cosignatories for account.
    * @param multisigAddresses Accounts for which the entry is cosignatory.
    */
    protected MultisigEntryBuilder(short version, int minApproval, int minRemoval, AddressDto accountAddress, List<AddressDto> cosignatoryAddresses, List<AddressDto> multisigAddresses) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(minApproval, "minApproval is null");
        GeneratorUtils.notNull(minRemoval, "minRemoval is null");
        GeneratorUtils.notNull(accountAddress, "accountAddress is null");
        GeneratorUtils.notNull(cosignatoryAddresses, "cosignatoryAddresses is null");
        GeneratorUtils.notNull(multisigAddresses, "multisigAddresses is null");
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountAddress = accountAddress;
        this.cosignatoryAddresses = cosignatoryAddresses;
        this.multisigAddresses = multisigAddresses;
    }
    
    /**
     * Creates an instance of MultisigEntryBuilder.
     *
     * @param version Serialization version.
     * @param minApproval Minimum approval for modifications.
     * @param minRemoval Minimum approval for removal.
     * @param accountAddress Account address.
     * @param cosignatoryAddresses Cosignatories for account.
     * @param multisigAddresses Accounts for which the entry is cosignatory.
     * @return Instance of MultisigEntryBuilder.
     */
    public static MultisigEntryBuilder create(short version, int minApproval, int minRemoval, AddressDto accountAddress, List<AddressDto> cosignatoryAddresses, List<AddressDto> multisigAddresses) {
        return new MultisigEntryBuilder(version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses);
    }

    /**
     * Gets minimum approval for modifications.
     *
     * @return Minimum approval for modifications.
     */
    public int getMinApproval() {
        return this.minApproval;
    }

    /**
     * Gets minimum approval for removal.
     *
     * @return Minimum approval for removal.
     */
    public int getMinRemoval() {
        return this.minRemoval;
    }

    /**
     * Gets account address.
     *
     * @return Account address.
     */
    public AddressDto getAccountAddress() {
        return this.accountAddress;
    }

    /**
     * Gets cosignatories for account.
     *
     * @return Cosignatories for account.
     */
    public List<AddressDto> getCosignatoryAddresses() {
        return this.cosignatoryAddresses;
    }

    /**
     * Gets accounts for which the entry is cosignatory.
     *
     * @return Accounts for which the entry is cosignatory.
     */
    public List<AddressDto> getMultisigAddresses() {
        return this.multisigAddresses;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += 4; // minApproval
        size += 4; // minRemoval
        size += this.accountAddress.getSize();
        size += 8; // cosignatoryAddressesCount
        size +=  GeneratorUtils.getSumSize(this.cosignatoryAddresses, 0);
        size += 8; // multisigAddressesCount
        size +=  GeneratorUtils.getSumSize(this.multisigAddresses, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            final byte[] superBytes = super.serialize();
            dataOutputStream.write(superBytes, 0, superBytes.length);
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getMinApproval()));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getMinRemoval()));
            GeneratorUtils.writeEntity(dataOutputStream, this.accountAddress);
            dataOutputStream.writeLong(Long.reverseBytes((long) GeneratorUtils.getSize(this.getCosignatoryAddresses())));
            GeneratorUtils.writeList(dataOutputStream, this.cosignatoryAddresses, 0);
            dataOutputStream.writeLong(Long.reverseBytes((long) GeneratorUtils.getSize(this.getMultisigAddresses())));
            GeneratorUtils.writeList(dataOutputStream, this.multisigAddresses, 0);
        });
    }
}


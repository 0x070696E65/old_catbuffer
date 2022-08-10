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
* Binary layout for a multisig account modification transaction
**/
public class MultisigAccountModificationTransactionBodyBuilder implements Serializer {

    /** Relative change of the minimal number of cosignatories required when removing an account. **/
    private final byte minRemovalDelta;

    /** Relative change of the minimal number of cosignatories required when approving a transaction. **/
    private final byte minApprovalDelta;

    /** Reserved padding to align addressAdditions on 8-byte boundary. **/
    private final int multisigAccountModificationTransactionBody_Reserved1;

    /** Cosignatory address additions. **/
    private final List<UnresolvedAddressDto> addressAdditions;

    /** Cosignatory address deletions. **/
    private final List<UnresolvedAddressDto> addressDeletions;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MultisigAccountModificationTransactionBodyBuilder(DataInputStream stream) {
        try {
            this.minRemovalDelta = stream.readByte();
            this.minApprovalDelta = stream.readByte();
            final byte addressAdditionsCount = stream.readByte();
            final byte addressDeletionsCount = stream.readByte();
            this.multisigAccountModificationTransactionBody_Reserved1 = Integer.reverseBytes(stream.readInt());
            this.addressAdditions = GeneratorUtils.loadFromBinaryArray(UnresolvedAddressDto::loadFromBinary, stream, addressAdditionsCount, 0);
            this.addressDeletions = GeneratorUtils.loadFromBinaryArray(UnresolvedAddressDto::loadFromBinary, stream, addressDeletionsCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MultisigAccountModificationTransactionBodyBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MultisigAccountModificationTransactionBodyBuilder.
     */
    public static MultisigAccountModificationTransactionBodyBuilder loadFromBinary(DataInputStream stream) {
        return new MultisigAccountModificationTransactionBodyBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
    * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
    * @param addressAdditions Cosignatory address additions.
    * @param addressDeletions Cosignatory address deletions.
    */
    protected MultisigAccountModificationTransactionBodyBuilder(byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions) {
        GeneratorUtils.notNull(minRemovalDelta, "minRemovalDelta is null");
        GeneratorUtils.notNull(minApprovalDelta, "minApprovalDelta is null");
        GeneratorUtils.notNull(addressAdditions, "addressAdditions is null");
        GeneratorUtils.notNull(addressDeletions, "addressDeletions is null");
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.multisigAccountModificationTransactionBody_Reserved1 = 0;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
    }
    
    /**
     * Creates an instance of MultisigAccountModificationTransactionBodyBuilder.
     *
     * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
     * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
     * @param addressAdditions Cosignatory address additions.
     * @param addressDeletions Cosignatory address deletions.
     * @return Instance of MultisigAccountModificationTransactionBodyBuilder.
     */
    public static MultisigAccountModificationTransactionBodyBuilder create(byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions) {
        return new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }

    /**
     * Gets relative change of the minimal number of cosignatories required when removing an account.
     *
     * @return Relative change of the minimal number of cosignatories required when removing an account.
     */
    public byte getMinRemovalDelta() {
        return this.minRemovalDelta;
    }

    /**
     * Gets relative change of the minimal number of cosignatories required when approving a transaction.
     *
     * @return Relative change of the minimal number of cosignatories required when approving a transaction.
     */
    public byte getMinApprovalDelta() {
        return this.minApprovalDelta;
    }

    /**
     * Gets reserved padding to align addressAdditions on 8-byte boundary.
     *
     * @return Reserved padding to align addressAdditions on 8-byte boundary.
     */
    private int getMultisigAccountModificationTransactionBody_Reserved1() {
        return this.multisigAccountModificationTransactionBody_Reserved1;
    }

    /**
     * Gets cosignatory address additions.
     *
     * @return Cosignatory address additions.
     */
    public List<UnresolvedAddressDto> getAddressAdditions() {
        return this.addressAdditions;
    }

    /**
     * Gets cosignatory address deletions.
     *
     * @return Cosignatory address deletions.
     */
    public List<UnresolvedAddressDto> getAddressDeletions() {
        return this.addressDeletions;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 1; // minRemovalDelta
        size += 1; // minApprovalDelta
        size += 1; // addressAdditionsCount
        size += 1; // addressDeletionsCount
        size += 4; // multisigAccountModificationTransactionBody_Reserved1
        size +=  GeneratorUtils.getSumSize(this.addressAdditions, 0);
        size +=  GeneratorUtils.getSumSize(this.addressDeletions, 0);
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeByte((byte) this.getMinRemovalDelta());
            dataOutputStream.writeByte((byte) this.getMinApprovalDelta());
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getAddressAdditions()));
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getAddressDeletions()));
            dataOutputStream.writeInt(Integer.reverseBytes((int) this.getMultisigAccountModificationTransactionBody_Reserved1()));
            GeneratorUtils.writeList(dataOutputStream, this.addressAdditions, 0);
            GeneratorUtils.writeList(dataOutputStream, this.addressDeletions, 0);
        });
    }
}


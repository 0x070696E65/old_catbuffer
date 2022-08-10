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
* Binary layout for an embedded multisig account modification transaction
**/
public class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {

    /** Multisig account modification transaction body. **/
    private final MultisigAccountModificationTransactionBodyBuilder multisigAccountModificationTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected EmbeddedMultisigAccountModificationTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of EmbeddedMultisigAccountModificationTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     */
    public static EmbeddedMultisigAccountModificationTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new EmbeddedMultisigAccountModificationTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
    * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
    * @param addressAdditions Cosignatory address additions.
    * @param addressDeletions Cosignatory address deletions.
    */
    protected EmbeddedMultisigAccountModificationTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions) {
        super(signerPublicKey, version, network, type);
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(minRemovalDelta, "minRemovalDelta is null");
        GeneratorUtils.notNull(minApprovalDelta, "minApprovalDelta is null");
        GeneratorUtils.notNull(addressAdditions, "addressAdditions is null");
        GeneratorUtils.notNull(addressDeletions, "addressDeletions is null");
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }
    
    /**
     * Creates an instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
     * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
     * @param addressAdditions Cosignatory address additions.
     * @param addressDeletions Cosignatory address deletions.
     * @return Instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     */
    public static EmbeddedMultisigAccountModificationTransactionBuilder create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, byte minRemovalDelta, byte minApprovalDelta, List<UnresolvedAddressDto> addressAdditions, List<UnresolvedAddressDto> addressDeletions) {
        return new EmbeddedMultisigAccountModificationTransactionBuilder(signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }

    /**
     * Gets relative change of the minimal number of cosignatories required when removing an account.
     *
     * @return Relative change of the minimal number of cosignatories required when removing an account.
     */
    public byte getMinRemovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    }

    /**
     * Gets relative change of the minimal number of cosignatories required when approving a transaction.
     *
     * @return Relative change of the minimal number of cosignatories required when approving a transaction.
     */
    public byte getMinApprovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    }

    /**
     * Gets cosignatory address additions.
     *
     * @return Cosignatory address additions.
     */
    public List<UnresolvedAddressDto> getAddressAdditions() {
        return this.multisigAccountModificationTransactionBody.getAddressAdditions();
    }

    /**
     * Gets cosignatory address deletions.
     *
     * @return Cosignatory address deletions.
     */
    public List<UnresolvedAddressDto> getAddressDeletions() {
        return this.multisigAccountModificationTransactionBody.getAddressDeletions();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.multisigAccountModificationTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public MultisigAccountModificationTransactionBodyBuilder getBody() {
        return this.multisigAccountModificationTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.multisigAccountModificationTransactionBody);
        });
    }
}


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
* Binary layout for a non-embedded namespace metadata transaction
**/
public class NamespaceMetadataTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Namespace metadata transaction body. **/
    private final NamespaceMetadataTransactionBodyBuilder namespaceMetadataTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceMetadataTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceMetadataTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceMetadataTransactionBuilder.
     */
    public static NamespaceMetadataTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceMetadataTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signature Entity signature.
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param fee Transaction fee.
    * @param deadline Transaction deadline.
    * @param targetAddress Metadata target address.
    * @param scopedMetadataKey Metadata key scoped to source, target and type.
    * @param targetNamespaceId Target namespace identifier.
    * @param valueSizeDelta Change in value size in bytes.
    * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
    */
    protected NamespaceMetadataTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto targetAddress, long scopedMetadataKey, NamespaceIdDto targetNamespaceId, short valueSizeDelta, ByteBuffer value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        GeneratorUtils.notNull(scopedMetadataKey, "scopedMetadataKey is null");
        GeneratorUtils.notNull(targetNamespaceId, "targetNamespaceId is null");
        GeneratorUtils.notNull(valueSizeDelta, "valueSizeDelta is null");
        GeneratorUtils.notNull(value, "value is null");
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    
    /**
     * Creates an instance of NamespaceMetadataTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param targetAddress Metadata target address.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetNamespaceId Target namespace identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     * @return Instance of NamespaceMetadataTransactionBuilder.
     */
    public static NamespaceMetadataTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, UnresolvedAddressDto targetAddress, long scopedMetadataKey, NamespaceIdDto targetNamespaceId, short valueSizeDelta, ByteBuffer value) {
        return new NamespaceMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }

    /**
     * Gets metadata target address.
     *
     * @return Metadata target address.
     */
    public UnresolvedAddressDto getTargetAddress() {
        return this.namespaceMetadataTransactionBody.getTargetAddress();
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public long getScopedMetadataKey() {
        return this.namespaceMetadataTransactionBody.getScopedMetadataKey();
    }

    /**
     * Gets target namespace identifier.
     *
     * @return Target namespace identifier.
     */
    public NamespaceIdDto getTargetNamespaceId() {
        return this.namespaceMetadataTransactionBody.getTargetNamespaceId();
    }

    /**
     * Gets change in value size in bytes.
     *
     * @return Change in value size in bytes.
     */
    public short getValueSizeDelta() {
        return this.namespaceMetadataTransactionBody.getValueSizeDelta();
    }

    /**
     * Gets difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     *
     * @return Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public ByteBuffer getValue() {
        return this.namespaceMetadataTransactionBody.getValue();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.namespaceMetadataTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public NamespaceMetadataTransactionBodyBuilder getBody() {
        return this.namespaceMetadataTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.namespaceMetadataTransactionBody);
        });
    }
}


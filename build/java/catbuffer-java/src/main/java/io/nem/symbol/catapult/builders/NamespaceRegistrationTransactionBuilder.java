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
* Binary layout for a non-embedded namespace registration transaction
**/
public class NamespaceRegistrationTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Namespace registration transaction body. **/
    private final NamespaceRegistrationTransactionBodyBuilder namespaceRegistrationTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected NamespaceRegistrationTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of NamespaceRegistrationTransactionBuilder.
     */
    public static NamespaceRegistrationTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new NamespaceRegistrationTransactionBuilder(stream);
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
    * @param duration Namespace duration.
    * @param parentId Parent namespace identifier.
    * @param id Namespace identifier.
    * @param registrationType Namespace registration type.
    * @param name Namespace name.
    */
    protected NamespaceRegistrationTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, BlockDurationDto duration, NamespaceIdDto parentId, NamespaceIdDto id, NamespaceRegistrationTypeDto registrationType, ByteBuffer name) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        if (registrationType == NamespaceRegistrationTypeDto.ROOT) {
            GeneratorUtils.notNull(duration, "duration is null");
        }
        if (registrationType == NamespaceRegistrationTypeDto.CHILD) {
            GeneratorUtils.notNull(parentId, "parentId is null");
        }
        GeneratorUtils.notNull(id, "id is null");
        GeneratorUtils.notNull(registrationType, "registrationType is null");
        GeneratorUtils.notNull(name, "name is null");
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder(duration, parentId, id, registrationType, name);
    }
    
    /**
     * Creates an instance of NamespaceRegistrationTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBuilder.
     */
    public static NamespaceRegistrationTransactionBuilder createChild(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto parentId, NamespaceIdDto id, ByteBuffer name) {
        NamespaceRegistrationTypeDto registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, null, parentId, id, registrationType, name);
    }
    
    /**
     * Creates an instance of NamespaceRegistrationTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param duration Namespace duration.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBuilder.
     */
    public static NamespaceRegistrationTransactionBuilder createRoot(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, BlockDurationDto duration, NamespaceIdDto id, ByteBuffer name) {
        NamespaceRegistrationTypeDto registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, duration, null, id, registrationType, name);
    }

    /**
     * Gets namespace duration.
     *
     * @return Namespace duration.
     */
    public BlockDurationDto getDuration() {
        return this.namespaceRegistrationTransactionBody.getDuration();
    }

    /**
     * Gets parent namespace identifier.
     *
     * @return Parent namespace identifier.
     */
    public NamespaceIdDto getParentId() {
        return this.namespaceRegistrationTransactionBody.getParentId();
    }

    /**
     * Gets namespace identifier.
     *
     * @return Namespace identifier.
     */
    public NamespaceIdDto getId() {
        return this.namespaceRegistrationTransactionBody.getId();
    }

    /**
     * Gets namespace registration type.
     *
     * @return Namespace registration type.
     */
    public NamespaceRegistrationTypeDto getRegistrationType() {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    }

    /**
     * Gets namespace name.
     *
     * @return Namespace name.
     */
    public ByteBuffer getName() {
        return this.namespaceRegistrationTransactionBody.getName();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.namespaceRegistrationTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public NamespaceRegistrationTransactionBodyBuilder getBody() {
        return this.namespaceRegistrationTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.namespaceRegistrationTransactionBody);
        });
    }
}

